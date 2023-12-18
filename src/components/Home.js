import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { useSelector } from 'react-redux';
import OrdersCard from './OrdersCard'


const Home = () => {
    const user = useSelector((store) => store?.user?.uid);
    const [orders,setOrders] = useState([])
    const getOrdersById = async ()=>{
        try{
                // if (user){
                    const getOrders = await axios.get(`http://localhost:5000/api/v1/order/getorders?userid=${user}`)
                    setOrders(getOrders?.data)
                // }
            
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getOrdersById()
        
        
    },[])
  return (
    <>
        <Header/>
        <h1 className='align-middle items-center'>My Orders</h1>
        <div className='flex w-full h-screen flex-col  md:flex-row' >
            {
                orders?.map((order)=>(<OrdersCard key={order._id} orders={order}/>))
            }
        </div>
    </>
  )
}

export default Home
