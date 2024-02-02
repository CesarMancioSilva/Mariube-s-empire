import React from 'react';
import { Link } from 'react-router-dom';

const Cards = () => {
    return (
        <div className='mx-auto  border max-w-2xl shadow-md bg-slate-200 p-3 rounded-lg'>
            <h1 className='text-xl text-center font-bold mx-auto'>Usuários Cadastrados</h1>
            <div className='w-full flex flex-wrap  my-5 '>
               
                <div className='w-1/2  p-4'>
                    <div className='border bg-white shadow-md p-5 cursor-pointer rounded-lg w-full h-full flex flex-col items-center gap-4'>
                        <div className='w-12 h-12 rounded-full border border-slate-700'></div>
                        <h1 className='text-center text-slate-700 font-bold'>César Mâncio Silva </h1>
                        <p>Hobbie</p>
                    </div>
                </div>
                <div className='w-1/2  p-4'>
                    <div className='border bg-white shadow-md p-5 cursor-pointer rounded-lg w-full h-full flex flex-col items-center gap-4'>
                        <div className='w-12 h-12 rounded-full border border-slate-700'></div>
                        <h1 className='text-center text-slate-700 font-bold'>Alex Aparecido de Lima </h1>
                        <p>Hobbie</p>
                    </div>
                </div>
                
                
                
                
                
            </div>
            <Link to='/'>
                <button className='bg-slate-700 ml-4 text-white rounded-lg p-2  hover:opacity-90 disabled:opacity-80'>
                    Voltar ao ínicio
                </button>
            </Link>
        </div>
    );
};

export default Cards;