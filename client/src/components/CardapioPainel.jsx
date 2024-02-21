import React, { useEffect,useState,useRef } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import ExiEdit from './ExiEdit';
import AddPedido from './AddPedido';


const CardapioPainel = (current) => {
    const [clients,setClients] = useState([])
    const [clientsDisplay,setClientsDisplay] = useState([])
    const [searchFilter,setSearchFilter] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const totalPages = Math.ceil(clientsDisplay.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, clientsDisplay.length - 1);
    const currentClientes = clientsDisplay.slice(startIndex, endIndex + 1);

    
    useEffect(()=>{
        if(searchFilter != ''){
            const filteredData = clients.filter(item =>
                Object.values(item).some(value =>
                  value.toString().toLowerCase().includes(searchFilter.toLowerCase())
                )
            );
            setClientsDisplay(filteredData)
            // updatePagination()
        }else{
            setClientsDisplay(clients)
            // updatePagination()
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
    // useEffect(()=>{
    //     updateTable()
    // },[])
    // const updateTable=async()=>{
    //     try{
    //         const res = await fetch('http://localhost:3500/clientsPainel/'+current.current.rest._id,{
    //             credentials:'include'
    //         })
    //         const data = await res.json()
    //         if(data.success === false){
    //             console.log(data.message)
    //             return
    //         }
    //         console.log(data)

    //         setClients(data)
    //         setClientsDisplay(data)
    //         // updatePagination()
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
    
    
    // const deleteUser=async()=>{
        
    //     try{
    //         const res = await fetch('http://localhost:3500/adminDelete/'+userView._id,{
    //             method:"DELETE",
    //             credentials:'include'
    //         })
    //         const data = await res.json()
    //         if(data.success === false){
    //             console.log(data.message)
    //             return
    //         }
    //         updateTable()
    //         setViewingUser(!viewingUser)
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
    useEffect(()=>{
        updateTable()
    },[])
    const [orders,setOrders] = useState([])
    const updateTable=async()=>{
        try{
            const res = await fetch('http://localhost:3500/orders',{credentials:'include'})
            const data = await res.json()
            if(data.success === false){
                console.log(data.message)
                return
            }
            console.log(data)
            setOrders(data)
        }catch(err){
            console.log(err)
        }
    }
    const [dropdownOpen,setDropdownOpen] = useState(false)
    const [isEditing,setIsEditing] = useState(false)
    const [isAdding,setIsAdding] = useState(false)
    return (
        <div class="relative overflow-x-auto shadow-md rounded-lg bg-white">
            <ExiEdit isEditing={isEditing} setIsEditing={setIsEditing}/>
            <AddPedido isAdding={isAdding} setIsAdding={setIsAdding} updateTable={updateTable}/>
            <div className=' flex bg-white items-center gap-4'>

            <div className='ml-5 my-4'>
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search-users" class="block p-3 ps-10 text-sm   border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Pesquise por aqui" onChange={e=>setSearchFilter(e.target.value)}/>
                </div>
            </div>
            {/* <div className='px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500'>
                sessão
            </div> */}
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center relative" type="button" onClick={()=>setDropdownOpen(!dropdownOpen)}>Todas as categorias <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
            
            <div id="dropdown" class={`z-10 absolute top-[120%] left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 ${dropdownOpen ? '':'hidden'}`}>
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                </li>
                </ul>
            </div>
            </button>
            <button className='text-white bg-slate-700   font-medium rounded-lg text-sm px-5 py-2.5 hover:opacity-85' onClick={()=>setIsEditing(true)}>Editar exbição</button>


            </div>  
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 bg-white">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50=">
                    {/* <input type="text" className='p-3 border border-slate-700 rounded-lg m-5' placeholder='Pesquise um cliente aqui'/> */}
                    

                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Foto
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nome
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Categoria
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Preço
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* {currentClientes.map((client)=>(
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
                    ))} */}
                    {orders ? orders.map((item)=>(
                        <tr class="bg-white border-b hover:bg-gray-50 ">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <img src={item.photo.photoUrl} alt="" className='border border-slate-700 w-16 h-16'/>
                            </th>
                            <td class="px-6 py-4">
                                {item.name}
                            </td>
                            <td class="px-6 py-4">
                                {item.category}
                            </td>
                            <td class="px-6 py-4">
                                {item.preço}
                            </td>
                            <td class="pr-6 py-4   text-right">
                            
                            <MdEdit size={23} className='cursor-pointer inline m-1'/>
                            <FaRegTrashCan size={23} className='cursor-pointer m-1 inline'/>

                            {/* <button className='bg-slate-700 px-3 m-1 py-2 rounded-md text-white hover:opacity-90'onClick={()=>{
                                        setUserView(client)
                                        setViewingUser(true)
                                    }}>Editar</button>
                            <button className='bg-red-700 px-3 m-1 py-2 rounded-md text-white hover:opacity-90'onClick={()=>{
                                        setUserView(client)
                                        setViewingUser(true)
                                    }}>Apagar</button> */}
                            </td>
                        </tr>
                    
                    )) : <p>Nenhum item encontrado...</p>}
                    
                
                </tbody>
            </table>
            <div className='flex px-5 my-4 items-center justify-between gap-4'>
                <nav className="">
                    <ul class="inline-flex -space-x-px text-base h-10 shadow-md border border-slate-500 rounded-md">
                        <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 " onClick={previousPageTable}>Previous</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 "> 
                            {currentPage} de {totalPages}</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "onClick={nextPageTable}>Next</a>
                        </li>
                    </ul>
                </nav>
                <button className='text-white bg-green-700  font-medium rounded-lg text-sm px-5 py-2.5 hover:opacity-85' onClick={()=>setIsAdding(true)}>Adicionar pedido</button>
            </div>
        </div>

    );
};

export default CardapioPainel;