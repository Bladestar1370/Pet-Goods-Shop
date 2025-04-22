import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../CartContext/ShopContext';
import './Checkout.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51REAhMPShTW9fI5NMa5QLKIwVNsVf79qBGk6zCPGWrg1KHT0nPO7gdKn6X2k2KG1GnWYivOIjjY12quofobRyw8s00ecNZzixH'); // Your Stripe publishable key

const Checkout = () => {
  const { all_products, cartItems, getTotalCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    country: '',
    city: '',
  });

  // Authentication check
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission with Stripe Checkout
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare line items for Stripe Checkout
      const lineItems = all_products
        .filter(product => cartItems[product.id] > 0)
        .map(product => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
            },
            unit_amount: Math.round(product.new_price * 100), // Convert to cents
          },
          quantity: cartItems[product.id],
        }));

      // Create Checkout Session
      const response = await fetch('http://localhost:4000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
        body: JSON.stringify({
          lineItems,
          shipping: formData,
          total: getTotalCartAmount(),
        }),
      });

      const session = await response.json();
      if (!response.ok) {
        throw new Error(session.error || 'Failed to create checkout session');
      }

      // Save order
      const orderData = {
        items: all_products
          .filter(product => cartItems[product.id] > 0)
          .map(product => ({
            productId: product.id,
            name: product.name,
            price: product.new_price,
            quantity: cartItems[product.id],
          })),
        shipping: formData,
        total: getTotalCartAmount(),
        stripeSessionId: session.id,
      };

      const orderResponse = await fetch('http://localhost:4000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        throw new Error('Order save failed');
      }

      // Clear cart
      await fetch('http://localhost:4000/clear-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error('Stripe redirect error:', result.error.message);
        alert('Payment failed: ' + result.error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error.message);
      alert('Checkout failed: ' + error.message);
    }
  };

  // Calculate total quantity
  const totalQuantity = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="container">
      <div className="checkoutLayout">
        <div className="returnCart">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>Keep Shopping</Link>
          <h1>List Product in Cart</h1>
          <div className="list">
            {all_products.map((product) => {
              if (cartItems[product.id] > 0) {
                return (
                  <div key={product.id} className="cart-card">
                    <img src={product.image} alt={product.name} className="cart-card-image" />
                    <div className="cart-card-info">
                      <div className="name">{product.name}</div>
                      <div className="price">₹{product.new_price}/1 product</div>
                    </div>
                    <div className="quantity">{cartItems[product.id]}</div>
                    <div className="returnPrice">
                      ${(product.new_price * cartItems[product.id]).toFixed(2)}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        <div className="right">
          <h1>Checkout</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Choose...</option>
                <option value="USA">USA</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="India">India</option>
              </select>
            </div>
            <div className="group">
              <label htmlFor="city">City</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option value="">Choose...</option>
                {formData.country === 'USA' && (
                  <>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                  </>
                )}
                {formData.country === 'UK' && (
                  <>
                    <option value="London">London</option>
                    <option value="Manchester">Manchester</option>
                  </>
                )}
                {formData.country === 'Canada' && (
                  <>
                    <option value="Toronto">Toronto</option>
                    <option value="Vancouver">Vancouver</option>
                  </>
                )}
                {formData.country === 'India' && (
                  <>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Pune">Pune</option>
                  </>
                )}
              </select>
            </div>
            <div className="return">
              <div className="row">
                <div>Total Quantity</div>
                <div className="totalQuantity">{totalQuantity}</div>
              </div>
              <div className="row">
                <div>Total Price</div>
                <div className="totalPrice">₹{getTotalCartAmount().toFixed(2)}</div>
              </div>
            </div>
            <button type="submit" className="buttonCheckout">
              CHECKOUT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;