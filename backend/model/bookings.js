const mongoose = require("mongoose");

// defining the schema for the booking model
const bookingsModel = new mongoose.Schema({
  movie: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  seats: {
    type: Array,
    required: true,
  },
});

// exporting the bookings module
module.exports = mongoose.model("bookings", bookingsModel);
