import React from 'react';
import './styles.css';

const PaymentSuccess = () => {
  return (
    <div className="payment-container">
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase of Products.</p>
      <p>Your order has been processed successfully.</p>
      <a href="/" className="back-button">Back to Home</a>
    </div>
  );
};

export default PaymentSuccess;