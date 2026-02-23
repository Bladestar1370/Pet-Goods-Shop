const express = require('express');
const User = require('../models/User');
const fetchUser = require('../middleware/auth');

const router = express.Router();

// Add to wishlist
router.post('/addtowishlist', fetchUser, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    if (!userData.wishlistData) {
      userData.wishlistData = {};
      for (let i = 0; i < 300; i++) userData.wishlistData[i] = false;
    }
    userData.wishlistData[req.body.itemId] = true;
    await userData.save();
    res.json({ success: true, message: 'Added to wishlist' });
  } catch (error) {
    console.error('Error adding to wishlist:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Remove from wishlist
router.post('/removefromwishlist', fetchUser, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    if (!userData.wishlistData) {
      userData.wishlistData = {};
      for (let i = 0; i < 300; i++) userData.wishlistData[i] = false;
    }
    userData.wishlistData[req.body.itemId] = false;
    await userData.save();
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    console.error('Error removing from wishlist:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get wishlist data
router.post('/getwishlist', fetchUser, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id);
    res.json({ success: true, data: userData.wishlistData || {} });
  } catch (error) {
    console.error('Error getting wishlist:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;