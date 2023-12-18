
import moment from 'moment';
import sandBookingSchema from '../../models/booking_models/booking.model.js';

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


export const getOrder = async (req,res)=>{
  try{
    // console.log('called')

    const user = await req.query.userid
    console.log(user)

    const sanddata = await SandBooking.find({userId:user})

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


export const updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id; 
    const userId = req.query.userId;
    const {
      bookingDate,
      quantity,
      deliveryAddress,
      vehicle_number,
      driver_number,
      distance,
      total_amount,
      delivery_status,
      unloading_status,
      isDelivered,
      isPaymentReceived,

    } = req.body;

    // Validate the input data
    if (!orderId) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Find the existing order by ID
    const existingOrder = await SandBooking.findById(orderId);

    // Check if the order exists
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    console.log(existingOrder._id)
    // Update specific fields if they are present in the request body
    if (userId) existingOrder.userId = userId;
    if (bookingDate) existingOrder.bookingDate = bookingDate;
    if (quantity) existingOrder.quantity = quantity;
    if (deliveryAddress) existingOrder.deliveryAddress = deliveryAddress;
    if (vehicle_number) existingOrder.vehicle_number = vehicle_number;
    if (driver_number) existingOrder.driver_number = driver_number;
    if (distance) existingOrder.distance = distance;
    if (total_amount) existingOrder.total_amount = total_amount;
    if (delivery_status) existingOrder.delivery_status = delivery_status;
    if (unloading_status) existingOrder.unloading_status = unloading_status;
    if (isDelivered) existingOrder.isDelivered = isDelivered;
    if (isPaymentReceived) existingOrder.isPaymentReceived = isPaymentReceived;

    // Save the updated order to the database
    await existingOrder.save();

    return res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

