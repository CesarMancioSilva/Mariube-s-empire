import React,{useEffect, useState} from 'react';
import {Link,NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { IoMenuOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import BackgroundPop from './backgroundPop';
import { useRef } from 'react';




const Header = () => {
    const {currentUser} = useSelector(state => state.user)
    const [menu,setMenu] = useState(false)
    const [admin,setAdmin] = useState(false)
    // const admin = useRef()
    useEffect(()=>{
        if(currentUser != null){
            setAdmin(currentUser.rest.admin)
            console.log('atualizou')
        }
    },)
    console.log(admin)
    const links= [
        {
            text:"Inicio",
            link:'/'
        },
        {
            text:"Cardápio",
            link:'/cardapio'
        },
    ]
    // console.log(currentUser.rest.admin)
    return (
        <header className='bg-slate-200  shadow-md mx-auto p-3 mb-8 fixed w-full top-0 z-30'>
            <div className='max-w-5xl flex justify-between align-middle mx-auto items-center'>
                <div className='flex gap-8 items-center'>
                <Link to='/'>
                    <h1 className='text-lg text-slate-700 font-bold'>Mariube's empire</h1>
                </Link>
                
                    
                </div>
                <div className={`top-[100%] w-[60vw] cell:w-auto h-[100vh] cell:h-auto   cell:border-slate-200 absolute cell:static flex flex-col-reverse z-20 bg-slate-200 justify-end cell:flex-row items-center gap-3 p-5 cell:p-0 transition ease-in-out delay-100 shadow-md cell:shadow-none ${menu === false ? 'right-[-100%]':'right-0 '}`}>
                    {/* <IoCartOutline size={25} className='cursor-pointer'/> */}
                    
                    <ul className='flex flex-col  cell:flex-row items-start  w-full cell:items-center gap-5'>
                        {links.map((item)=>(
                            <NavLink to={item.link} className={({isActive})=> isActive ? "border-b border-black p-1 text-slate-700 font-bold": "hover:scale-110  hover:font-bold transition ease-in-out delay-100"}>
                                {item.text}
                            </NavLink>
                        ))}
                        
                        {currentUser  && admin == 'true'  ? (
                            <NavLink to='/reserva' className={({isActive})=> isActive ? "border-b border-black p-1 text-slate-700 font-bold": "hover:scale-110 hover:font-bold transition ease-in-out delay-100"}>
                                Painel
                            </NavLink>
                        ) : currentUser  ? (
                            <NavLink to='/reserva' className={({isActive})=> isActive ? "border-b border-black p-1 text-slate-700 font-bold": "hover:scale-110 hover:font-bold transition ease-in-out delay-100"}>
                                Reserva
                            </NavLink>  
                        ):('')}
                        
                    </ul>
                    {currentUser ? (
                        <Link to='/profile' className='w-full  cursor-pointer'>
                            <label className='flex gap-2 flex-col w-full items-start border-b cursor-pointer cell:border-none border-black'>
                                <img src={currentUser.rest.photo.photoUrl} alt="profile picture" className='w-8 h-8 rounded-full border-[3px] border-slate-700 cursor-pointer'/>
                                <div className='block cell:hidden cursor-pointer'>
                                    <p className='break-all'>{currentUser.rest.name}</p>
                                </div>

                            </label>
                        </Link>
                        
                    ):(
                        <Link to='/login'> 
                            <button className='bg-slate-700 text-white rounded-lg p-1 px-5  hover:opacity-90 disabled:opacity-80'>Entrar</button>
                        </Link>
                    )}

                    
                </div>
                <div className='block cell:hidden'>
                    {menu === false ? (
                        <IoMenuOutline size={28} className='cursor-pointer' onClick={()=>setMenu(!menu)}/>
                    ):(
                        <IoMdClose size={28} className='cursor-pointer'onClick={()=>setMenu(!menu)}/>

                    )}
                </div>
                
            </div>
            <div className='cell:hidden' hidden={menu === false ? true:false}>

                <BackgroundPop />
            </div>
        </header>
    );
};

export default Header;