import React, { useEffect,useState } from 'react';

const ClientePainel = (current) => {
    const [clients,setClients] = useState([])
    // console.log(current.current.rest._id)
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
            console.log('chamou')
        }catch(err){
            console.log(err)
        }
        // fetch("http://localhost:3500/clientsPainel",{credencials:'include'})
        // .then(response => {
        //     return response.json()
        // }).then(data=>{
        //     setClients(data)
        // }).catch(err=>console.log(err))
        console.log(clients)
    }
    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 bg-white">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50=">
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
                    {clients.map((client)=>(
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
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Visualizar</a>
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
        </div>

    );
};

export default ClientePainel;