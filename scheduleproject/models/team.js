
import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: String,
    league: String
});

export default mongoose.model('Team', teamSchema);
