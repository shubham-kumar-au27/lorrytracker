

import SandBooking from '../../models/booking_models/booking.model.js';
import mongoose from 'mongoose';

export const createOrder = async (req, res, next) => {
  try {
    const { userId, bookingDate, quantity, deliveryAddress ,vehicle_number,driver_number,distance, total_amount} = req.body;
    console.log(userId, bookingDate, quantity, deliveryAddress);

    // Validate the input data (you might want to do more validation)
    if (!userId || !bookingDate || !quantity || !deliveryAddress || !vehicle_number || !driver_number || !distance || !total_amount) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Create a new order
    const newOrder = new SandBooking({
      userId,
      bookingDate,
      quantity,
      deliveryAddress,
      vehicle_number,
      driver_number,
      distance,
      total_amount,
      delivery_status: 'Pending', // Default status
      unloading_status: 'No', // Default unloading status
      isDelivered: 'No', // Default isDelivered status
      isPaymentReceived: 'No', // Default isPaymentReceived status
    });

    // Save the order to the database
    await newOrder.save();

    return res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
