import mongoose from "mongoose";

const sandBookingSchema  = mongoose.Schema({
  userId: {
    type:String,
    required:true
   
  },
  bookingDate: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  vehicle_number:{
    type:String,
    required:true
  },
  driver_number:{
    type:String,
    required:true
  },distance:{
    type :String,
    required:true
  },
  total_amount:{
    type :String,
    required:true
  },
  delivery_status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Delivered'],
    default: 'Pending',
  },
  unloading_status: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No',
  },
  isDelivered: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No',
  },
  isPaymentReceived: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No',
  },
}, {
  timestamps: true,
});



export default mongoose.model("SandBooking",sandBookingSchema)
