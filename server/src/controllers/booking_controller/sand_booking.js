
import moment from 'moment';
import mongoose from 'mongoose';
import sandBookingSchema from '../../models/booking_models/booking.model.js';

export const createOrder = async (req, res, next) => {
  try {
    const { userId, bookingDate, quantity, deliveryAddress } = req.body;
    console.log(userId,bookingDate,quantity,deliveryAddress)

    // Validate the input data (you might want to do more validation)
    if (!userId || !bookingDate || !quantity || !deliveryAddress) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    

    // Create a new order
    const newOrder = new sandBookingSchema({
      userId,
      bookingDate: bookingDate, 
      quantity,
      deliveryAddress,
      delivery_status: 'Pending', // Default status
    });

    // Save the order to the database
    await newOrder.save();

    return res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getOrder = async (req,res)=>{
  try{
    // console.log('called')
  
    const user = await req.query.userid
    console.log(user)

    const sanddata = await sandBookingSchema.find({userId:user})

    // console.log(sanddata)

    return res.send(sanddata)

  
  }catch(error){
    console.log('failed')
    console.log(error)
    return res.send(error)

  }

}

export const getorderById = async (req,res)=>{
  try{

    const getId = req.query.orderid
    console.log(getId)

    const getOrder = await sandBookingSchema.findById({_id:getId})

    return res.send(getOrder)
    // console.log(getOrder)
  }catch(err){
    return res.send(err)

  }

}
