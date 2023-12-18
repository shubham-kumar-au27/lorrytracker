import {Router} from 'express';
import { createOrder, getOrderById } from '../../controllers/booking_controller/sand_booking.js';



const bookingRouter = Router();


bookingRouter.post('/createorder',createOrder)

bookingRouter.get('/getorders',getOrderById)
// bookingRouter.get('/otp',verifyUser)
bookingRouter.get('/getOrderById',getorderById)


export default bookingRouter;