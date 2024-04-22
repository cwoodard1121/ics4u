const mongoose = require('mongoose');

const LeagueSchema = mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('League', LeagueSchema);
