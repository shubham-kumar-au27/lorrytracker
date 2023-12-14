import Redis from "ioredis";

import { config } from 'dotenv';

config()

 const redisClient = ()=>{
    if(process.env.REDIS_URL){
        console.log('redis connected ')
        return process.env.REDIS_URL;
    }else{
        throw new Error("Redis connection Failed ")
    }
}

export const redis = new Redis(redisClient());
