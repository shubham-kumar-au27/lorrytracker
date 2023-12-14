import app from "./app.js";
import { redis } from "./config/redis.js";
import { connectDatabase } from "./db/connection.js"; 
import {v2 as cloudinary} from 'cloudinary';


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET_KEY,
  });



const PORT = process.env.PORT || 5000;
    //connection and listeners 
    connectDatabase().then(()=>{
        if (cloudinary.config().api_key) {
            console.log('Cloudinary connected');
        } else {
            throw new Error("Cloudinary connection failed");
        }

        if (redis.status === 'ready') {
            console.log('Redis connected');
        } else {
            throw new Error("Redis connection failed");
        }


    app.listen(PORT,()=>console.log(`server Open and connected to database👌 at post ${PORT}`))
}).catch((err)=>console.log(err));