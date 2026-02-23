const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    productId: Number,
    name: String,
    price: Number,
    quantity: Number,
  }],
  shipping: {
    name: String,
    phone: String,
    address: String,
    country: String,
    city: String,
  },
  total: { type: Number, required: true },
  stripeSessionId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);