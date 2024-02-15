import React,{useRef, useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { FaRegTrashCan } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdDateRange } from "react-icons/md";
import { updateUserSuccess } from '../redux/user/userSlice';
import { signOut } from '../redux/user/userSlice';



import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';

const Profile = () => {
    const {currentUser} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const slicedDate = currentUser.rest.createdAt.slice(0,10)
    const splitedDate = slicedDate.split('-')
    const style = { color: "red"}
    const fileRef = useRef(null)
    const [formData,setFormData] = useState({})
    const [editing,setEditing] = useState(false)
    const [error,setError] = useState('')
    

    const [changingImage,setChangingImage] = useState(false)
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [image,setImage] = useState()
    const [imgPerc,setImgPerc] = useState(0)

    const [input,setInput] = useState()
    const prevInput = useRef(input)
    
    const imgBtnRef = useRef()
    const imgRef = useRef()
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        console.log('a')
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        imgBtnRef.current.disabled = false
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
    // useEffect(()=>{
    //     image && uploadFile(image,"imgUrl")
    // },[image])
    const uploadFile=(file,fileType)=>{
        const storage = getStorage(app);
        const folder = fileType === "imgUrl" ? "profileIMGS/":"videos/";
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, folder + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            fileType === "imgUrl"
            ? setImgPerc(Math.round(progress))
            : ''
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
            setInput(
                { 
                    name: fileName,
                    [fileType]:downloadURL
                })
            });
            
        }
        );
    }
    useEffect(()=>{
        
        if (prevInput.current !== input){
            console.log(input)
            updateDB()
            console.log('disparou useEffect do bancoo')
            prevInput.current = input;
        }
    },[input])
    const updateDB=async()=>{
        try{
            const res = await fetch("http://localhost:3500/profileImage/"+currentUser.rest._id,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:'include',
                body:JSON.stringify(input)
            })
            const data = await res.json();
                if(data.success === false){
                    console.log(data.message)
                    return
                }
            console.log(data)
            dispatch(updateUserSuccess(data))
        }catch(err){
            console.log(err)
        }

        console.log(input)
    }
    const handlePhotoSubmit=async(e)=>{
        e.preventDefault()
        console.log('enviando')
        uploadFile(imgRef.current.files[0],"imgUrl")
    }


    const nameRef =useRef(null)
    const emailRef =useRef(null)
    const passwordRef =useRef(null)
    const confirmPasswordRef = useRef(null)
    const handleCancel =()=>{
        setEditing(false)
        setFormData({})
        nameRef.current.value = currentUser.rest.name
        emailRef.current.value = currentUser.rest.email
        passwordRef.current.value = ''
        confirmPasswordRef.current.value = ''
        setError('')
    }
    const handleChange =(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit =async(e)=>{
        e.preventDefault()
        console.log(formData)
        if(passwordRef.current.value === confirmPasswordRef.current.value){
            
            try{
                const res = await fetch(`http://localhost:3500/updateUser/${currentUser.rest._id}`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    credentials:'include',
                    body:JSON.stringify(formData)
                })
                const data = await res.json();
                console.log(data)
                if(data.success === false){
                    console.log(data.message)
                    return
                }

                dispatch(updateUserSuccess(data))
                
                setEditing(false)
                setError('')
                setFormData({})
                nameRef.current.value = data.rest.name
                emailRef.current.value = data.rest.email
                passwordRef.current.value = ''
                confirmPasswordRef.current.value = ''
            }catch(error){
                console.log(error.message)
            }
        }else{
            setError('As duas senhas não são identicas')
        }
        
    }
    return (
        <div className=' flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-5  mx-auto  max-w-5xl  mb-5 '>
            {/* {changingImage === false ? (''):( */}
                {/* <div> */}
                {changingImage === false ? (''):(
                    <div className='absolute top-0 flex items-center justify-center left-0 bg-black z-10 w-screen h-screen opacity-35'></div>
                    )}
                    {changingImage === false ? (''):(
                    <div className='p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-auto sm:min-w-[502px] bg-slate-200 opacity-100 absolute rounded-xl shadow-md z-20  break-all'>
                        <div className='flex flex-col items-center sm:flex-row gap-8'>
                            <div>
                            <h1>{preview === '' ? 'imagem atual':'Imagem selecionada'}</h1>
                            {preview ? <img  className='border-4 w-[166px] h-[166px] border-slate-700 rounded-xl mt-4' name='image' src={preview} width='166px' height='166px'/>: <img src={currentUser.rest.photo.photoUrl} alt="" className='border-4 w-[166px] h-[166px] border-slate-700 rounded-xl mt-4' />}
                            <form action="" id='imageForm' onSubmit={handlePhotoSubmit} hidden>
                                <input type='file' ref={imgRef}name='image' accept='image/*' id='image'  onChange={onSelectFile}/>
                                {/* onChange={onSelectFile} */}
                            </form>
                            </div>
                            <div className='break-words'>
                                <h1 className='break-words'>Selecione uma imagem para seu perfil</h1>
                                <label className=' mt-4 border border-dashed border-black rounded-lg w-full h-[164px] flex flex-col items-center justify-center' htmlFor='image'>
                                    <p>Clique aqui</p>
                                    <p>{imgPerc+"%"}</p>
                                    <p>imagem.png</p>
                                </label>
                            </div>
                        </div>
                        <div className='flex w-full gap-2 mt-4'>
                            <button className='bg-slate-700 text-white rounded-lg p-1  hover:opacity-90 disabled:opacity-80 w-1/2' ref={imgBtnRef}  disabled type='submit' form='imageForm'>Salvar</button>
                            <button className='bg-slate-700 text-white rounded-lg p-1  hover:opacity-90 disabled:opacity-80 w-1/2' onClick={()=>{setChangingImage(!changingImage) 
                                setPreview('')}}>Cancelar</button>
                        </div>
                        
                    </div>
                    )}
                
            
           


            <form className="w-full sm:w-[70%] lg:w-3/5 h-full border shadow-md border-black bg-slate-200 rounded-xl p-4" onSubmit={handleSubmit}>
                <div className='flex flex-col sm:flex-row gap-2'>

                    <div className='w-full sm:w-1/3 h-ful flex flex-col items-center sm:items-start'>
                        <input type="file" ref={fileRef} hidden accept='image/*'/>
                        <img src={currentUser.rest.photo.photoUrl} alt="" className=' border-[6px] border-slate-600 rounded-xl w-[160px] h-[170px] lg:w-[170px] lg-[180px] md:w-auto cursor-pointer' onClick={()=>setChangingImage(true)}/>
                        <p className='mt-1 font-bold text-slate-700'>Data de criação</p>
                        <p>{`${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`}</p>
                    </div>
                    <div className='w-full sm:w-2/3 h-full '>
                        <label className='full'>
                            <p className='text-slate-700 font-bold'>Nome</p>
                            <input ref={nameRef} type="text" className='w-full border border-slate-600 p-2 rounded-lg' defaultValue={currentUser.rest.name} id='name' onChange={handleChange}  disabled={editing === false ? true: false}/>
                        </label>
                        <label className='full'>
                            <p className='text-slate-700 font-bold'>Email</p>
                            <input ref={emailRef} type="email" className='w-full border border-slate-600 p-2 rounded-lg' defaultValue={currentUser.rest.email} id='email' onChange={handleChange} disabled={editing === false ? true: false}/>
                        </label>
                        <label className='full' hidden={editing === false ? true: false}>
                            <p className='text-slate-700 font-bold'>Nova senha</p>
                            <input ref={passwordRef} type="password" className='w-full border border-slate-600 p-2 rounded-lg' id='password' onChange={handleChange} />
                        </label>
                        <label className='full' hidden={editing === false ? true: false}>
                            <p className='text-slate-700 font-bold'>Confirmar nova senha</p>
                            <input ref={confirmPasswordRef} type="password" className='w-full border border-slate-600 p-2 rounded-lg' id='confirmPassword' onChange={handleChange} />
                        </label>
                        
                    </div>
                </div>
                
                {editing == false ? (
                    <button className='bg-slate-700 text-white rounded-lg p-2  hover:opacity-90 disabled:opacity-80 w-full mt-3' onClick={()=>setEditing(!editing)}>editar</button>
                ):(
                    <div className='flex gap-2'>
                        <button className='bg-slate-700 text-white rounded-lg p-2  hover:opacity-90 disabled:opacity-80 w-1/2 mt-3' type='submit'>Salvar</button>
                        <button className='bg-slate-700 text-white rounded-lg p-2  hover:opacity-90 disabled:opacity-80 w-1/2 mt-3'onClick={handleCancel}>Cancelar</button>
                    </div>
                )}
                <p className='text-red-700 text-center'>{error}</p>
                <div className='w-full flex justify-between text-red-700 mt-4'>
                    <p className='cursor-pointer hover:font-bold transition ease-in-out delay-100'>Apagar conta</p>
                    <p className='cursor-pointer hover:font-bold transition ease-in-out delay-100'onClick={()=>{
                        dispatch(signOut())
                        localStorage.removeItem('token')
                        }}>Sair da conta</p>
                </div>
                {/* <button className='bg-red-700 text-white rounded-lg p-2  hover:opacity-90 disabled:opacity-80 w-full mt-3' } type='button'>Sair</button> */}
            </form>
            <div className='border shadow-md w-full sm:w-[70%] lg:w-2/5 border-black bg-slate-200 rounded-xl p-4'>
                <h1>Reservas consluidas</h1>
                <div className=' flex flex-col gap-2 mt-2'>
                    <div className='w-full bg-white p-3 rounded-xl border border-slate-300 cursor-pointer hover:scale-[1.03] shadow-md transition ease-in-out delay-100 flex justify-between items-center'>
                        <div className='flex gap-4'>
                            <p className='flex items-center gap-2'>24/03 <MdDateRange /></p>
                            <p className='flex items-center gap-2'>25 <CgProfile /></p>
                        </div>
                        <FaRegTrashCan style={style} />

                    </div>
                    <div className='w-full bg-white p-3 rounded-xl border border-slate-300 cursor-pointer hover:scale-[1.03] shadow-md transition ease-in-out delay-100 flex justify-between items-center'>
                        <div className='flex gap-4'>
                            <p className='flex items-center gap-2'>24/03 <MdDateRange /></p>
                            <p className='flex items-center gap-2'>25 <CgProfile /></p>
                        </div>
                        <FaRegTrashCan style={style} />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;