import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from './ProgressBar';
import { useParams } from 'react-router-dom/dist';
import { BASE_URL } from '../utils/constants';

const Orderstage = () => {
  const fetchOrder = useSelector((store) => store?.order?.order)
    // console.log(fetchOrder.order)
  const [orderDetails,setOrderDetails] = useState(null);
  const id = useSelector((store)=>store?.user?.uid)

  const [visibleDropdowns, setVisibleDropdowns] = useState({
    deliveryStatus: true,
    paymentStatus: false,
    weighBillStatus: false,
    billStatus: false,
    paymentReceivedStatus: false,
  });

  

  const [stage1,setStage1] = useState(false)
  const [stage2,setStage2] = useState(false)
  const [stage3,setStage3] = useState(false)

  const handleStatusUpdate = async (statusType, value) => {
    try {
      // console.log('Updating order:', orderId, 'UserID:', id, 'Status:', statusType, 'Value:', value);
  
      const response = await axios.put(
        `${BASE_URL}/api/v1/order/updatestatus/${orderId}?userId=${id}`,
        { [statusType]: {status:value,date:new Date()}} // Include statusType and value in the request payload
      );
      console.log('Response:', response.data);
      setOrderDetails(response.data)
   
  
      if (response.status === 200){
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

  const {_id} = useParams()
  const orderId = _id
    const fetchDataById = async()=>{
      try{
        const getData =  await axios.get(`${BASE_URL}/api/v1/order/getOrderById?orderid=${orderId}`)

        console.log(getData.data)
        setOrderDetails(getData.data)

      }catch(err){
        console.log(err)
      }
    }
    const updateVisibleDropdowns = (statusType, value) => {
      setVisibleDropdowns((prevVisibleDropdowns) => {
        switch (statusType) {
          case 'delivery_status':
            return {
              ...prevVisibleDropdowns,
              paymentStatus: value === 'Delivered',
            };
          case 'isPaymentDone':
            return {
              ...prevVisibleDropdowns,
              weighBillStatus: value === 'Done',
            };
          case 'weighBillReceived':
            return {
              ...prevVisibleDropdowns,
              billStatus: value === 'Received',
            };
          case 'billSubmission':
            return {
              ...prevVisibleDropdowns,
              paymentReceivedStatus: value === 'Submitted',
            };
          default:
            return prevVisibleDropdowns;
        }
      });
    };
    useEffect(()=>{
      fetchDataById()

    },[])

  return (
    <>
    <Header/>

        <div className="flex flex-col gap-4">
          
          <div className='m-2 p-2'>
            <label>OrderId</label>
            <h1>{orderDetails?._id}</h1>
          </div>
          <ProgressBar orderDetails={orderDetails}/>
         
          
            <div className="stage1 flex border p-4 bg-gray-50 justify-start">
                <div className='border p-2 shadow-md hover:bg-slate-300'>
                  <ul>
                    <label className='font-bold'>Delivery Address</label>
                    <li>{orderDetails?.deliveryAddress}</li>
                  </ul>
                </div>
                <div className='border p-2 shadow-md  hover:bg-slate-300'>
                  <ul>
                    <label className='font-bold'>Booking Date</label>
                    <li>{orderDetails?.bookingDate}</li>
                  </ul>
                </div>
                <div className='border p-2 shadow-md  hover:bg-slate-300'>
                  <ul>
                    <label className='font-bold'>Vehicle Number</label>
                    <li>{orderDetails?.vehicle_number}</li>
                  </ul>
                </div>
                <div className='border p-2 shadow-md  hover:bg-slate-300'>
                  <ul>
                    <label className='font-bold'>Distance</label>
                    <li>{orderDetails?.distance}</li>
                  </ul>
                </div>
                <div className='border p-2 shadow-md  hover:bg-slate-300'>
                  <ul>
                    <label className='font-bold'>Rate Per Km</label>
                    <li>{orderDetails?.rate_per_km}</li>
                  </ul>
                </div>
                <div className='border p-2 shadow-md  hover:bg-slate-300'>
                  <ul>
                    <label className='font-bold'>Destination</label>
                    <li>{orderDetails?.reach_name}</li>
                  </ul>
                </div>
                <div className='border p-2 shadow-md  hover:bg-slate-300'>
                  <ul>
                    <label className='font-bold'>Driver Name</label>
                    <li>{orderDetails?.driver_name}</li>
                  </ul>
                </div>
                <div className='border p-2 shadow-md  hover:bg-slate-300'>
                  <ul>
                    <label className='font-bold'>Driver Number</label>
                    <li>{orderDetails?.driver_number}</li>
                  </ul>
                </div>
            </div>
            <div className="stage2  border p-4 bg-gray-50 justify-start">
              <div className=''>
                <h1>Update Delivery Status ?</h1>
                <button onClick={()=> stage2? setStage2(false) : setStage2(true) }>⬇️</button>
              </div>
              <br/>
              {
                stage2 && (
                  <div className="border p-4 bg-gray-50">
                    {
                      orderDetails?.delivery_status?.status === 'Delivered'? (<h1 className='text-green-500'>Your Order has been delivered</h1>):(
                        
                        <div className='delivery-status mb-4'>
                        <label className="text-lg font-bold">Update Delivery Status</label>
                      
                        <select className="border p-2" onChange={(e) => handleStatusUpdate('delivery_status', e.target.value)}>
                          <option value='not delivered'>Not Delivered</option>
                          <option value='Delivered'>Delivered</option>
                        </select>
                       </div>
                      )
                    }
                
                </div>
                )
              }
            
            
            </div>

            <div className="stage3 payment-done-status border p-4 bg-gray-50 justify-start">
              {
                 orderDetails?.delivery_status?.status === 'Delivered'? (
                  <div className=' payment-done-status'>
                  {
  
                    orderDetails?.isPaymentDone?.status === 'Done'?
                    (<p className='text-green-500'>Payment Has been Done on { orderDetails?.isPaymentDone?.date}</p>):(
                      <div className='payment-done mb-4'>
                            <div className='mb-4'>
                              <label className="text-lg font-bold">Update Payment Status</label>
                              <select
                                className="border p-2"
                                onChange={(e) => handleStatusUpdate('isPaymentDone', e.target.value)}>
                                <option value='Not Done'>Not Done</option>
                                <option value='Done'>Done</option>
                              </select>
                          </div>
                      </div>
                    )
                  }
                  <button>⬇️</button>
                  </div>

                 ):(
                  <h1>Payment Status is awaited</h1>
                 )
              }
            </div>
            <div className="stage4 weigh-bill-status border p-4  bg-gray-50 justify-start">
              {orderDetails?.isPaymentDone?.status === 'Done'?(
                 <div className='weigh-bill-status'>
                 {
                   orderDetails?.weighBillReceived?.status === 'Received'?
                   (<p className='text-green-500'>Way Bill Received on{ orderDetails?.weighBillReceived?.date}</p>):(
                     <div className='weigh-bill-received mb-4'>
                       <label className="text-lg font-bold">Update Weigh-Bill Status</label>
                       <select
                         className="border p-2"
                         onChange={(e) => handleStatusUpdate('weighBillReceived', e.target.value)}
                       >
                         <option value='Not Received'>Not Received</option>
                         <option value='Received'>Received</option>
                     </select>
                 </div>
                   )
                 }
                 </div>
              ):(
                <h1>Weigh Bill Status is Awaited</h1>
              )

              }
              
                 <button>⬇️</button>
            </div>
            <div className="stage5 weigh-bill-submission border p-4 bg-gray-50 justify-start">
              {
                  orderDetails?.weighBillReceived?.status === 'Received'?(
                    <div className='weigh-bill-submission'>
                      {
                    orderDetails?.billSubmission?.status === 'Submitted'?(<p className='text-green-400'>Bill Has been Submitted</p>):(
                      <div className='weigh-bill-submission mb-4'>
                      <label className="text-lg font-bold">Update Bill Submission Status </label>
                      <select
                        className="border p-2"
                        onChange={(e) => handleStatusUpdate('billSubmission', e.target.value)}
                      >
                        <option value='Not Submitted'>Not Submitted</option>
                        <option value='Submitted'>Submitted</option>
                      </select>
                  </div>
                )
              }
                    </div>
                  ):(<h1>Bill Submission Status is Awaited</h1>)

              }
              
                 <button>⬇️</button>
            </div>
            <div className="stage6 payment-received-status border p-4 bg-gray-50 justify-start">
              {
                 orderDetails?.weighBillReceived?.status === 'Received'?(
                  <div className='payment-received-status'>
                    {
                  orderDetails?.paymentReceived?.status === 'Received'?(<p className='text-green-500'>Payment Received</p>):(
                    <div className='payment-received  mb-4'>
                    <label className="text-lg font-bold">Update Payment Received Status</label>
                    {/* <input placeholder='Enter the Amount' onChange={(e)=>handleStatusUpdate('',e.target.value)}/> */}
                      <select
                        className="border p-2"
                        onChange={(e) => handleStatusUpdate('paymentReceived', e.target.value)}
                      >
                        <option value='Not Received'>Not Received</option>
                        <option value='Received'>Received</option>
                      </select>
                  </div>
                  )
              }
                  </div>

                 ):(
                  <h1>Payment Received Status is Awaited</h1>
                 )
              }
              
            </div>
        </div>  
        <ToastContainer position="bottom-right" />
    </>
  )
}

export default Orderstage
