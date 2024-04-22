const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    time: String,
    location: String,
    date: String,
    teams: String,
    notes: String,
    id: String,
    whatTeam: String,
})



module.exports = mongoose.model('Event', eventSchema);
