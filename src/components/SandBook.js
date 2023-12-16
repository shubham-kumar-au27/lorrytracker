import React from "react";

const SandBook = ({ orderData, setOrderData }) => {
  
  const inputFields = [
    { label: "Booking Date", type: "date", name: "bookingDate" },
    { label: "Quantity", type: "number", name: "quantity" },
    { label: "Delivery Address", type: "text", name: "deliveryAddress" },
    { label: "Vehicle Number", type: "text", name: "vehicle_number" },
    { label: "Driver Number", type: "text", name: "driver_number" },
    { label: "Distance to Travel In Km", type: "text", name: "distance" },
    { label: "Total Amount", type: "text", name: "total_amount" },
  ];

  return (
    <>
      {inputFields.map((field) => (
        <div key={field.name} className="flex mb-4">
          <label
            htmlFor={field.name}
            className="text-sm font-medium text-gray-700 w-1/3 pr-4 mt-5"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            value={orderData[field.name]}
            onChange={(e) =>
              setOrderData({
                ...orderData,
                [field.name]: e.target.value,
              })
            }
            className="mt-1 p-2 border rounded-md w-1/2"
            required
          />
        </div>
      ))}
    </>
  );
};

export default SandBook;
