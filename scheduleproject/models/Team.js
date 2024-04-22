const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    id: Number,
    league: String,
})

module.exports = mongoose.model('Team', teamSchema);