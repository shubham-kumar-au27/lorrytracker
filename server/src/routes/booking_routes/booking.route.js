import {Router} from 'express';
import { createOrder } from '../../controllers/booking_controller/sand_booking.js';



const bookingRouter = Router();


bookingRouter.post('/createorder',createOrder)
// bookingRouter.get('/otp',verifyUser)

export default bookingRouter;