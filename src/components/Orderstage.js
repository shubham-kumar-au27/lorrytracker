import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orderstage = () => {
  const fetchOrder = useSelector((store) => store?.order?.orders);
  const user = useSelector((store) => store?.user);
  const [orderDetails, setOrderDetails] = useState(null);
  const orderId = fetchOrder?.order?._id;
  const id = user?.uid;
  const [visibleDropdowns, setVisibleDropdowns] = useState({
    deliveryStatus: true,
    paymentStatus: false,
    weighBillStatus: false,
    billStatus: false,
    paymentReceivedStatus: false,
  });

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
    const savedDropdowns = localStorage.getItem('visibleDropdowns'); // Get from local storage
    if (savedDropdowns) {
      setVisibleDropdowns(JSON.parse(savedDropdowns));
    }
  }, []);

  const handleStatusUpdate = async (statusType, value) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/order/updatestatus/${orderId}?userId=${id}`,
        { [statusType]: { status: value, date: new Date() } }
      );

      if (response.status === 200) {
        await fetchDataById();
        toast.success(`Order ${statusType} updated to ${value}`);
        updateVisibleDropdowns(statusType, value);
      } else {
        toast.error('Error updating order status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating order status');
    }
  };

  const updateVisibleDropdowns = (statusType, value) => {
    setVisibleDropdowns((prevVisibleDropdowns) => {
      let updatedDropdowns = { ...prevVisibleDropdowns };
      switch (statusType) {
        case 'delivery_status':
          updatedDropdowns = { ...updatedDropdowns, deliveryStatus: false, paymentStatus: value === 'Delivered' };
          break;
        case 'isPaymentDone':
          updatedDropdowns = { ...updatedDropdowns, paymentStatus: false, weighBillStatus: value === 'Done' };
          break;
        case 'weighBillReceived':
          updatedDropdowns = { ...updatedDropdowns, weighBillStatus: false, billStatus: value === 'Received' };
          break;
        case 'billSubmission':
          updatedDropdowns = { ...updatedDropdowns, billStatus: false, paymentReceivedStatus: value === 'Submitted' };
          break;
        case 'paymentReceived':
          if (value === 'Received') {
            updatedDropdowns = { deliveryStatus: false, paymentStatus: false, weighBillStatus: false, billStatus: false, paymentReceivedStatus: false };
            toast.success('Your order is closed',{
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
          break;
        default:
          return prevVisibleDropdowns;
      }
      localStorage.setItem('visibleDropdowns', JSON.stringify(updatedDropdowns)); // Save to local storage
      return updatedDropdowns;
    });
  };

  useEffect(() => {
    fetchDataById();
    updateVisibleDropdownsBasedOnOrderStatus();
  }, []);
  
  const updateVisibleDropdownsBasedOnOrderStatus = () => {
    const deliveryStatus = fetchOrder?.order?.delivery_status?.status;
    const paymentStatus = fetchOrder?.order?.isPaymentDone?.status;
    const weighBillStatus = fetchOrder?.order?.weighBillReceived?.status;
    const billStatus = fetchOrder?.order?.billSubmission?.status;
    const paymentReceivedStatus = fetchOrder?.order?.paymentReceived?.status;
  
    setVisibleDropdowns({
      deliveryStatus: deliveryStatus !== 'Delivered',
      paymentStatus: deliveryStatus === 'Delivered' && paymentStatus !== 'Done',
      weighBillStatus: paymentStatus === 'Done' && weighBillStatus !== 'Received',
      billStatus: weighBillStatus === 'Received' && billStatus !== 'Submitted',
      paymentReceivedStatus: billStatus === 'Submitted' && paymentReceivedStatus !== 'Received',
    });
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
          {visibleDropdowns.deliveryStatus && (
            <div className='mb-4'>
              <label className="text-lg font-bold">Update Delivery Status</label>
              <select
                className="border p-2"
                onChange={(e) => handleStatusUpdate('delivery_status', e.target.value)}
                defaultValue={fetchOrder?.order?.delivery_status?.status || 'Not Delivered'}
              >
                <option value='Not Delivered'>Not Delivered</option>
                <option value='Delivered'>Delivered</option>
              </select>
            </div>
          )}

          {visibleDropdowns.paymentStatus && (
            <div className='mb-4'>
              <label className="text-lg font-bold">Update Payment Status</label>
              <select
                className="border p-2"
                onChange={(e) => handleStatusUpdate('isPaymentDone', e.target.value)}
                defaultValue={fetchOrder?.order?.isPaymentDone?.status || 'Not Done'}
              >
                <option value='Not Done'>Not Done</option>
                <option value='Done'>Done</option>
              </select>
            </div>
          )}

          {visibleDropdowns.weighBillStatus && (
            <div className='mb-4'>
              <label className="text-lg font-bold">Update Weigh-Bill Status</label>
              <select
                className="border p-2"
                onChange={(e) => handleStatusUpdate('weighBillReceived', e.target.value)}
                defaultValue={fetchOrder?.order?.weighBillReceived?.status || 'Not Received'}
              >
                <option value='Not Received'>Not Received</option>
                <option value='Received'>Received</option>
              </select>
            </div>
          )}

          {visibleDropdowns.billStatus && (
            <div className='mb-4'>
              <label className="text-lg font-bold">Update Bill Status</label>
              <select
                className="border p-2"
                onChange={(e) => handleStatusUpdate('billSubmission', e.target.value)}
                defaultValue={fetchOrder?.order?.billSubmission?.status || 'Not Submitted'}
              >
                <option value='Not Submitted'>Not Submitted</option>
                <option value='Submitted'>Submitted</option>
              </select>
            </div>
          )}

          {visibleDropdowns.paymentReceivedStatus && (
            <div className='mb-4'>
              <label className="text-lg font-bold">Update Payment Received Status</label>
              <select
                className="border p-2"
                onChange={(e) => handleStatusUpdate('paymentReceived', e.target.value)}
                defaultValue={fetchOrder?.order?.paymentReceived?.status || 'Not Received'}
              >
                <option value='Not Received'>Not Received</option>
                <option value='Received'>Received</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default Orderstage;