// src/Components/Confirmation/Confirmation.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation">
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed. You will receive a confirmation email shortly.</p>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  );
};

export default Confirmation;