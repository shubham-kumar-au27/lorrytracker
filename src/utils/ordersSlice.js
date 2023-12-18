import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name:"orders",
    initialState:{
        order:null
    },
    reducers:{
        saveOrder:(state,action)=>{
            state.order = action.payload
        }

    }

})

export const {saveOrder} = orderSlice.actions
export default orderSlice.reducer

