require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// CORS – update origins as needed
app.use(cors({
  origin: [
    'https://pet-goods-shop.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'auth-token', 'Authorization'],
}));

// Serve uploaded images
app.use('/Images', express.static(path.join(__dirname, 'upload/Images')));

// MongoDB connection
require('./config/db');

// Routes
app.use('/', require('./routes/upload'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/product'));
app.use('/', require('./routes/cart'));
app.use('/', require('./routes/wishlist'));
app.use('/', require('./routes/order'));

// Root check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Pet Goods Shop Backend Running" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});