import React, { useState,useRef, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';

const AddPedido = ({isAdding,setIsAdding,updateTable}) => {
    const [formData,setFormData] = useState({})
    const [erro,setErro] = useState('')
    const nameRef = useRef()
    const precoRef = useRef()
    const handleChange =(e)=>{
        setFormData(
            {
                ...formData,
                [e.target.id]:e.target.value
            }
        )
        console.log(formData)
    }

    const [preview,setPreview] = useState()
    const [selectedFile, setSelectedFile] = useState()
    
    const imgRef = useRef()
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        console.log('a')
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        // 
        
        setSelectedFile(e.target.files[0])
    }
    const uploadFile=(file,fileType)=>{
        const storage = getStorage(app);
        const folder = fileType === "imgUrl" ? "orderIMGS/":"videos/";
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, folder + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            default:
                break;
            }
        }, 
        (err) => {
            console.log(err)
            switch (err.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                console.log(err)
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;

            // ...

            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            default:
                break;
            }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setFormData(
                { 
                    ...formData,
                    photoName: fileName,
                    photoUrl:downloadURL
                })
            });
            console.log(formData)
            saveData()
            
        }
        );
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(imgRef.current.value == ''){
            setErro('Insira uma imagem para salvar')
        }else{
            setErro('')
            uploadFile(imgRef.current.files[0],"imgUrl")
        }
    }
    const saveData=async()=>{
        console.log(formData)
        try{
            const res = await fetch('http://localhost:3500/createOrder',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                credentials:'include',
                body:JSON.stringify(formData)
            })
            const data = await res.json()
            if(data.success === false){
                console.log(data.message)
                return
            }
            console.log(data)
            nameRef.current.value =''
            precoRef.current.value=''
            setIsAdding(false)
            updateTable()
        }catch(err){
            console.log(err)
        }
    }
    // useEffect(()=>{
    //     console.log('enviando para o banco',formData)

    
    // },[activationToggle])
    const handleCancel=()=>{
        setIsAdding(false)
        setSelectedFile(undefined)
        setPreview('')
        imgRef.current.value = ''
        setErro('')
        console.log(formData)
    }


    
    return (
        <div className={`w-screen h-screen bg-black bg-opacity-30 left-0 top-0 fixed z-10 ${isAdding ? '':'hidden'} flex items-center justify-center`}>
            <div className='p-6 bg-white text-black rounded-lg w-fit'>
            <form className='flex gap-8' id="myform" onSubmit={handleSubmit}>
                <div className='flex flex-col gap-3'>
                    <img src={preview} alt="" className='w-[200px] h-[200px] border-4 border-slate-700 rounded-xl '/>
                    <input ref={imgRef}  type="file" id='fileInput' hidden onChange={onSelectFile}/>
                    <label htmlFor="fileInput" className='bg-green-700 text-white rounded-lg px-3 py-2 w-full flex item-center justify-center cursor-pointer hover:opacity-85'>
                        Selecionar imagem
                    </label>
                </div>
                <div className='flex flex-col gap-5'>
                    <label htmlFor="">
                        <p className='font-bold text-slat-700 mb-1'>Nome do pedido</p>
                        <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Milkshake de banana" ref={nameRef} onChange={handleChange} required />
                    </label>
                    <label htmlFor="">
                        <p className='font-bold text-slat-700 mb-1'>Preço</p>
                        <input type="number" id="preço" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="12" onChange={handleChange} ref={precoRef} required />
                    </label>
                    <label htmlFor="">
                        <p className='font-bold text-slat-700 mb-1'>Categoria</p>
                        <input type="text" id="categoria" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" onChange={handleChange} required />
                    </label>
                    
                </div>
                
            </form>
            <p className='mt-4 text-center w-full text-red-700'>{erro}</p>
            <div className='flex full gap-3 mt-10 '>
                        <button className='px-3 py-2 rounded-md bg-slate-700 text-white w-1/2' type='submit' form="myform">Salvar</button>
                        <button className='px-3 py-2 rounded-md bg-slate-700 text-white w-1/2' onClick={handleCancel} >Cancelar</button>
                    </div>
            </div>
            
        </div>
    );
};

export default AddPedido;