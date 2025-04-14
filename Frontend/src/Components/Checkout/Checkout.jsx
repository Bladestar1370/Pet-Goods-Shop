import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../CartContext/ShopContext';
import './Checkout.css';

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
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout data:', { cartItems, formData, total: getTotalCartAmount() });
    // TODO: Proceed to payment (e.g., Stripe)
  };

  // Calculate total quantity
  const totalQuantity = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="container">
      <div className="checkoutLayout">
        <div className="returnCart">
          <Link to="/">Keep Shopping</Link>
          <h1>List Product in Cart</h1>
          <div className="list">
            {all_products.map((product) => {
              if (cartItems[product.id] > 0) {
                return (
                  <div key={product.id} className="cart-card">
                    <img src={product.image} alt={product.name} className="cart-card-image" />
                    <div className="cart-card-info">
                      <div className="name">{product.name}</div>
                      <div className="price">${product.new_price}/1 product</div>
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
                <div className="totalPrice">${getTotalCartAmount().toFixed(2)}</div>
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