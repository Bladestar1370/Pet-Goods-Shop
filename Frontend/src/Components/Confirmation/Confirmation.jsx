import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load
  }, []);

  return (
    <div className="confirmation">
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed. You will receive a confirmation email shortly.</p>
      <button onClick={() => {
        window.scrollTo(0, 0);
        navigate('/');
      }}>
        Continue Shopping
      </button>
    </div>
  );
};

export default Confirmation;