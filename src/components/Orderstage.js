import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Orderstage = () => {
  const fetchOrder = useSelector((store) => store?.order?.order)
    // console.log(fetchOrder.order)
  const [orderDetails,setOrderDetails] = useState(null)
  const orderId = fetchOrder?.order?._id
    const fetchDataById = async()=>{
      try{
        const getData =  await axios.get(`http://localhost:5000/api/v1/order/getOrderById?orderid=${orderId}`)

        console.log(getData.data)
        setOrderDetails(getData.data)

      }catch(err){
        console.log(err)
      }
    
      
    }

    useEffect(()=>{
      fetchDataById()

    },[])

  return (
    <>
    <Header/>

        <div className="flex flex-col gap-4">
          <div className='m-2 p-2'>
            <label>OrderId</label>
            <h1>{fetchOrder?.order?._id}</h1>
          </div>
            <div className="flex border p-4 bg-gray-50 justify-start">
                <div className='border p-2'>
                  <ul>
                    <label>Delivery Address</label>
                    <li>{fetchOrder?.order?.deliveryAddress}</li>
                  </ul>
                </div>
                <div className='border p-2'>
                  <ul>
                    <label>Booking Date</label>
                    <li>{fetchOrder?.order?.bookingDate}</li>
                  </ul>
                </div>
                <div className='border p-2'>
                  <ul>
                    <label>Vehicle Number</label>
                    <li>{fetchOrder?.order?.vehicle_number}</li>
                  </ul>
                </div>
                <div className='border p-2'>
                  <ul>
                    <label>Distance</label>
                    <li>{fetchOrder?.order?.distance}</li>
                  </ul>
                </div>
            </div>
            <div className="flex border p-4 bg-gray-50 justify-start">
              {
                orderDetails?.delivery_status === "Pending"? (
                  <>
                  
                  <label>Update Deliver Status</label>
                <select> 
                  <option value='on the way'>on the way</option>
                </select>
                </>

                )
                 : (<h1>Order is On the way</h1>)
              }
            
            </div>
            <div className="border p-4 bg-blue-300">
            
            </div>
            <div className="border p-4 bg-blue-300">
            
            </div>
        </div>  
    </>
  )
}

export default Orderstage
