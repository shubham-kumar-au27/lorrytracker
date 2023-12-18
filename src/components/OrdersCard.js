import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import { saveOrder} from '../utils/ordersSlice'

const OrdersCard = ({orders}) => {
    
    const {bookingDate,quantity,deliveryAddress,vehicle_number} = orders
    // const order = orders

    const dispatch = useDispatch()

    

    // console.log(orderId)
    // const fetchDataById = ()=>{
    //   const orderDetails = ()=>{
        
    //   }
    // }



    const handleClick = (order)=>{
      console.log('clicked')
      // console.log(order)
      dispatch(saveOrder({order:order}))
      
    }

    useEffect(()=>{


    },[])





  return (
    <div className='m-3 p-2 w-[100%] h-fit bg-gray-300  md:box-border shadow-md' onClick={()=>handleClick(orders)}>
         <Link to="/orderstatus">
          <ul>
              <li><h1 className='font-bold'> Booking Date:</h1>{bookingDate}</li>
              <li>Quantity:{quantity}</li>
              <li>deliveryAddress:{deliveryAddress}</li>
              <li><h1 className='font-bold'>VehicleNumber:</h1>{vehicle_number}</li>
          </ul>
         </Link>
    </div>
  )
}

export default OrdersCard
