import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import OrdersCard from './OrdersCard'
import OrderTable from './OrderTable';

const Home = () => {
    const user = useSelector((store) => store?.user?.uid);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getOrdersById = async (user) => {
        try {
            const getOrders = await axios.get(`http://localhost:5000/api/v1/order/getorders?userid=${user}`)
            setOrders(getOrders?.data);
            setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
            console.log(error);
            setLoading(false); // Set loading to false in case of an error
        }
    }

    useEffect(() => {
        setLoading(true); // Set loading to true when starting to fetch data
        getOrdersById(user);
    }, [user]);

    return (
        <>
            <Header />
            <h1 className='align-middle items-center text-sm sm:text-base md:text-lg'>My Orders</h1>
            <div className='flex w-full h-screen flex-col  md:flex-row'>
                {loading ? (
                    // Render a loading skeleton or spinner while waiting for data
                    <div className="animate-pulse flex-1 bg-gray-300 p-6 rounded-lg m-2"></div>
                ) : (
                    <OrderTable orders={orders} />
                )}
            </div>
        </>
    );
}

export default Home;
