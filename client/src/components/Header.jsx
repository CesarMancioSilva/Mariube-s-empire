import React from 'react';
import { IoCartOutline } from "react-icons/io5";
import {Link,NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { IoMenuOutline } from "react-icons/io5";

const Header = () => {
    const {currentUser} = useSelector(state => state.user)
    console.log(currentUser)
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
    return (
        <header className='bg-slate-200 shadow-md mx-auto p-3 mb-8 fixed w-full top-0 z-10'>
            <div className='max-w-5xl flex justify-between align-middle mx-auto items-center'>
                <nav className='flex gap-8 items-center'>
                <Link to='/'>
                    <h1 className='text-lg font-bold'>Mariube's empire</h1>
                </Link>
                
                    
                </nav>
                <div className='flex items-center gap-3'>
                    {/* <IoCartOutline size={25} className='cursor-pointer'/> */}
                    <ul className='flex items-center gap-5'>
                        {links.map((item)=>(
                            <NavLink to={item.link} className={({isActive})=> isActive ? "underline":""}>
                                {item.text}
                            </NavLink>
                        ))}
                        
                        {currentUser.rest.admin ? (
                            
                            <NavLink to='/reserva' className={({isActive})=> isActive ? "underline":""}>
                                Reserva
                            </NavLink>
                        ):(
                            ''  
                        )}
                    </ul>
                    {currentUser ? (
                        <Link to='/profile'>

                            <img src={currentUser.rest.photoURL} alt="profile picture" className='w-8 h-8 rounded-full border border-black cursor-pointer'/>
                        </Link>
                        
                    ):(
                        <Link to='/login'> 
                            <button className='bg-slate-700 text-white rounded-lg p-1 px-5  hover:opacity-90 disabled:opacity-80'>Entrar</button>
                        </Link>
                    )}

                    
                </div>
            </div>

        </header>
    );
};

export default Header;