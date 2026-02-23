const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const fetchUser = require('../middleware/auth');

const router = express.Router();

// Create Stripe checkout session
router.post('/create-checkout-session', fetchUser, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.lineItems,
      mode: 'payment',
      success_url: process.env.NODE_ENV === 'production'
        ? 'https://pet-goods-shop-72tm60u5m-sumit-dhuris-projects-32c3542e.vercel.app/confirmation'
        : 'http://localhost:5173/confirmation',
      cancel_url: process.env.NODE_ENV === 'production'
        ? 'https://pet-goods-shop-72tm60u5m-sumit-dhuris-projects-32c3542e.vercel.app/checkout'
        : 'http://localhost:5173/checkout',
      metadata: {
        userId: req.user.id,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Save order after successful payment
router.post('/orders', fetchUser, async (req, res) => {
  try {
    const order = new Order({
      userId: req.user.id,
      items: req.body.items,
      shipping: req.body.shipping,
      total: req.body.total,
      stripeSessionId: req.body.stripeSessionId,
    });

    await order.save();
    res.json({ success: true, message: 'Order saved' });
  } catch (error) {
    console.error('Error saving order:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get user's orders
router.get('/getorders', fetchUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;