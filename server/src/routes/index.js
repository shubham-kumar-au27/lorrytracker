import {Router} from 'express';
import userRouter from './users_routes/user.routes.js';
import bookingRouter from './booking_routes/booking.route.js';



const appRouter = Router()

appRouter.use('/user', userRouter)
appRouter.use("/order", bookingRouter)



export default appRouter;