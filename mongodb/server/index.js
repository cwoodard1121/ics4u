const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/Product');

require('./db'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/products',async(req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

app.get('/api/products/:id',async(req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        res.json(products);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

app.get('/api/products',async(req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(products);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});



app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);  
});