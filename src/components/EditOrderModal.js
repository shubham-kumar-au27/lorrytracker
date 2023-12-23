import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';

// Modal.setAppElement('#root') // replace #root with your app's root element id

const EditOrderModal = ({ isOpen, onRequestClose, order }) => {
  const [formFields, setFormFields] = useState({});
  const user = useSelector((store) => store?.user);
  const id = user?.uid;

  useEffect(() => {
    if (order) {
      setFormFields(order);
    }
  }, [order]);

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/order/updatestatus/${order._id}?userId=${id}`,
        formFields
      );

      if (response.status === 200) {
        toast.success('Order updated successfully',{
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        onRequestClose();
      } else {
        toast.error('Error updating order');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating order',{
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };;

  const inputFields = [
    { label: "Booking Date :-", type: "date", name: "bookingDate" },
    { label: "Reach Name :-", type: "text", name: "reach_name" },
    { label: "Dispatch Location :-", type: "text", name: "deliveryAddress" },
    { label: "Vehicle Number :-", type: "text", name: "vehicle_number" },
    { label: "Driver Name :-", type: "text", name: "driver_name" },
    { label: "Driver Number :-", type: "number", name: "driver_number" },
    { label: "Sand Weight :-", type: "number", name: "quantity" },
    { label: "Distance to Travel In Km :-", type: "number", name: "distance" },
    { label: "Rate Per Km :-", type: "number", name: "rate_per_km" },
    { label: "Total Amount :-", type: "number", name: "total_amount" },
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      style={{
      
        content: {
         

          position:"absolute",
          top: "40px",
          left: "40px",
          right:" 40px",
          bottom: "40px",
          backgroundColor: "black",
          width:"650px",
          height:"auto",
          
          
        }
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {inputFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-2 font-bold text-lg text-white">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formFields[field.name]}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
        ))}
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition duration-200">Update Order</button>
      </form>
    </Modal>
  );
};

export default EditOrderModal;