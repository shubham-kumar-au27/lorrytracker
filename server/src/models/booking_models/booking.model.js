import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  status: {
    type: String,
    default: 'Pending',
  },
  date: {
    type: Date,
    default: null,
  },
});

const paymentStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No',
  },
  date: {
    type: Date,
    default: null,
  },
});

const sandBookingSchema = mongoose.Schema({
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
  distance: {
    type: String,
    required: true,
  },
  total_amount: {
    type: String,
    required: true,
  },
  delivery_status: statusSchema,
  unloading_status: statusSchema,
  isDelivered: statusSchema,
  isPaymentReceived: paymentStatusSchema,
}, {
  timestamps: true,
});

export default mongoose.model("SandBooking", sandBookingSchema);
