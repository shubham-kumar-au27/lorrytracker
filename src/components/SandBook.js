import React from "react";

const SandBook = ({ orderData, setOrderData }) => {
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

  const calculateTotalAmount = () => {
    const sandWeight = parseFloat(orderData.quantity) || 0;
    const ratePerKm = parseFloat(orderData.rate_per_km) || 0;
    const distance = parseFloat(orderData.distance) || 0;

    const calculatedTotalAmount = sandWeight * ratePerKm * distance;
    setOrderData((prevData) => ({
      ...prevData,
      total_amount: isNaN(calculatedTotalAmount) ? '' : calculatedTotalAmount,
    }));
  };

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
            onChange={(e) => {
              setOrderData({
                ...orderData,
                [field.name]: e.target.value,
              });
              if (["quantity", "rate_per_km", "distance"].includes(field.name)) {
                calculateTotalAmount();
              }
            }}
            className="mt-1 p-2 border rounded-md w-1/2"
            required
          />
        </div>
      ))}
    </>
  );
};

export default SandBook;