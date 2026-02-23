const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fetchUser = require('../middleware/auth');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, mobile, address } = req.body;
    // ... (validation + logic same as before)

    if (!username || !email || !password || !mobile || !address) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, error: "Password must be at least 8 characters" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    let cart = {}, wishlist = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
      wishlist[i] = false;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: username,
      email,
      password: hashedPassword,
      mobile,
      address,
      cartData: cart,
      wishlistData: wishlist,
    });

    await user.save();

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Login
router.post('/login', async (req, res) => {
  // ... (same as before)
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, error: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, error: "Invalid password" });

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Get user profile (without password)
router.get('/getuser', fetchUser, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).select('-password -cartData -wishlistData');
    if (!userData) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, data: userData });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;