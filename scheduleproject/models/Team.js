
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    league: String,
    id: Number
});

module.exports = mongoose.model('Team', teamSchema);
