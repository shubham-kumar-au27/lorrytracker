import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import OrderTable from './OrderTable';


const Home = () => {
  const user = useSelector((store) => store?.user?.uid);


 const [orders, setOrders] = useState([]);

  // Add a loading state
  const [loading, setLoading] = useState(true);

  const getOrdersById = async (user) => {
    try {
      const getOrders = await axios.get(`http://localhost:5000/api/v1/order/getorders?userid=${user}`);
      setOrders(getOrders?.data);
      // Once data is fetched, set loading to false
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getOrdersById(user);
    }
  }, [user]);

  // If loading is true, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <OrderTable orders={orders} /> 
  );
};

export default Home;