// server.js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import Event from './models/event.js'
import Team from './models/team.js';

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
  res.status(404).send('not found');
});


app.get('/api/team/', async(req, res) => {
  try {
    // anything with the team name gets found 
    const team = new Team(req.body);
    const events = await Event.find(team.name);
    res.json(events);
  } catch (err){
    console.error('Error fetching events: ',err);
    res.status(500).json({error: 'Internal server error'});
  }
});

// Event routes
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    console.log(req.body)
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Add routes for updating and deleting leagues

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
