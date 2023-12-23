import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import OrderTable from './OrderTable';
import { BASE_URL } from '../utils/constants';


const Home = () => {
    const user = useSelector((store) => store?.user);
    const [searchText,setSearchText] = useState()
    const userId = user?.uid
    const displayName = user?.displayName
    
    const [orders,setOrders] = useState([])
    const [filteredOrders,setFilteredOrders] = useState([])
    const [searchBy,setSearchBy] = useState(null)
    // const dispatch = useDispatch();
    const getOrdersById = async (user)=>{
    
        try{
            if (user?.uid){
                const getOrders = await axios.get(`${BASE_URL}/api/v1/order/getorders`,{

                params:{
                    userid: user.uid,
                    displayName: displayName,
                  },

                }
               
                // ?userid=${user?.uid}`,{displayName:displayName}
                )
                setOrders(getOrders?.data)    
                setFilteredOrders(getOrders?.data)

                console.log(orders)

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
    <div className="search m-3 p-4">
        <label>Search By</label>
        <select onChange={(e)=>setSearchBy(e.target.value)}>
            <option value="vehicle_number">Vehicle Number</option>
            <option value="deliveryAddress">Delivery Address</option>
            {/* <option>Deli</option>
            <option></option>
            <option></option> */}

        </select>
        <input type="text" className="border border-solid border-black" value={searchText} onChange={(e)=>{
            setSearchText(e.target.value)
        }}/>
        <button className="px-4 py-2 bg-green-300 m-4 rounded-lg" onClick={()=>{
            //on click of this button filter the restaurant and update the UI--
            const filteredorders = orders?.filter(
                (res) => res[searchBy].toLowerCase().includes(searchText.toLowerCase())
            )
            // console.log(filteredorders)
            setFilteredOrders(filteredorders)
        }}>Search</button>
    </div>


        <div className='flex w-full h-screen flex-col  md:flex-row' >
            {/* {
                orders?.map((order)=>(<OrderTable key={order._id} orders={order}/>))
            } */}
            <OrderTable orders={filteredOrders}/>
        </div>
    </>
  )
}

export default Home
