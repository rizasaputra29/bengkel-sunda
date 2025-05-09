// backend/routes/bookings.js
const router = require("express").Router();
const Booking = require("../models/booking");
const auth = require("../middleware/auth");

// Create booking
router.post("/", auth, async (req, res) => {
  try {
    console.log("Received booking data:", req.body);
    console.log("User from token:", req.user);

    const booking = new Booking({
      user: req.user._id,
      ...req.body
    });
    
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).send({ 
      message: "Error creating booking",
      error: error.message 
    });
  }
});

// Get user bookings
router.get("/user", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ message: "Error fetching bookings" });
  }
});

module.exports = router;