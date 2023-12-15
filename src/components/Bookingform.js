import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';

const SandBookingForm = () => {
    const bookingDate = useRef(null)
    const quantity = useRef(null)
    const deliveryAddress = useRef(null)

    const user = useSelector(store => store.user);

    const handleCreateOrder = ()=>{
        try{
            const Data = axios.post('http://localhost:5000/api/v1/order/createorder',{userId:user.uid,
            bookingDate:bookingDate.current.value,
        quantity:quantity.current.value,deliveryAddress:deliveryAddress.current.value})
        console.log( Data.data)
        // console.log(user?.uid)
        // console.log(deliveryAddress.current.value,quantity.current.value)

        }catch(error){
            console.log(error)
        }
        
    }

  

  return (
    <>
    <Header/>
    <div className="flex w-full m-10">
<form  className="space-y-4"  onSubmit={(e)=> e.preventDefault()}>
  <div>
    <label  className="block text-sm font-medium text-gray-700" ></label>
    {/* <input
      type="text"
      className="mt-1 p-2 border rounded-md w-full"
      required
    /> */
    }
  </div>

  <div>
    <label  className="block text-sm font-medium text-gray-700">
      Booking Date
    </label>
    <input
      type="date"
      ref = {bookingDate}
      className="mt-1 p-2 border rounded-md w-full"
      required
    />
  </div>

  <div>
    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
      Quantity
    </label>
    <input
      type="number"
      ref={quantity}
     
      className="mt-1 p-2 border rounded-md w-full"
      required
    />
  </div>

  <div>
    <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">
      Delivery Address
    </label>
    <input
      type="text"
      ref={deliveryAddress}
      className="mt-1 p-2 border rounded-md w-full"
      required
    />
  </div>

  <div>
    <button
      type="submit"
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      onClick={handleCreateOrder}
    >
      Submit
    </button>
  </div>
</form>
</div>
    </>
    
  );
};

export default SandBookingForm;
