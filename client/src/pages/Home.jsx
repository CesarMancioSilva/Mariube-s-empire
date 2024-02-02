import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Home = () => {
    const [message,setMessage] = useState()
    const navigate = useNavigate()
    const goCards = ()=>{
        navigate('/cards')
    }
    useEffect(()=>{
        axios.get('http://localhost:3500').then((result)=>setMessage(result.data.message)).catch(error=>console.log(error))
    },[])
    return (
        <div className='mx-auto max-w-6xl '>
            <div className='mx-auto border max-w-lg shadow-md bg-slate-200 rounded-xl p-4 flex flex-col gap-4'>
                <h1 className='font-bold text-xl'>Adicione um novo usuário</h1>
                <form className='flex flex-col gap-4'>
                    <div className='flex gap-4'>
                        <label className='w-1/2'> 
                            <p>Nome:</p>
                            <input type="" className='w-full border p-3 rounded-lg'/>
                        </label>
                        <label className='w-1/2'> 
                            <p>Email:</p>
                            <input type="" className='w-full border p-3 rounded-lg'/>
                        </label>
                       
                    </div>
                    
                    <textarea name="" id="" rows="5" className='border p-3 rounded-lg'></textarea>
                    <button className='bg-slate-700 text-white rounded-lg p-2  hover:opacity-90 disabled:opacity-80'>
                    Salvar usuário
                    </button>
                </form>
                <button className='bg-white border border-slate-700 text-slate-700 rounded-lg p-2  hover:bg-slate-500 hover:text-white disabled:opacity-80' onClick={goCards}>
                    Ver usuários
                </button>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Home;