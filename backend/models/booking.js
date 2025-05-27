// backend/models/booking.js 
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  services: [{
    name: String,
    price: String,
    duration: String
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model("booking", bookingSchema);
module.exports = Booking;