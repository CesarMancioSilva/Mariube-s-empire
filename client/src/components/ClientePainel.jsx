import React, { useEffect,useState,useRef } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";

const ClientePainel = (current) => {
    const [clients,setClients] = useState([])
    const [clientsDisplay,setClientsDisplay] = useState([])
    const [searchFilter,setSearchFilter] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const totalPages = Math.ceil(clientsDisplay.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, clientsDisplay.length - 1);
    const currentClientes = clientsDisplay.slice(startIndex, endIndex + 1);

    const [arrayBtn,setArrayBtn] = useState([])
    var preSet = []
    const updatePagination =()=>{
        preSet = []
        for(let i=1;i<=totalPages;i++){
            preSet.push({number:i})
        }
        console.log(preSet)
        setArrayBtn(prevState=>{return preSet})
        console.log(arrayBtn)
    }
    useEffect(()=>{
        // updatePagination()

    },[currentClientes])
    // const arrayBtn = useRef([])
    
    // useEffect(()=>{
    //     const preSet = []
       
    //     for(let i=1;i<=totalPages;i++){
    //         preSet.push({number:i})
    //     } 
    //     // setArrayBtn(preSet)
    //     console.log(preSet)
    //     arrayBtn.current = preSet
    //     nextPageTable()
    //     previousPageTable()
    // },[currentClientes])
    // console.log(arrayBtn.current)
    // // setArrayBtn(preSet)
    // // console.log(currentClientes)
   
    
    useEffect(()=>{
        if(searchFilter != ''){
            const filteredData = clients.filter(item =>
                Object.values(item).some(value =>
                  value.toString().toLowerCase().includes(searchFilter.toLowerCase())
                )
            );
            setClientsDisplay(filteredData)
            updatePagination()
        }else{
            setClientsDisplay(clients)
            updatePagination()
        }
    },[searchFilter])

    const nextPageTable =()=>{
        setCurrentPage(prev=>prev+1)
        console.log(currentPage)
    }
    const previousPageTable =()=>{
        setCurrentPage(prev=>prev-1)
        console.log(currentPage)
    }
    useEffect(()=>{
        updateTable()
    },[])
    const updateTable=async()=>{
        try{
            const res = await fetch('http://localhost:3500/clientsPainel/'+current.current.rest._id,{
                credentials:'include'
            })
            const data = await res.json()
            if(data.success === false){
                console.log(data.message)
                return
            }
            console.log(data)

            setClients(data)
            setClientsDisplay(data)
            updatePagination()
        }catch(err){
            console.log(err)
        }
    }
    const [viewingUser,setViewingUser] = useState(false)
    const [userView,setUserView] = useState()
    
    
    return (
        <div class="relative overflow-x-auto shadow-md rounded-lg bg-white">
            {viewingUser && (
                <div className=' top-0 fixed flex items-center justify-center left-0 bg-black z-10 w-screen h-screen opacity-35'></div>
            )}
            {viewingUser && (
                <div className='p-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-slate-200 fixed rounded-xl shadow-md z-20' >
                    <div className='flex gap-8'>
                        <img src={userView.photo.photoUrl} alt="" className='border-2 w-[140px] h-[140px] border-slate-700 rounded-lg'/>
                        <div className='flex gap-8'>
                            
                            <div className='flex flex-col gap-5'>
                                <div>
                                    <p className='font-bold text-slate-700 text-lg'>Nome:</p>
                                    <p>{userView.name}</p>
                                </div>
                                <div>
                                <p className='font-bold text-slate-700 text-lg'>Reservas:</p>
                                    <p>0</p>
                                </div>
                            </div>

                            <div className='flex flex-col gap-5'>
                                <div>
                                    
                                    <p className='font-bold text-slate-700 text-lg'>Email:</p>
                                    <p>{userView.email}</p>
                                </div>
                                <div>
                                    <p className='font-bold text-slate-700 text-lg'>Ultima Reserva:</p>
                                    <p>xx/xx/xxxx</p>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                    <h1 className='font-bold text-slate-700 text-lg mt-3'>Reservas agendadas</h1>
                    <div className='flex border border-black w-full p-1'>
                        <div className='bg-white p-3 rounded-lg shadow-md border border-slate-700'>card</div>
                    </div>
                    <div className='flex justify-between mt-6'>
                        <button className='bg-red-700 px-3 py-2 text-white rounded-md hover:opacity-85'>Apagar conta</button>
                        <button className='bg-slate-700 px-3 py-2 text-white rounded-md hover:opacity-85'onClick={()=>{
                            setViewingUser(false)
                            setUserView(null)
                        }}>Voltar</button>
                    </div>
                    
                </div>

            )}
            <div className='flex bg-white items-center gap-4'>

            <div className='ml-5 my-4'>
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search-users" class="block p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search for users" onChange={e=>setSearchFilter(e.target.value)}/>
                </div>
            </div>
            
            </div>  
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 bg-white">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50=">
                    {/* <input type="text" className='p-3 border border-slate-700 rounded-lg m-5' placeholder='Pesquise um cliente aqui'/> */}
                    

                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Nome
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Reservas
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ultima reserva
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentClientes.map((client)=>(
                        <tr class="bg-white border-b hover:bg-gray-50 ">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {client.name}
                            </th>
                            <td class="px-6 py-4">
                                {client.email}
                            </td>
                            <td class="px-6 py-4">
                                {client.reserva ? '' : 0}
                            </td>
                            <td class="px-6 py-4">
                                {client.lastReserva ? '' : 'Nunca reservou'}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button className='bg-slate-700 px-3  py-2 rounded-md text-white hover:opacity-90'onClick={()=>{
                                    setUserView(client)
                                    setViewingUser(true)
                                }}>Visualizar</button>
                            </td>
                        </tr>
                    ))}
                    {/* <tr class="bg-white border-b hover:bg-gray-50 ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Apple MacBook Pro 17"
                        </th>
                        <td class="px-6 py-4">
                            Silver
                        </td>
                        <td class="px-6 py-4">
                            Laptop
                        </td>
                        <td class="px-6 py-4">
                            $2999
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr> */}
                
                </tbody>
            </table>
            <div className='flex ml-5 my-4 items-center gap-4'>
                <nav className="">
                                <ul class="inline-flex -space-x-px text-base h-10 shadow-md border border-slate-500 rounded-md">
                                    <li>
                                    <a href="#" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 " onClick={previousPageTable}>Previous</a>
                                    </li>
                                    {/* <li>
                                    <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">1</a>
                                    </li> */}
                                    {arrayBtn && arrayBtn.map((item)=>(
                                        
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">{item.number}</a>
                                        </li>
                                    ))}
                                    <li>
                                    <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "onClick={nextPageTable}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                            <div>{clientsDisplay.length} resultados cadastrados</div>
                
            </div>
        </div>

    );
};

export default ClientePainel;