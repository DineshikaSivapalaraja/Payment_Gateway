import React from 'react';
import './styles.css';

const PaymentCancel = () => {
  return (
    <div className="payment-container">
      <h2>Payment Cancelled</h2>
      <p>Your payment was cancelled. Please try again if you wish to complete your purchase.</p>
      <a href="/" className="back-button">Try Again</a>
    </div>
  );
};

export default PaymentCancel;