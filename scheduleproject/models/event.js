
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    type: String,
    date: String,
    time: String,
    home: String,
    away: String,
    location: String
});

export default mongoose.model('Event', eventSchema);
