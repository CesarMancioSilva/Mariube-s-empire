import React,{useState} from 'react';
import ClientePainel from '../components/ClientePainel';
import CardapioPainel from '../components/CardapioPainel';
import ReservaPainel from '../components/ReservaPainel';
import { useSelector } from 'react-redux';

const Painel = () => {
    const {currentUser} = useSelector(state => state.user)
    const [navValue,setNavValue] = useState('cliente')
    return (
        <div className='mx-auto  border border-black max-w-5xl shadow-md bg-slate-200 p-3 rounded-lg'>
            <div class="text-sm font-medium text-center text-gray-500 bg-white w-fit rounded-lg mb-6">
                <ul class="flex flex-wrap -mb-px">
                    <li class={` ${navValue==='cliente'?'border-l-2 border-t-2 border-b-2 border-slate-700 rounded-l-lg font-bold':''}`}>
                        <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg text-slate-700 hover:text-slate-400 hover:border-gray-300 font-bold" onClick={()=>setNavValue('cliente')}>Clientes</a>
                    </li>
                    <li class={` ${navValue==='cardapio'?' border-t-2 border-b-2 border-slate-700  font-bold':''}`}>
                        <a href="#" class="inline-block p-4 border-b-2 border-transparent text-slate-700 hover:text-slate-400 hover:border-gray-300 font-bold" onClick={()=>setNavValue('cardapio')}>Cardápio</a>
                    </li>
                    <li class={` ${navValue==='reserva'?'border-r-2 border-t-2 border-b-2 border-slate-700 rounded-r-lg':''}`}>
                        <a href="#" class={`inline-block p-4 text-slate-700  font-bold `}  aria-current="page" onClick={()=>setNavValue('reserva')}>Reservas</a>
                    </li>
                    
                    
                </ul>
            </div>
            {navValue === 'cliente'? <ClientePainel current={currentUser}/> : null}
            {navValue === 'cardapio'? <CardapioPainel/> : null}
            {navValue === 'reserva'? <ReservaPainel/> : null}
            
            
        </div>
    );
};

export default Painel;