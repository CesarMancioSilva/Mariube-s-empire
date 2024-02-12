import React from 'react';
import { Link } from 'react-router-dom';
import { BiDrink } from "react-icons/bi";
import { LuDessert } from "react-icons/lu";
import { MdOutlineLunchDining } from "react-icons/md";
import { MdOutlineDinnerDining } from "react-icons/md";
import { IoPizzaOutline } from "react-icons/io5";

// <IoPizzaOutline />

const Cards = () => {
    return (
        <div>
            <div className='mx-auto  border border-black max-w-5xl shadow-md bg-slate-200 p-3 rounded-lg flex justify-between items-center px-8 flex-wrap'>
                {/* <h1 className='text-2xl font-bold text-slate-700'>Monte seu pedido!</h1>
                <div className='h-7  border border-slate-700'></div>
                <div className='h-7  border border-slate-700'></div> */}
                <div className=' flex w-full justify-between'>

                    <button className='bg-slate-200 ml-4 text-slate-700 border-b-4 font-bold border-slate-700 rounded-lg p-2  hover:opacity-90 disabled:opacity-80 hover:bg-slate-300 flex gap-3 items-center px-4'><MdOutlineDinnerDining /> Pratos</button>
                    <button className='bg-slate-200 ml-4 text-slate-700 border-b-4 font-bold border-slate-700 rounded-lg p-2  hover:opacity-90 disabled:opacity-80 hover:bg-slate-300 flex gap-3 items-center px-4'><MdOutlineLunchDining /> Lanche</button>
                    <button className='bg-slate-200 ml-4 text-slate-700 border-b-4 font-bold border-slate-700 rounded-lg p-2  hover:opacity-90 disabled:opacity-80 hover:bg-slate-300 flex gap-3 items-center px-4'><IoPizzaOutline /> Pizza</button>
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
                <div className='flex items-center gap-8 mb-4'>
                    
                    
                        <button className='bg-slate-700 ml-4  text-white rounded-lg p-2  hover:opacity-90 disabled:opacity-80 block'>
                            Voltar ao ínicio
                        </button>
                        <nav aria-label="Page navigation example">
                            <ul class="inline-flex -space-x-px text-base h-10 shadow-md border border-slate-500 rounded-md">
                                <li>
                                <a href="#" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ">Previous</a>
                                </li>
                                <li>
                                <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">1</a>
                                </li>
                                <li>
                                <a href="#" aria-current="page" class="flex items-center justify-center px-4 h-10 text-gray-500 border border-gray-300 bg-blue-50 hover:bg-slate-200 hover:text-blue-700 ">2</a>
                                </li>
                                <li>
                                <a href="#" aria-current="page" class="flex items-center justify-center px-4 h-10 text-gray-500 border border-slate-700 bg-white hover:bg-slate-200 hover:text-blue-700 ">2</a>
                                </li>
                                <li>
                                <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ">Next</a>
                                </li>
                            </ul>
                        </nav>

                </div>
            </div>
        </div>
        
    );
};

export default Cards;