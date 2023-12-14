import {Router} from 'express';
import { userRegister, verifyUser } from '../../controllers/user_controller/signup.js';
import {validate,signupValidator} from "../../utils/validator.js"

const userRouter = Router();


userRouter.post('/signup',validate(signupValidator),userRegister)
userRouter.get('/otp',verifyUser)

export default userRouter;