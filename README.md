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

### **[Overview](#overview)**
### **[Getting Started](#getting-started)**
- [Prerequisites](#prerequisites)
- [Installation](#installation)

### **[Features](#features)**
### **[Project Structure](#project-structure)**
### **[Usage](#usage)**
### **[API Endpoints](#api-endpoints)**
### **[Dependencies](#dependencies)**
### **[Contributing](#contributing)**
### **[License](#license)**
### **[Contact](#contact)**

---

## Overview

...


**Pet-Goods-Shop** is a full-stack e-commerce web application for pet products, featuring:
- **Frontend**: User-facing shopping experience built with React + Vite.
- **Backend**: RESTful API built with Node.js, Express, MongoDB, Stripe payment integration.
- **Admin Panel**: React-based dashboard for managing products.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Admin Panel](#admin-panel)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### User-Facing (Frontend)
- Browse pet products by category and type (Food, Toy, Medicine, Accessory, Grooming).
- Product details view with descriptions and related products.
- Search, cart, wishlist, and profile management.
- Authentication (signup/login).
- Checkout and order management (Stripe integration).

### Admin Panel
- Add/edit/remove products.
- Manage product categories and types.
- Monitor orders and user activity.

### Backend
- REST API for products, users, orders.
- User authentication with JWT and bcrypt.
- Image uploads for products (multer).
- Stripe integration for payments.

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

- **User Interface**:
  - Visit the Frontend app in your browser, browse products, add to cart/wishlist, sign up/log in, and place orders.
- **Admin Panel**:
  - Log in as admin to add/edit/delete products, view orders, and manage categories/types.

---

## API Endpoints (Backend)

- `GET /` — Health check
- `POST /upload` — Upload product images
- `POST /addproduct` — Add new product
- `POST /removeproduct` — Remove product
- `GET /allproducts` — List all products
- `POST /signup` — User registration
- `POST /login` — User login
- `GET /getuser` — Get user profile (requires auth token)
- `GET /getorders` — Get user orders (requires auth token)
- `POST /orders` — Place an order (Stripe integration)
- More endpoints for categories, wishlist, cart, related products, etc.

---

## Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT authentication
- **multer**: File uploads
- **stripe**: Payment processing

### Frontend & Admin
- **react**: UI library
- **vite**: Build tool
- **react-router-dom**: Routing
- **@fortawesome/fontawesome-free**: Icons
- **eslint**: Linting (see `eslint.config.js`)
- **Other dependencies** as needed for styling and UI components

---

## Example (User Signup)

Example usage from Frontend:
```javascript
await fetch('http://localhost:4000/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, email, password, mobile, address }),
});
```

---
