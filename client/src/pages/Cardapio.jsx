import React from 'react';
import { Link } from 'react-router-dom';
import { BiDrink } from "react-icons/bi";
import { LuDessert } from "react-icons/lu";
import { MdOutlineLunchDining } from "react-icons/md";
import { MdOutlineDinnerDining } from "react-icons/md";


const Cards = () => {
    return (
        <div>
            <div className='mx-auto  border border-black max-w-5xl shadow-md bg-slate-200 p-3 rounded-lg flex justify-between items-center px-8'>
                {/* <h1 className='text-2xl font-bold text-slate-700'>Monte seu pedido!</h1>
                <div className='h-7  border border-slate-700'></div>
                <div className='h-7  border border-slate-700'></div> */}
                <div className=' flex w-full justify-between'>

                    <button className='bg-slate-200 ml-4 text-slate-700 border-b-4 font-bold border-slate-700 rounded-lg p-2  hover:opacity-90 disabled:opacity-80 hover:bg-slate-300 flex gap-3 items-center px-4'><MdOutlineDinnerDining /> Pratos</button>
                    <button className='bg-slate-200 ml-4 text-slate-700 border-b-4 font-bold border-slate-700 rounded-lg p-2  hover:opacity-90 disabled:opacity-80 hover:bg-slate-300 flex gap-3 items-center px-4'><MdOutlineLunchDining /> Lanche</button>
                    <button className='bg-slate-200 ml-4 text-slate-700 border-b-4 font-bold border-slate-700 rounded-lg p-2  hover:opacity-90 disabled:opacity-80 hover:bg-slate-300 flex gap-3 items-center px-4'><BiDrink/> Bebida</button>
                    <button className='bg-slate-200 ml-4 text-slate-700 border-b-4 font-bold border-slate-700 rounded-lg p-2  hover:opacity-90 disabled:opacity-80 hover:bg-slate-300 flex gap-3 items-center px-4'><LuDessert /> Sobremesa</button>
                    
                </div>
                
            </div>
            <div className='mx-auto  border border-black max-w-5xl shadow-md bg-slate-200 p-3 rounded-lg my-8'>
                
                <div className='w-full flex flex-wrap  my-5 '>
                
                    
                  
                    <div className='w-1/3  p-4'>
                        <div className='border bg-white shadow-md p-5 cursor-pointer rounded-lg w-full h-full flex flex-col  gap-4 hover:shadow-lg  hover:scale-105 transition ease-in-out delay-100'>
                            <div className='w-full h-48 rounded-md border border-slate-700'></div>
                            <h1 className=' text-slate-700 font-bold'>Arroz feijão e panqueca de carne </h1>
                            <p>R$: 18,00</p>
                        </div>
                    </div>
                    <div className='w-1/3  p-4'>
                        <div className='border bg-white shadow-md p-5 cursor-pointer rounded-lg w-full h-full flex flex-col  gap-4 hover:shadow-lg  hover:scale-105 transition ease-in-out delay-100'>
                            <div className='w-full h-48 rounded-md border border-slate-700'></div>
                            <h1 className=' text-slate-700 font-bold'>Arroz feijão e panqueca de carne </h1>
                            <p>R$: 18,00</p>
                        </div>
                    </div>
                    <div className='w-1/3  p-4'>
                        <div className='border bg-white shadow-md p-5 cursor-pointer rounded-lg w-full h-full flex flex-col  gap-4 hover:shadow-lg  hover:scale-105 transition ease-in-out delay-100'>
                            <div className='w-full h-48 rounded-md border border-slate-700'></div>
                            <h1 className=' text-slate-700 font-bold'>Arroz feijão e panqueca de carne </h1>
                            <p>R$: 18,00</p>
                        </div>
                    </div>

                    
                    
                    
                    
                    
                    
                </div>
                <div className='flex items-center border border-black'>
                    
                    <Link to='/'>
                        <button className='bg-slate-700 ml-4 mb-4 text-white rounded-lg p-2  hover:opacity-90 disabled:opacity-80'>
                            Voltar ao ínicio
                        </button>
                    </Link>
                    <div>kk</div>

                </div>
            </div>
        </div>
        
    );
};

export default Cards;