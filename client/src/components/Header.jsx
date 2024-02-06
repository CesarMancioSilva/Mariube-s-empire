import React from 'react';
import { IoCartOutline } from "react-icons/io5";
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header className='bg-slate-200 shadow-md mx-auto p-3 mb-8'>
            <div className='max-w-5xl flex justify-between align-middle mx-auto items-center'>
                <nav className='flex gap-8 items-center'>
                <Link to='/'>
                    <h1 className='text-lg font-bold'>Mariube's empire</h1>
                </Link>
                
                    <ul className='flex items-center gap-5'>
                        <li>Inicio</li>
                        <li>Cardápio</li>
                    </ul>
                </nav>
                <div className='flex items-center gap-3'>
                    <Link to='/login'> 
                        <button className='bg-slate-700 text-white rounded-lg p-1 px-5  hover:opacity-90 disabled:opacity-80'>Entrar</button>
                    </Link>
                    <IoCartOutline size={25} className='cursor-pointer'/>
                    <div className='w-8 h-8 rounded-full border border-black cursor-pointer'></div> 
                </div>
            </div>

        </header>
    );
};

export default Header;