import React, { useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";

const ExiEdit = ({isEditing,setIsEditing}) => {
    const [categoryName,setCategoryName] = useState({})
    const handleChange=(e)=>{
        setCategoryName({
            ...categoryName,
            [e.target.id]:e.target.value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(categoryName)
        if(categoryName != ''){
            try{
                const res = await fetch('http://localhost:3500/signCategory',
                {
                    method:'POST',
                    mode:'no-cors',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    credentials:'include',
                    body:JSON.stringify(categoryName),
                })
                const data = await res.json()
                if(data.success === false){
                    setSubmitError(data.message);
                    console.log(data.message)
                    return
                }
            }catch(err){
                console.log(err)
            }
        }
    }
    return (
        <div className={`w-screen h-screen bg-black bg-opacity-30 left-0 top-0 fixed z-10 ${isEditing ? '':'hidden'} flex items-center justify-center`}>
            <div className='p-6 bg-white text-black rounded-lg w-fit'>
                <h1 className=' text-lg font-bold text-700-slate'>Edição de categorias</h1>
                <form className='flex gap-6  mt-4 justify-between' onSubmit={handleSubmit}>
                    <input type="text" id='name' className='border border-slate-600 p-2 rounded-lg' onChange={handleChange}/>
                    <button className='px-3 py-2 bg-green-700 text-white rounded-lg hover:bg-opacity-85'>Adicionar</button>
                </form>
                

                <div class="w-full overflow-x-auto mt-3">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                            <tr>
                                <th scope="col" class=" py-3">
                                    Nome
                                </th>
                                
                                <th scope="col" class="py-3">
                                    Exibir
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b  ">
                                <th scope="row" class=" py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    Sobremesas
                                </th>
                                <td class=" py-4">
                                    <div className=' flex items-center gap-8'>
                                        <label class="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer"/>
                                        <div class="relative w-11 h-6 bg-gray-400  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        
                                        </label>
                                        <FaRegTrashCan size={20} className=''/>
                                    </div>
                                </td>
                            </tr>
                            
                        
                        </tbody>
                    </table>
                    <div className='flex full gap-3 mt-4 '>
                        <button className='px-3 py-2 rounded-md bg-slate-700 text-white w-1/2' >Salvar</button>
                        <button className='px-3 py-2 rounded-md bg-slate-700 text-white w-1/2' onClick={()=>setIsEditing(false)} >Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExiEdit;