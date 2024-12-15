// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const featuredTripsRouter =require('./routes/featureTrips')
const featuredServiceRouter =require('./routes/featureService')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000; 

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.initURL, // Allow only requests from localhost:3000
  }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));





const Trip = require('./models/Trip');
const Booking = require('./models/Booking');
const Gallery = require('./models/Gallery');


// Helper functions
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Authentication middleware
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization'); 

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Exclude password from response
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ username, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = generateToken(user._id);
        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/trips/:id', async (req, res) => {
    const tripId = req.params.id;

    // Check if the provided id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
        return res.status(400).json({ message: 'Invalid trip ID format. Must be a valid ObjectId' });
    }

    console.log('GET request for trip with ID:', tripId);

    try {
        // Find the trip by its valid ID
        const trip = await Trip.findById(tripId).exec();

        // Check if the trip exists
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        console.log('Successfully retrieved trip:', trip);
        res.json(trip); // Send back the found trip
    } catch (err) {
        console.error('Error fetching trip:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // More detailed error
    }
});



app.post('/trips', async (req, res) => {
    console.log('tripcreated ',req.body)
    try {
        const newTrip = new Trip({ ...req.body });
        const savedTrip = await newTrip.save();
        res.json(savedTrip);
    } catch (err) {
        console.error(err);
        res.status(400).send('Bad Request');
    }
});

// POST route to handle a trip booking
app.post('/api/booking', async (req, res) => {
    const { name, email, numberOfPeople, tripId } = req.body;
  
    // Validate the input
    if (!name || !email || !numberOfPeople || !tripId) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      // Create a new booking document
      const booking = new Booking({
        name,
        email,
        numberOfPeople,
        tripId, // Reference to the trip's ObjectId
      });
  
      // Save the booking in the database
      await booking.save();
  
      res.status(201).json({
        message: "Booking confirmed",
        booking
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create booking' });
    }
  });



  app.get('/api/gallery/type', async (req, res) => {
    const { type } = req.query;  // Optional filter for media type (video or photo)
  
    // Validate the filter type
    if (type && !['video', 'photo'].includes(type)) {
      return res.status(400).json({ message: 'Invalid media type.' });
    }
  
    try {
      // Fetch trips data from MongoDB
      const filter = type ? { type } : {}; // Filter if type is provided
      const trips = await Gallery.find(filter);  // Fetch trips based on filter
  
      res.json(trips);  // Return the list of trips
    } catch (error) {
      res.status(500).json({ message: 'Error fetching trips data.' });
    }
  });


  app.post('/api/gallery/type',  async (req, res) => {
    const { title, mediaUrl, thumbnail, type, platform } = req.body;
  
    // Input validation
    if (!title || !mediaUrl || !thumbnail || !type) {
      return res.status(400).json({ message: 'All fields (title, mediaUrl, thumbnail, type) are required.' });
    }
  
    if (!['video', 'photo'].includes(type)) {
      return res.status(400).json({ message: 'Type must be either "video" or "photo".' });
    }
  
    try {
      // Create a new trip instance
      const newTrip = new Gallery({
        title,
        mediaUrl,
        thumbnail,
        type,
        platform: platform || null, // Platform is optional
      });
  
      // Save the new trip to the database
      const savedTrip = await newTrip.save();
  
      res.status(201).json(savedTrip);  // Respond with the created trip
    } catch (error) {
      res.status(500).json({ message: 'Error saving trip data.' });
    }
  });

  app.use('/api', featuredTripsRouter,featuredServiceRouter)

// Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});