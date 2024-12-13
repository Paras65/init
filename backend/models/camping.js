// models/Camping.js
const mongoose = require('mongoose');

const campingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  availableSlots: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Camping = mongoose.model('Camping', campingSchema);

module.exports = Camping;
