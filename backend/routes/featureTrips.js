const express = require('express');
const FeaturedTrip = require('../models/FeatureTrip');
const Joi = require('joi');  // Import Joi for input validation
const router = express.Router();

// Validation Schema for Featured Trip
const tripValidationSchema = Joi.object({
  title: Joi.string().min(3).required(),  // Title should be a string and at least 3 characters long
  description: Joi.string().min(10).required(),  // Description should be a string and at least 10 characters long
  imageUrl: Joi.string().required(),  // Image URL should be a valid URI
  price: Joi.number().positive().required(),  // Price should be a positive number
  bookingLink: Joi.string().required(),  // Booking link should be a valid URI
});

// GET all Featured Trips
router.get('/featured-trips', async (req, res) => {
  try {
    console.log('Fetching all featured trips...');
    const trips = await FeaturedTrip.find();  // Fetch all trips from the database
    console.log(`Found ${trips.length} trips`);
    res.json(trips);  // Respond with all trips
  } catch (err) {
    console.error('Error fetching trips:', err);  // Log detailed error for debugging
    res.status(500).json({ message: 'Failed to fetch trips. Please try again later.' });
  }
});

// POST to add a new Featured Trip
router.post('/featured-trips', async (req, res) => {
  // Validate the request body using Joi
  const { error } = tripValidationSchema.validate(req.body);
  if (error) {
    console.error('Validation error:', error.details);  // Log the validation error
    return res.status(400).json({ message: error });
  }

  const { title, description, imageUrl, price, bookingLink } = req.body;

  const trip = new FeaturedTrip({
    title,
    description,
    imageUrl,
    price,
    bookingLink,
  });

  try {
    const savedTrip = await trip.save();  // Save the new trip to the database
    console.log('Successfully added new trip:', savedTrip._id);  // Log the trip's ID
    res.status(201).json(savedTrip);  // Respond with the saved trip data
  } catch (err) {
    console.error('Error saving new trip:', err);  // Log the error details
    res.status(400).json({ message: 'Failed to add the trip. Please try again later.' });
  }
});

module.exports = router;
