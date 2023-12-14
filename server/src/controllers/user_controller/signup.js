// import userModel from "../../models/users_models/user.model.js";
// import { hash, compare } from "bcrypt";

// export const userRegister = async (req, res, next) => {
//   try {
//     // console.log(req.body);  // Log the entire req.body object

//     const { name, email, password } = req.body;
//     // Validate the user data
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.status(401).send("user is already registered");
//     }

//     const hashPassword = await hash(password, 10);
//     const user = new userModel({
//       email,
//       name,
//       password: hashPassword,
//     });

//     await user.save()


//     res.status(200).json({
//         success:true,
//         message:"user registered successfully",
//         user
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

import userModel from "../../models/users_models/user.model.js";
import { hash } from "bcrypt";
import admin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json" assert { type: 'json' };
import { COOKIE_NAME } from "../../utils/constant.js";
import { createToken } from "../../utils/tokenManeger.js";

// Initialize Firebase Admin SDK with your configuration
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

export const userRegister = async (req, res, next) => {
  try {
    const { name, phoneNumber, password , email } = req.body;

    // Ensure the phone number is in E.164 format
    const formattedPhoneNumber = `+91${phoneNumber}`; // Assuming the country code is +91 for India

    const existingUser = await userModel.findOne({ phoneNumber: formattedPhoneNumber });
    if (existingUser) {
      return res.status(401).send("User is already registered");
    }
    const existingemail = await userModel.findOne({ email });
    if (existingemail) {
      return res.status(401).send("email is already registered");
    }


    // Generate a random 6-digit OTP
 

    // Send OTP to the user's phone number using Firebase Authentication
    await admin.auth().createUser({
      phoneNumber: formattedPhoneNumber,
    });


   // Save the user with hashed password and OTP
const hashPassword = await hash(password, 10);
const otp = Math.floor(100000 + Math.random() * 900000);
const otpExpiresAt = new Date();
otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 15); // OTP expires in 15 minutes

const user = new userModel({
  phoneNumber: formattedPhoneNumber,
  name,
  password: hashPassword,
  email,
  otp,
  otpExpiresAt,
});

await user.save();
    res.clearCookie(COOKIE_NAME,{
      path:'/',
      httpOnly:true,
      domain:'localhost',
      signed:true,
      secure:true,
      sameSite:'none'
    })

    const token = createToken(user._id.toString(), user.email, user.phoneNumber,"7d")
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token,{
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: 'none',
    })

    res.status(200).json({
      success: true,
      message: "User registered successfully. Check your phone for OTP.",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
    });
  }
};



export const verifyUser = async()=>{

  const {otp}=req.body;
  const userId = req.locals.jawData.id
  try {
    
    const user = await userModel.findById(userId);
    if(!user){
      return res.status(404).json({message: "User not found"})
    }
    if(user.isVerified){
      return res.status(403).json({message:"This account is already verified."});
    }
    //check otp
    if(user.OTP !== otp  || user.otpExpiresAt< new Date()){
      return res.status(401).json({
        success:false, message: "Invalid Or  OTP Expire"
      })
    }
    user.isVerified =true;
    await user.save()
    res.sendStatus(200).json({
      success:true,
      message:"USwr verified Successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Error for verifying user "
    })
    
  }

}