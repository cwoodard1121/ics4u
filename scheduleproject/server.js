// server.js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import Event from './models/event.js'
import League from './models/league.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://cameronwoodard1121:lAFpKvlMbvbMtt1A@ics4u.2naegbn.mongodb.net/?retryWrites=true&w=majority&appName=ics4u', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit();
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to School Sports Scheduler API');
});

// Event routes
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.findOne();
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    console.log(req.body);
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add routes for updating and deleting events

// League routes
app.get('/api/leagues', async (req, res) => {
  try {
    const leagues = await League.find();
    res.json(leagues);
  } catch (err) {
    console.error('Error fetching leagues:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/leagues', async (req, res) => {
  try {
    const league = new League(req.body);
    await league.save();
    res.status(201).json(league);
  } catch (err) {
    console.error('Error creating league:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add routes for updating and deleting leagues

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
