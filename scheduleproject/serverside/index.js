const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Game = require('./models/Game'); // Assuming you have a Game model defined

require('./db'); // Assuming this file sets up the database connection

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Get all games
app.get("/api/games", async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific game by ID
app.get("/api/games/:id", async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new game
app.post("/api/games", async (req, res) => {
    try {
        const game = new Game(req.body);
        await game.save();
        res.status(201).json(game);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a game
app.put("/api/games/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findByIdAndUpdate(id, req.body, { new: true });
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.json(game);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a game
app.delete("/api/games/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const game = await Game.findByIdAndDelete(id);
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.json({ message: "Game deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});