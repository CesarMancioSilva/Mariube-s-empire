import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
    const [message,setMessage] = useState()
    const [formData,setFormData] = useState({})
    const navigate = useNavigate()
    const goSignUp = ()=>{
        navigate('/sign-up')
    }
    useEffect(()=>{
        axios.get('http://localhost:3500').then((result)=>setMessage(result.data.message)).catch(error=>console.log(error))
    },[])

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
        console.log(formData)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3500',formData)
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }
    return (
        <div className='  border border-black '>
            <div className='mx-auto border max-w-lg shadow-md bg-slate-200 rounded-xl p-4 flex flex-col gap-4'>
                <h1 className='font-bold text-xl'>Adicione um novo usuário</h1>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <label className='w-full'> 
                        <p>Email</p>
                        <input type="text" className='w-full border p-3 rounded-lg' id='name' onChange={handleChange}/>
                    </label>
                    <label className='w-full'> 
                        <p>Senha</p>
                        <input type="text" className='w-full border p-3 rounded-lg' id='name' onChange={handleChange}/>
                    </label>
                    
                    <button className='bg-slate-700 block text-white rounded-lg p-2   hover:opacity-90 disabled:opacity-80'>
                        Entrar
                    </button>
                    <button className='bg-white border w-full border-slate-700 text-slate-700 max-w-lg mx-auto rounded-lg p-2  hover:bg-slate-500 hover:text-white disabled:opacity-80' onClick={goSignUp}>
                        Cadastrar
                    </button>
                </form>
                
            </div>
        </div>
    );
};

export default Login;