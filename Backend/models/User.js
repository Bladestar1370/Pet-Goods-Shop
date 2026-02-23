const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  mobile: { type: String },
  address: { type: String },
  cartData: { type: Object, default: {} },
  wishlistData: { type: Object, default: {} },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', userSchema);