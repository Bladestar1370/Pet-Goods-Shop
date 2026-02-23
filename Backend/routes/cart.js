const express = require('express');
const User = require('../models/User');
const fetchUser = require('../middleware/auth');

const router = express.Router();

// Add to cart
router.post('/addtocart', fetchUser, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    if (!userData.cartData) {
      userData.cartData = {};
      for (let i = 0; i < 300; i++) userData.cartData[i] = 0;
    }
    userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
    await userData.save();
    res.json({ success: true, message: 'Added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Remove from cart
router.post('/removefromcart', fetchUser, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    if (!userData.cartData) {
      userData.cartData = {};
      for (let i = 0; i < 300; i++) userData.cartData[i] = 0;
    }
    if (userData.cartData[req.body.itemId] > 0) {
      userData.cartData[req.body.itemId] -= 1;
    }
    await userData.save();
    res.json({ success: true, message: 'Removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Clear cart
router.post('/clear-cart', fetchUser, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    userData.cartData = {};
    for (let i = 0; i < 300; i++) userData.cartData[i] = 0;
    await userData.save();
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get cart data
router.post('/getcart', fetchUser, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    res.json({ success: true, data: userData.cartData || {} });
  } catch (error) {
    console.error('Error getting cart:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;