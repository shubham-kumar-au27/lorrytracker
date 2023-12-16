import {Router} from 'express';
import { createOrder, updateOrder,getOrderById } from '../../controllers/booking_controller/sand_booking.js';



const bookingRouter = Router();


bookingRouter.post('/createorder',createOrder)
bookingRouter.put('/updateorder/:id',updateOrder)
bookingRouter.get('/getorders',getOrderById)
// bookingRouter.get('/otp',verifyUser)

export default bookingRouter;