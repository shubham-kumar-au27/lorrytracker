import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import OrdersCard from './OrdersCard'
import OrderTable from './OrderTable';


const Home = () => {
    const user = useSelector((store) => store?.user);
    // const userId = user?.uid
    const displayName = user?.displayName
    
    const [orders,setOrders] = useState([])
    // const dispatch = useDispatch();
    const getOrdersById = async (user)=>{
    
        try{
            if (user.uid){
                const getOrders = await axios.get(`http://localhost:5000/api/v1/order/getorders`,{

                params:{
                    userid: user.uid,
                    displayName: displayName,
                  },

                }
               
                // ?userid=${user?.uid}`,{displayName:displayName}
                )
                setOrders(getOrders?.data)    

            }
         
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        
        getOrdersById(user)
        
        
    },[user])
  return (
    <>
        <Header/>
        <h1 className='align-middle items-center'>My Orders</h1>
        <div className='flex w-full h-screen flex-col  md:flex-row' >
            {/* {
                orders?.map((order)=>(<OrderTable key={order._id} orders={order}/>))
            } */}
            <OrderTable orders={orders}/>
        </div>
    </>
  )
}

export default Home
