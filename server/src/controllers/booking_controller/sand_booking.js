
import moment from 'moment-timezone';
import sandBookingSchema from '../../models/booking_models/booking.model.js';

export const createOrder = async (req, res, next) => {
  try {
    const {
      userId,
      bookingDate,
      quantity,
      deliveryAddress,
      vehicle_number,
      driver_number,
      distance,
      total_amount,
    } = req.body;
    console.log(userId, bookingDate, quantity, deliveryAddress);

    // Validate the input data (you might want to do more validation)
    if (!userId || !bookingDate || !quantity || !deliveryAddress || !vehicle_number || !driver_number || !distance || !total_amount) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Create a new order with proper subdocument structures
    const newOrder = new sandBookingSchema({
      userId,
      bookingDate,
      quantity,
      deliveryAddress,
      vehicle_number,
      driver_number,
      distance,
      total_amount,
      delivery_status: { status: 'Pending', date: null }, // Default status
      unloading_status: { status: 'No', date: null }, // Default unloading status
      isDelivered: { status: 'No', date: null }, // Default isDelivered status
      isPaymentReceived: { status: 'No', date: null }, // Default isPaymentReceived status
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

// ... (other imports and code)

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
    const existingOrder = await sandBookingSchema.findById(orderId);

    // Check if the order exists
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update specific fields if they are present in the request body
    if (userId) existingOrder.userId = userId;
    if (bookingDate) existingOrder.bookingDate = bookingDate;
    if (quantity) existingOrder.quantity = quantity;
    if (deliveryAddress) existingOrder.deliveryAddress = deliveryAddress;
    if (vehicle_number) existingOrder.vehicle_number = vehicle_number;
    if (driver_number) existingOrder.driver_number = driver_number;
    if (distance) existingOrder.distance = distance;
    if (total_amount) existingOrder.total_amount = total_amount;

    // Set the time zone to Indian Standard Time (IST)
    const IST = 'Asia/Kolkata';

    if (delivery_status) {
      existingOrder.delivery_status = {
        status: delivery_status.status,
        date: new Date(),
      };
    }
    
    // Update unloading_status.date with an object conforming to statusSchema
    if (unloading_status) {
      existingOrder.unloading_status = {
        status: unloading_status.status,
        date: new Date(),
      };
    }
    
    // Update isDelivered.date with an object conforming to statusSchema
    if (isDelivered) {
      existingOrder.isDelivered = {
        status: isDelivered.status,
        date: new Date(),
      };
    }
    
    // Update isPaymentReceived.date with an object conforming to statusSchema
    if (isPaymentReceived) {
      existingOrder.isPaymentReceived = {
        status: isPaymentReceived.status,
        date: new Date(),
      };
    }

    // Save the updated order to the database
    await existingOrder.save();
    console.log(existingOrder);

    return res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};