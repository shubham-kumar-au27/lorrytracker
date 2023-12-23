import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from './Header';
import { BASE_URL } from '../utils/constants';

const PivotTable = () => {
    const user = useSelector((store) => store?.user);
    const displayName = user?.displayName;
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getOrdersById = async (user) => {
        try {
            if (user.uid) {
                const getOrders = await axios.get(`${BASE_URL}/api/v1/order/getorders`, {
                    params: {
                        userid: user.uid,
                        displayName: displayName,
                    },
                });
                setOrders(getOrders?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrdersById(user);
    }, [user]);

    const data = orders.reduce((acc, order) => {
        if (!acc[order.userId]) {
            acc[order.userId] = {
                userId: order.userName,
                delivery_status: { Delivered: 0, 'Not Delivered': 0 },
                isPaymentDone: { Done: 0, 'Not Done': 0 },
                weighBillReceived: { Received: 0, 'Not Received': 0 },
                billSubmission: { Submitted: 0, 'Not Submitted': 0 },
                paymentReceived: { Received: 0, 'Not Received': 0 },
            };
        }

        acc[order.userId].delivery_status[order.delivery_status.status]++;
        acc[order.userId].isPaymentDone[order.isPaymentDone.status]++;
        acc[order.userId].weighBillReceived[order.weighBillReceived.status]++;
        acc[order.userId].billSubmission[order.billSubmission.status]++;
        acc[order.userId].paymentReceived[order.paymentReceived.status]++;

        return acc;
    }, {});

    const dataArray = Object.values(data).filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const quantityData = orders.reduce((acc, order) => {
        if (!acc[order.userId]) {
          acc[order.userId] = {
            userId: order.userName,
            totalQuantity: 0,
          };
        }
      
        const quantity = Number(order.quantity);
        acc[order.userId].totalQuantity += isNaN(quantity) ? 0 : quantity;
      
        return acc;
      }, {});

    const quantityArray = Object.values(quantityData).filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );



    return (
        <div>
        <Header/>
        
        <div className="bg-white p-8 rounded-md shadow-md overflow-x-auto">
        
            <h2 className="text-3xl font-bold mb-6">Order Summary</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-3 w-full rounded-md"
                />
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-blue-300">
                        <th className="border p-3">User</th>
                        <th colSpan="2" className="border p-3">Delivery Status</th>
                        <th colSpan="2" className="border p-3">Payment Done</th>
                        <th colSpan="2" className="border p-3">Weigh Bill Received</th>
                        <th colSpan="2" className="border p-3">Bill Submission</th>
                        <th colSpan="2" className="border p-3">Payment Received</th>
                    </tr>
                    <tr className="bg-gray-300">
                        <th className="border p-3"></th>
                        <th className="border p-3">Delivered</th>
                        <th className="border p-3">Not Delivered</th>
                        <th className="border p-3">Done</th>
                        <th className="border p-3">Not Done</th>
                        <th className="border p-3">Received</th>
                        <th className="border p-3">Not Received</th>
                        <th className="border p-3">Submitted</th>
                        <th className="border p-3">Not Submitted</th>
                        <th className="border p-3">Received</th>
                        <th className="border p-3">Not Received</th>
                    </tr>
                </thead>
                <tbody>
                    {dataArray.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-blue-500' : ''}>
                            <td className="border p-3">{item.userId}</td>
                            <td className="border p-3">{item.delivery_status.Delivered}</td>
                            <td className="border p-3">{item.delivery_status['Not Delivered']}</td>
                            <td className="border p-3">{item.isPaymentDone.Done}</td>
                            <td className="border p-3">{item.isPaymentDone['Not Done']}</td>
                            <td className="border p-3">{item.weighBillReceived.Received}</td>
                            <td className="border p-3">{item.weighBillReceived['Not Received']}</td>
                            <td className="border p-3">{item.billSubmission.Submitted}</td>
                            <td className="border p-3">{item.billSubmission['Not Submitted']}</td>
                            <td className="border p-3">{item.paymentReceived.Received}</td>
                            <td className="border p-3">{item.paymentReceived['Not Received']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-3xl font-bold mb-6 mt-10">Quantity Summary</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-blue-300">
                        <th className="border p-3">User</th>
                        <th className="border p-3">Total Quantity of Sand Booked</th>
                    </tr>
                </thead>
                <tbody>
                    {quantityArray.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-blue-500' : ''}>
                            <td className="border p-3">{item.userId}</td>
                            <td className="border p-3">{item.totalQuantity} Metric/Ton</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}



export default PivotTable;