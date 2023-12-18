import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import orderReducer from './ordersSlice'

const appStore = configureStore({
    reducer: {
        user:userReducer,
        order:orderReducer
        
    },
})

export default appStore

