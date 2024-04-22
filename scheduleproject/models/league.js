const mongoose = require('mongoose');

const LeagueSchema = mongoose.Schema({
    name: String,
    id: Number,
})

module.exports = mongoose.model('League', LeagueSchema);
