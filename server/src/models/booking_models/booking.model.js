import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "Not Delivered",
  },
  date: {
    type: Date,
    default: null,
  },
});

const paymentStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    
    default: "Not Done",
  },
  date: {
    type: Date,
    default: null,
  },
});
const weighBillReceivedSchema = new mongoose.Schema({
  status: {
    type: String,
    
    default: "Not Received",
  },
  date: {
    type: Date,
    default: null,
  },
});

const billSubmissionSchema = new mongoose.Schema({
  status: {
    type: String,
    
    default: "Not Submitted",
  },
  date: {
    type: Date,
    default: null,
  },
  amount:{
    type:String,
    
  }
});



const sandBookingSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    rate_per_km: {
      type: String,
      required: true,
    },
    reach_name: {
      type: String,
      required: true,
    },
    
    deliveryAddress: {
      type: String,
      required: true,
    },
    vehicle_number: {
      type: String,
      required: true,
    },
    driver_number: {
      type: String,
      required: true,
    },
    driver_name: {
      type: String,
      required: true,
    },

    distance: {
      type: String,
      required: true,
    },
    total_amount: {
      type: String,
      required: true,
    },
    delivery_status: statusSchema,
    isPaymentDone: paymentStatusSchema,
    weighBillReceived:weighBillReceivedSchema,
    billSubmission:billSubmissionSchema,
    paymentReceived:weighBillReceivedSchema,
    

    
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SandBooking", sandBookingSchema);