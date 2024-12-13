// routes/trekkingRoutes.js
const express = require('express');
const Trekking = require('../models/Trekking');
const router = express.Router();

// Get all trekking trips
router.get('/', async (req, res) => {
  try {
    const trekks = await Trekking.find();
    res.json(trekks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new trekking trip
router.post('/', async (req, res) => {
  const { name, location, duration, difficulty, price, availableSlots, date } = req.body;
  
  const newTrekking = new Trekking({
    name,
    location,
    duration,
    difficulty,
    price,
    availableSlots,
    date
  });

  try {
    const savedTrekking = await newTrekking.save();
    res.status(201).json(savedTrekking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a participant to a trekking trip
router.post('/:id/participants', async (req, res) => {
  const { name } = req.body;
  try {
    const trekking = await Trekking.findById(req.params.id);
    if (!trekking) {
      return res.status(404).json({ message: "Trekking not found" });
    }
    
    // Check if there's space available
    if (trekking.availableSlots <= 0) {
      return res.status(400).json({ message: "No available slots for this trekking" });
    }

    trekking.participants.push(name);
    trekking.availableSlots -= 1;  // Decrease available slots
    const updatedTrekking = await trekking.save();
    
    res.status(200).json(updatedTrekking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trekking by ID (details of a specific trekking trip)
router.get('/:id', async (req, res) => {
  try {
    const trekking = await Trekking.findById(req.params.id);
    if (!trekking) {
      return res.status(404).json({ message: "Trekking not found" });
    }
    res.json(trekking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
