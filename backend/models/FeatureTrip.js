const mongoose = require('mongoose');

const featuredTripSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  price: Number,
  bookingLink: String,
});

module.exports = mongoose.model('FeaturedTrip', featuredTripSchema);
