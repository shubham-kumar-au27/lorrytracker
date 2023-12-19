import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: null
  },
  reducers: {
    saveOrder: (state, action) => {
      state.orders = action.payload;
    }
  }
});

export const { saveOrder } = orderSlice.actions;
export default orderSlice.reducer;