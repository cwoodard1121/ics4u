
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    time: String,
    title: String,
    home: String,
    away: String
});

export default mongoose.model('Event', eventSchema);
