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
  delivery_status: {
    type: String,
    enum: ['Pending', 'on the way', 'Delivered'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});



export default mongoose.model("SandBooking",sandBookingSchema)
