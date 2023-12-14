import {connect , disconnect } from 'mongoose';

async function connectDatabase(){
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error);
        throw new Error("can not connect to the mongo db database")
    }
}



async function disconectToDatabase(){
    try {
     await disconnect()   
    } catch (error) {
        console.log(error)
       throw new Error("can not connect to mongoDb server") 
    }
}


export {connectDatabase,disconectToDatabase}