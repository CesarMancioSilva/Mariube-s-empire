import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData,setFormData] = useState({})
    const [submitError,setSubmitError] = useState('teste')
    const navigate = useNavigate()
    const goLogin = ()=>{
        navigate('/login')
    }

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3500/sign-up',formData)
        .then(result => {
            console.log(result)
            console.log(result.data.message)
        })
        .catch(error => console.log(error.message))
    }
    return (
        <div className='mx-auto max-w-6xl '>
            <div className='mx-auto border max-w-lg shadow-md bg-slate-200 rounded-xl p-4 flex flex-col gap-4'>
                <h1 className='font-bold text-xl'>Cadastrar usuário</h1>
                    <label className='w-full'> 
                        <p>Nome</p>
                        <input type="text" className='w-full border p-3 rounded-lg' id='name' onChange={handleChange}/>
                    </label>
                    <label className='w-full'> 
                        <p>Email</p>
                        <input type="text" className='w-full border p-3 rounded-lg' id='email' onChange={handleChange}/>
                    </label>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <label className='w-full'> 
                        <p>Senha</p>
                        <input type="password" className='w-full border p-3 rounded-lg' id='password' onChange={handleChange}/>
                    </label>
                    {/* <div className='flex gap-4'>
                        <label className='w-1/2'> 
                            <p>Nome:</p>
                            <input type="text" className='w-full border p-3 rounded-lg' id='name' onChange={handleChange}/>
                        </label>
                        <label className='w-1/2'> 
                            <p>Hobbie:</p>
                            <input type="text" className='w-full border p-3 rounded-lg' id='hobbie' onChange={handleChange}/>
                        </label>
                       
                    </div>
                    
                    <textarea rows="5" className='border p-3 rounded-lg' onChange={handleChange} id='description'></textarea> */}
                    {submitError}
                    <button className='bg-slate-700 text-white rounded-lg p-2  hover:opacity-90 disabled:opacity-80'>
                        Cadastrar
                    </button>
                </form>
                <button className='bg-white border border-slate-700 text-slate-700 rounded-lg p-2  hover:bg-slate-500 hover:text-white disabled:opacity-80' onClick={goLogin}>
                    Fazer Login
                </button>
                
            </div>
        </div>
    );
};

export default Signup;