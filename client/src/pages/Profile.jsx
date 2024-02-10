import React,{useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { FaRegTrashCan } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdDateRange } from "react-icons/md";
import { updateUserSuccess } from '../redux/user/userSlice';

import { signOut } from '../redux/user/userSlice';

const Profile = () => {
    const {currentUser} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const slicedDate = currentUser.rest.createdAt.slice(0,10)
    const splitedDate = slicedDate.split('-')
    const style = { color: "red"}
    const fileRef = useRef(null)
    const [formData,setFormData] = useState({})
    console.log(currentUser.rest._id)
    const handleChange =(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit =async(e)=>{
        e.preventDefault()
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
            if(data.success === false){
                console.log(data.message)
                return
            }
            dispatch(updateUserSuccess(data))
        }catch(error){
            console.log(error.message)
        }
    }
    return (
        <div className=' flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-5  mx-auto  max-w-5xl   '>
            <form className="w-full sm:w-[70%]  lg:w-3/5 h-full border shadow-md border-black bg-slate-200 rounded-xl p-4" onSubmit={handleSubmit}>
                <div className='flex'>

                    <div className='w-1/3 h-ful'>
                        <input type="file" ref={fileRef} hidden accept='image/*'/>
                        <img src={currentUser.rest.photoURL} alt="" className='border border-slate-600 rounded-xl w-28 md:w-auto cursor-pointer' onClick={()=>fileRef.current.click()}/>
                        <p className='mt-1'>Data de criação</p>
                        <p>{`${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`}</p>
                    </div>
                    <div className='w-2/3 h-full '>
                        <label className='full'>
                            <p className='text-slate-700'>Nome</p>
                            <input type="text" className='w-full border border-slate-600 p-2 rounded-lg' defaultValue={currentUser.rest.name} id='name' onChange={handleChange}/>
                        </label>
                        <label className='full'>
                            <p className='text-slate-700'>Email</p>
                            <input type="email" className='w-full border border-slate-600 p-2 rounded-lg' defaultValue={currentUser.rest.email} id='email' onChange={handleChange}/>
                        </label>
                        <label className='full'>
                            <p className='text-slate-700'>Senha</p>
                            <input type="password" className='w-full border border-slate-600 p-2 rounded-lg' id='password' onChange={handleChange}/>
                        </label>
                        
                    </div>
                </div>
                <button className='bg-slate-700 text-white rounded-lg p-2  hover:opacity-90 disabled:opacity-80 w-full mt-3'>editar</button>
                <div className='w-full flex justify-between text-red-700 mt-4'>
                    <p className='cursor-pointer hover:font-bold transition ease-in-out delay-100'>Apagar conta</p>
                    <p className='cursor-pointer hover:font-bold transition ease-in-out delay-100'onClick={()=>dispatch(signOut())}>Sair da conta</p>
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