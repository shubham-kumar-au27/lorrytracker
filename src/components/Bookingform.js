import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import SandBook from "./SandBook";
import { useNavigate } from "react-router-dom";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SandBookingForm = () => {
  const [step, setStep] = useState(1);
  const user = useSelector((store) => store.user);
  const navigate =  useNavigate()
  const [orderData, setOrderData] = useState({
      bookingDate: '',
      quantity: '',
      rate_per_km: '',
      reach_name: '',
      deliveryAddress: '',
      vehicle_number: '',
      driver_number: '',
      driver_name: '',
      distance: '',
      total_amount: '',
      delivery_status: '',
      isPaymentDone: '',
      weighBillReceived: '',
      billSubmission: '',
      paymentReceived:" ",
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleCreateOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/order/createorder",
        {
          userId: user.uid,
          ...orderData,
        }
      );
      toast.success('order Create  successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/home')
      
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col m-10">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {step === 1 && <SandBook orderData={orderData} setOrderData={setOrderData} />}

          

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={step === 1 ? handleCreateOrder : handleNextStep}
            >
              {step === 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default SandBookingForm;