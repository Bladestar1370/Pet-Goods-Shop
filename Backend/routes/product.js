const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Add product (admin endpoint – consider adding auth later)
router.post('/addproduct', async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      productType: req.body.productType,
      new_price: Number(req.body.new_price),
      old_price: Number(req.body.old_price),
      description: req.body.description || '',
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Remove product (admin endpoint)
router.post('/removeproduct', async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error('Error removing product:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get all products
router.get('/allproducts', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching all products:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Popular products (last 6 except the very first one – consider better logic later)
router.get('/popular', async (req, res) => {
  try {
    const products = await Product.find({});
    const popular = products.slice(1).slice(-6); // Adjust this logic if needed
    res.json({ success: true, data: popular });
  } catch (error) {
    console.error('Error fetching popular products:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Related products
router.post('/relatedproducts', async (req, res) => {
  try {
    const { category, productType } = req.body;
    const products = await Product.find({});
    const related = products.filter(
      (item) => item.category === category || item.productType === productType
    );
    const limitedRelated = related.slice(0, 6);
    res.json({ success: true, data: limitedRelated });
  } catch (error) {
    console.error('Error fetching related products:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;