import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { signInStart,signInSucces,signInFailure } from '../redux/user/userSlice';
const Login = () => {
    const [message,setMessage] = useState()
    const {error:submitError} = useSelector((state)=>state.user)
    const [formData,setFormData] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log('a')
        try{
            const res = await fetch('http://localhost:3500/login',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData),
            })
            const data = await res.json()
            console.log(data)
            if(data.success === false){
                dispatch(signInFailure(data.message))
                return
            }
            dispatch(signInSucces(data))
            navigate('/')
        }catch(error){
            dispatch(signInFailure(error.message))
        }
        
        // axios.post('http://localhost:3500/sign-up',formData)
        // .then(result => {
        //     console.log(result)
        //     console.log(result.data.message)
        // })
        // .catch(error => {
        //     setSubmitError(error.message);
        //     console.log(error)
        // })
    }
    return (
        <div className=' '>
            <div className='mx-auto border max-w-lg shadow-md bg-slate-200 rounded-xl p-4 flex flex-col gap-4'>
                <h1 className='font-bold text-xl'>Adicione um novo usuário</h1>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <label className='w-full'> 
                        <p>Email</p>
                        <input type="text" className='w-full border p-3 rounded-lg' id='email' onChange={handleChange}/>
                    </label>
                    <label className='w-full'> 
                        <p>Senha</p>
                        <input type="password" className='w-full border p-3 rounded-lg' id='password' onChange={handleChange}/>
                    </label>
                    <p className='text-red-700'>{submitError}</p>
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