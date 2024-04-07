// models/league.js
import mongoose from 'mongoose';

const leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Add more fields as needed
});

export default mongoose.model('League', leagueSchema);
