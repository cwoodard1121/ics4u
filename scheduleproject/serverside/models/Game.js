const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({

    age: {
        type: String
        required: true
    }

    sport: {
        type: String
        required: true
    }

    team1: {
        type: String,
        required: true
    }

    type: {
        type String,
        required: true
    }

    team2: {
        type: String,
        required: false
    }

    where: {
        type: String,
        required: true
    }

    leaves: {
        type: String,
        required: true
    }

    returns: {
        type: String,
        required: false
    }

    dismiss: {
        type: String,
        required: false
    }

});

const Game = mongoose.model('Game',gameSchema);

module.exports = Product;