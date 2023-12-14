import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constant.js";


export const createToken = async(id,email,phoneNumber,expiresIn )=>{
    const payload = {id,email,phoneNumber}

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
    return token
}


export const verifyToken = async (req,res,next)=>{
    token = req.signedCookies[`${COOKIE_NAME}`]
    if (!token || token.trim()== ""){
        return res.status(401).json({message :"Token not received"})
    }
    if (!user.isVerified) {
        return res.status(401).json({
          message: "User is not verified",
        });
      }
    
    return new Promise((resolve,reject)=>{
            return jwt.verify(token, process.env.JWT_SECRET, (err,success)=>{
                if(err){
                    reject(err.message)
                    return res.status(401).json({message:"Token Expire"})
                }else{
                    resolve();
                    res.locals.jwsData = success;
                    return next()
                }
            })
    })

   
}