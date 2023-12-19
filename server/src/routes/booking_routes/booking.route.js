import {Router} from 'express';
import { createOrder, getOrder, getorderById, updateOrder } from '../../controllers/booking_controller/sand_booking.js';



const bookingRouter = Router();


bookingRouter.post('/createorder',createOrder)

bookingRouter.get('/getorders',getOrder)
// bookingRouter.get('/otp',verifyUser)
bookingRouter.get('/getOrderById',getorderById)

bookingRouter.put('/updatestatus/:id',updateOrder)


export default bookingRouter;