require('dotenv').config();
const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

// Database connection with mongoose
mongoose.connect(process.env.MONGO_URI);

// API Creation
app.get("/", (req, res) => {
    res.json({ success: true, message: "Express App is Running" });
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/Images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for Images 
app.use('/Images', express.static('upload/Images'));
app.post('/upload', upload.single('product'), (req, res) => {
    try {
        res.json({
            success: 1,
            image_url: `http://localhost:${port}/Images/${req.file.filename}`
        });
    } catch (error) {
        console.error('Error in upload:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Schema For Creating Products
const Product = mongoose.model('Product', {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    productType: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    description: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

// Schema for User Model
const Users = mongoose.model('Users', {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    mobile: { type: String },
    address: { type: String },
    cartData: { type: Object },
    wishlistData: { type: Object },
    date: { type: Date, default: Date.now },
});

// Schema for Orders
const Order = mongoose.model('Order', {
    userId: { type: String, required: true },
    items: [
        {
            productId: Number,
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
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

// Middleware to Fetch User
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ success: false, error: "Please authenticate using valid token" });
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).json({ success: false, error: "Please authenticate using valid token" });
        }
    }
};

// Endpoint for Registering User
app.post('/signup', async (req, res) => {
    try {
        console.log('Signup request:', req.body);
        const { username, email, password, mobile, address } = req.body;
        if (!username || !email || !password || !mobile || !address) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, error: "Password must be at least 8 characters" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, error: "Invalid email format" });
        }

        let check = await Users.findOne({ email });
        if (check) {
            return res.status(400).json({ success: false, error: "Existing user found with same email address" });
        }
        let cart = {};
        let wishlist = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
            wishlist[i] = false;
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new Users({
            name: username,
            email,
            password: hashedPassword,
            mobile,
            address,
            cartData: cart,
            wishlistData: wishlist,
        });

        await user.save();

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint for User Login
app.post('/login', async (req, res) => {
    try {
        console.log('Login request:', req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Email and password are required" });
        }

        let user = await Users.findOne({ email });
        if (user) {
            const passCompare = await bcrypt.compare(password, user.password);
            if (passCompare) {
                const data = { user: { id: user.id } };
                const token = jwt.sign(data, process.env.JWT_SECRET);
                res.json({ success: true, token });
            } else {
                res.json({ success: false, error: "Wrong Password" });
            }
        } else {
            res.json({ success: false, error: "Wrong Email Id" });
        }
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint to Get User Data
app.get('/getuser', fetchUser, async (req, res) => {
    try {
        console.log('Get user data for user:', req.user.id);
        let userData = await Users.findOne({ _id: req.user.id }).select('-password -cartData -wishlistData');
        if (userData) {
            res.json({ success: true, data: userData });
        } else {
            res.status(404).json({ success: false, error: "User not found" });
        }
    } catch (error) {
        console.error('Error in getuser:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint to Get User Orders
app.get('/getorders', fetchUser, async (req, res) => {
    try {
        console.log('Get orders for user:', req.user.id);
        let orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error('Error in getorders:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint for Adding Product
app.post('/addproduct', async (req, res) => {
    try {
        console.log('Received product data:', req.body);
        let products = await Product.find({});
        let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            productType: req.body.productType,
            new_price: Number(req.body.new_price),
            old_price: Number(req.body.old_price),
            description: req.body.description || ''
        });
        await product.save();
        console.log('Product saved:', product);
        res.json({ success: true, data: { name: req.body.name } });
    } catch (error) {
        console.error('Error in addproduct:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint for Deleting Products
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log('Product removed:', req.body.name);
        res.json({ success: true, data: { name: req.body.name } });
    } catch (error) {
        console.error('Error in removeproduct:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint for Getting All Products
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log('All Products Fetched:', products.length);
        res.json({ success: true, data: products });
    } catch (error) {
        console.error('Error in allproducts:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint for Popular Products
app.get('/popular', async (req, res) => {
    try {
        let products = await Product.find({});
        let popular = products.slice(1).slice(-6);
        console.log('Popular fetched:', popular.length);
        res.json({ success: true, data: popular });
    } catch (error) {
        console.error('Error in popular:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint for Related Products
app.post('/relatedproducts', async (req, res) => {
    try {
        console.log('Related products request:', req.body);
        let products = await Product.find({});
        let related = products.filter((item) => item.category === req.body.category || item.productType === req.body.productType);
        let limitedRelated = related.slice(0, 6);
        console.log('Related fetched:', related.length);
        res.json({ success: true, data: related });
    } catch (error) {
        console.error('Error in relatedproducts:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint for Adding Products to Cart
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        console.log('Add to cart:', req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        if (!userData.cartData) {
            userData.cartData = {};
            for (let i = 0; i < 300; i++) {
                userData.cartData[i] = 0;
            }
        }
        userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error('Error in addtocart:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint to Remove Product from Cart
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        console.log('Remove from cart:', req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        if (!userData.cartData) {
            userData.cartData = {};
            for (let i = 0; i < 300; i++) {
                userData.cartData[i] = 0;
            }
        }
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
        }
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error('Error in removefromcart:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint to Clear Cart
app.post('/clear-cart', fetchUser, async (req, res) => {
    try {
        console.log('Clear cart for user:', req.user.id);
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData = {};
        for (let i = 0; i < 300; i++) {
            userData.cartData[i] = 0;
        }
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.json({ success: true, message: "Cart cleared" });
    } catch (error) {
        console.error('Error in clear-cart:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint to Get Cart Data
app.post('/getcart', fetchUser, async (req, res) => {
    try {
        console.log('Get cart for user:', req.user.id);
        let userData = await Users.findOne({ _id: req.user.id });
        res.json({ success: true, data: userData.cartData || {} });
    } catch (error) {
        console.error('Error in getcart:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint for Adding Products to Wishlist
app.post('/addtowishlist', fetchUser, async (req, res) => {
    try {
        console.log('Add to wishlist:', req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        if (!userData.wishlistData) {
            userData.wishlistData = {};
            for (let i = 0; i < 300; i++) {
                userData.wishlistData[i] = false;
            }
        }
        userData.wishlistData[req.body.itemId] = true;
        await Users.findOneAndUpdate({ _id: req.user.id }, { wishlistData: userData.wishlistData });
        res.json({ success: true, message: "Added to wishlist" });
    } catch (error) {
        console.error('Error in addtowishlist:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint to Remove Product from Wishlist
app.post('/removefromwishlist', fetchUser, async (req, res) => {
    try {
        console.log('Remove from wishlist:', req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        if (!userData.wishlistData) {
            userData.wishlistData = {};
            for (let i = 0; i < 300; i++) {
                userData.wishlistData[i] = false;
            }
        }
        userData.wishlistData[req.body.itemId] = false;
        await Users.findOneAndUpdate({ _id: req.user.id }, { wishlistData: userData.wishlistData });
        res.json({ success: true, message: "Removed from wishlist" });
    } catch (error) {
        console.error('Error in removefromwishlist:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint to Get Wishlist Data
app.post('/getwishlist', fetchUser, async (req, res) => {
    try {
        console.log('Get wishlist for user:', req.user.id);
        let userData = await Users.findOne({ _id: req.user.id });
        res.json({ success: true, data: userData.wishlistData || {} });
    } catch (error) {
        console.error('Error in getwishlist:', error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Endpoint to Create Stripe Checkout Session
app.post('/create-checkout-session', fetchUser, async (req, res) => {
    try {
        console.log('Create checkout session:', req.body);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/confirmation',
            cancel_url: 'http://localhost:5173/checkout',
            metadata: {
                userId: req.user.id,
            },
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error in create-checkout-session:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to Save Order
app.post('/orders', fetchUser, async (req, res) => {
    try {
        console.log('Save order:', req.body);
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
        console.error('Error in orders:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

app.listen(port, (error) => {
    if (!error) {
        console.log('Server is running on port: ' + port);
    } else {
        console.error('Error: ' + error);
    }
});