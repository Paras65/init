const express = require('express');
const TrekkingService = require('../models/FeatureService');
const router = express.Router();

// GET all Trekking Services
router.get('/featured-service', async (req, res) => {
  try {
    const services = await TrekkingService.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/featured-service', async (req, res) => {
    const { title, description, detailLink } = req.body;
  
    const service = new TrekkingService({
      title,
      description,
      detailLink,
    });
  
    try {
      const savedService = await service.save();
      res.status(201).json(savedService); // Send back the saved service data
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;
