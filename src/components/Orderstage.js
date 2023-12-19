import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orderstage = () => {
  const fetchOrder = useSelector((store) => store?.order?.order);
  const user = useSelector((store) => store.user);
  const [orderDetails, setOrderDetails] = useState(null);
  const orderId = fetchOrder?.order?._id;
  const id = user?.uid
  console.log(id)
  const fetchDataById = async () => {
    try {
      const getData = await axios.get(`http://localhost:5000/api/v1/order/getOrderById?orderid=${orderId}`);
      setOrderDetails(getData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataById();
  }, []);

  const handleStatusUpdate = async (statusType, value) => {
    try {
      console.log('Updating order:', orderId, 'UserID:', id, 'Status:', statusType, 'Value:', value);
  
      const response = await axios.put(
        `http://localhost:5000/api/v1/order/updatestatus/${orderId}?userId=${id}`,
        { [statusType]: value } // Include statusType and value in the request payload
      );
  
      console.log('Response:', response);
  
      if (response.status === 200) {
        await fetchDataById(); // Await the completion of fetchDataById
        toast.success(`Order ${statusType} updated to ${value}`);
      } else {
        toast.error('Error updating order status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating order status');
    }
  };
  
  
  
  
  

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <div className='border p-2'>
          <label className="text-lg font-bold">Order Details</label>
          <div className="flex flex-wrap gap-4 mt-2">
            <div>
              <label>Order ID:</label>
              <div>{fetchOrder?.order?._id}</div>
            </div>
            <div>
              <label>Delivery Address:</label>
              <div>{fetchOrder?.order?.deliveryAddress}</div>
            </div>
            <div>
              <label>Booking Date:</label>
              <div>{fetchOrder?.order?.bookingDate}</div>
            </div>
            <div>
              <label>Vehicle Number:</label>
              <div>{fetchOrder?.order?.vehicle_number}</div>
            </div>
            <div>
              <label>Distance:</label>
              <div>{fetchOrder?.order?.distance}</div>
            </div>
          </div>
        </div>
        <div className="border p-4 bg-gray-50">
          <div className='mb-4'>
            <label className="text-lg font-bold">Update Delivery Status</label>
            <select className="border p-2" onChange={(e) => handleStatusUpdate('delivery', e.target.value)}>
              <option value='on the way'>On the way</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className="text-lg font-bold">Update Unloading Status</label>
            <select className="border p-2" onChange={(e) => handleStatusUpdate('unloading_status', e.target.value)}>
              <option value='Yes'>Unloaded</option>
              <option value='No'>Not Unloading</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className="text-lg font-bold">Update Order Status</label>
            <select className="border p-2" onChange={(e) => handleStatusUpdate('isDelivered', e.target.value)}>
              <option value='Yes'>Delivered</option>
              <option value='No'>Yet To be Delivered</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className="text-lg font-bold">Update Payment Status</label>
            <select className="border p-2" onChange={(e) => handleStatusUpdate('isPaymentReceived', e.target.value)}>
              <option value='Yes'>Payment Received</option>
              <option value='No'>Payment Not received</option>
            </select>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Orderstage;



