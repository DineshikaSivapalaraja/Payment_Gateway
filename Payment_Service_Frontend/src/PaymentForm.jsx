import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const PaymentForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    order_id: `ORD${Date.now()}`,
    amount: 100,
    customer_name: '',
    customer_email: '',
    currency: 'LKR',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
    setError(''); // Clear error on input change
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!orderDetails.order_id || !orderDetails.amount || !orderDetails.customer_name || !orderDetails.customer_email) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/payment/initiate-payment`, orderDetails);
      const { url, data } = response.data;

      // Load PayHere SDK
      const script = document.createElement('script');
      script.src = 'https://www.payhere.lk/lib/payhere.js';
      script.async = true;
      script.onload = () => {
        window.payhere.onCompleted = (paymentId) => {
          console.log(`Payment completed: ${paymentId}`);
          window.location.href = '/payment/success';
        };
        window.payhere.onDismissed = () => {
          console.log('Payment dismissed');
          window.location.href = '/payment/cancel';
        };
        window.payhere.onError = (errorMsg) => {
          console.error('Payment error:', errorMsg);
          setError('Payment failed. Please try again.');
          setLoading(false);
        };

        window.payhere.startPayment(data);
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error('Payment initiation failed:', error);
      setError('Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Pay for Products</h2>
      {error && <p className="error">{error}</p>}
      <form className="payment-form" onSubmit={handlePayment}>
        <div className="form-group">
          <label htmlFor="order_id">Order ID</label>
          <input
            type="text"
            id="order_id"
            name="order_id"
            value={orderDetails.order_id}
            onChange={handleInputChange}
            placeholder="ORD12345"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={orderDetails.amount}
            onChange={handleInputChange}
            placeholder="100"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customer_name">Full Name</label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            value={orderDetails.customer_name}
            onChange={handleInputChange}
            placeholder="Test User"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customer_email">Email</label>
          <input
            type="email"
            id="customer_email"
            name="customer_email"
            value={orderDetails.customer_email}
            onChange={handleInputChange}
            placeholder="test@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currency"
            value={orderDetails.currency}
            onChange={handleInputChange}
          >
            <option value="LKR">LKR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
            <option value="AUD">AUD</option>
          </select>
        </div>
        <button type="submit" className="pay-button" disabled={loading}>
          {loading ? 'Processing...' : 'Pay with PayHere'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;