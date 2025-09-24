# PET-GOODS-SHOP

Transforming Pet Care, One Click at a Time

![last commit](https://img.shields.io/github/last-commit/Bladestar1370/Pet-Goods-Shop?style=flat-square)
![javascript](https://img.shields.io/badge/javascript-63.3%25-yellow?style=flat-square)
![languages](https://img.shields.io/github/languages/count/Bladestar1370/Pet-Goods-Shop?style=flat-square)

## Built with the tools and technologies:

![Express](https://img.shields.io/badge/Express-000?logo=express&logoColor=white&style=flat-square)
![JSON](https://img.shields.io/badge/JSON-000?logo=json&logoColor=white&style=flat-square)
![Markdown](https://img.shields.io/badge/Markdown-000?logo=markdown&logoColor=white&style=flat-square)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white&style=flat-square)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white&style=flat-square)
![.ENV](https://img.shields.io/badge/.ENV-yellow?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat-square)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white&style=flat-square)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white&style=flat-square)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Admin Panel](#admin-panel)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)

---

## Overview

**Pet-Goods-Shop** is a full-stack e-commerce web application for pet products.  
It enables customers to browse and buy pet goods, and admins to manage inventory and orders.

- **Frontend**: User interface built with React + Vite.
- **Backend**: RESTful API with Node.js, Express, MongoDB, and Stripe integration.
- **Admin Panel**: React dashboard for product and order management.

---

## Features

### User-Facing (Frontend)
- 🛒 Browse products by category/type (Food, Toy, Medicine, Accessory, Grooming)
- 🔍 Search functionality
- 💖 Wishlist and cart management
- 👤 User authentication (Signup/Login/Profile)
- 💳 Secure checkout (Stripe payments)
- 📦 Order management
- 🐾 View related products

### Admin Panel
- ➕ Add/edit/remove products
- 🗂 Manage categories and product types
- 📊 View and monitor orders

### Backend
- ⚡ REST API for all entities
- 🔑 JWT authentication and bcrypt password hashing
- 🖼️ Image uploads (multer)
- 💳 Stripe payment integration

---

## Project Structure

```
Pet-Goods-Shop/
│
├── Backend/        # Node.js/Express API server
├── Frontend/       # React + Vite user interface
├── Admin/          # React + Vite admin dashboard
└── README.md       # Project documentation (this file)
```

---

## Setup & Installation

### Backend

1. **Install dependencies**:
   ```bash
   cd Backend
   npm install
   ```

2. **Environment variables**:
   - Create a `.env` file with your MongoDB URI and Stripe secret:
     ```
     MONGO_URI=your_mongodb_connection_string
     STRIPE_SECRET_KEY=your_stripe_secret_key
     ```

3. **Run backend server**:
   ```bash
   node index.js
   ```
   - The API runs on port `4000` by default.

### Frontend

1. **Install dependencies**:
   ```bash
   cd Frontend
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   - The app runs on port `5173` (default Vite port).

### Admin Panel

1. **Install dependencies**:
   ```bash
   cd Admin
   npm install
   ```

2. **Start admin dashboard**:
   ```bash
   npm run dev
   ```
   - Runs on another Vite port (e.g., `5174`).

---

## Usage

- **Frontend**: Visit the app in your browser, browse products, add to cart/wishlist, sign up/log in, and place orders.
- **Admin Panel**: Log in as admin to add/edit/delete products, view orders, and manage categories/types.

---

## API Endpoints (Backend)

- `GET /` — Health check
- `POST /upload` — Upload product images
- `POST /addproduct` — Add new product
- `POST /removeproduct` — Remove product
- `GET /allproducts` — List all products
- `POST /signup` — User registration
- `POST /login` — User login
- `GET /getuser` — Get user profile (auth required)
- `GET /getorders` — Get user orders (auth required)
- `POST /orders` — Place an order (Stripe integration)
- More endpoints for categories, wishlist, cart, related products, etc.

---

## Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: CORS support
- **dotenv**: .env config
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT auth
- **multer**: File uploads
- **stripe**: Payment processing

### Frontend & Admin
- **react**: UI library
- **vite**: Build tool
- **react-router-dom**: Routing
- **@fortawesome/fontawesome-free**: Icons
- **eslint**: Linting
- Other libraries for UI and styling

---

## Example (Signup API Usage)

```javascript
await fetch('http://localhost:4000/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, email, password, mobile, address }),
});
```

---
