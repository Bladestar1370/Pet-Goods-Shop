const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: './upload/Images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('product'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://pet-goods-shop.onrender.com'
      : `http://localhost:${process.env.PORT || 4000}`;

    const image_url = `${baseUrl}/Images/${req.file.filename}`;

    res.json({
      success: 1,
      image_url: image_url
    });
  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ success: false, error: "Server error during upload" });
  }
});

module.exports = router;