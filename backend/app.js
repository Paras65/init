// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000; 

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow only requests from localhost:3000
  }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Define Mongoose Schemas
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});



const Trip = require('./models/Trip');
const Booking = require('./models/Booking');

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

app.get('/trips', async (req, res) => {
    try {
        console.log('get request')
        const trips = await Trip.find( { "title": "Mountain Adventure Trip"}).exec(); 
        console.log('sucessfully got',trips)
        res.json(trips);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
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

// Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});