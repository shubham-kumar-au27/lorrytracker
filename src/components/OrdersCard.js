import React from 'react'

const OrdersCard = ({orders}) => {
  console.log('props-',orders)
    const {bookingDate,quantity,deliveryAddress,vehicle_number} = orders
  return (
    <div className='m-3 p-2 w-[100%] h-fit bg-gray-300  md:box-border shadow-md'>
        <ul>
          
            <li><h1> Booking Date:</h1>{bookingDate}</li>
            <li>Quantity:{quantity}</li>
            <li>deliveryAddress:{deliveryAddress}</li>
            <li>Vehicle Number:{vehicle_number}</li>
        </ul>

    </div>
  )
}

export default OrdersCard
