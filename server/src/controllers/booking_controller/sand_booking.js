
import moment from 'moment';
import sandBookingSchema from '../../models/booking_models/booking.model.js';

export const createOrder = async (req, res, next) => {
  try {
    const { userId, bookingDate, quantity, deliveryAddress } = req.body;

    // Validate the input data (you might want to do more validation)
    if (!userId || !bookingDate || !quantity || !deliveryAddress) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Parse and validate the date format using moment
    const parsedBookingDate = moment(bookingDate, 'DD-MM-YYYY', true);

    if (!parsedBookingDate.isValid()) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    // Create a new order
    const newOrder = new sandBookingSchema({
      userId,
      bookingDate: parsedBookingDate.toDate(), // Convert back to Date object
      quantity,
      deliveryAddress,
      delivery_status: 'Pending', // Default status
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
