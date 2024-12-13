// routes/campingRoutes.js
const express = require('express');
const Camping = require('../models/camping');
const router = express.Router();

// Get all camping trips
router.get('/', async (req, res) => {
  try {
    const campings = await Camping.find();
    res.json(campings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new camping trip
router.post('/', async (req, res) => {
  const { name, location, duration, price, availableSlots, date } = req.body;
  
  const newCamping = new Camping({
    name,
    location,
    duration,
    price,
    availableSlots,
    date
  });

  try {
    const savedCamping = await newCamping.save();
    res.status(201).json(savedCamping);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
