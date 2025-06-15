import axios from 'axios';
import CryptoJS from 'crypto-js';
import Payment from '../models/paymentModel.js';

// Initiate Payment
export const initiatePayment = async (req, res) => {
  const { order_id, amount, currency = 'LKR', customer_email, customer_name } = req.body;

  // validation
  if (!order_id || typeof order_id !== 'string' || order_id.trim() === '') {
    console.error('Validation error: Missing or invalid order_id');
    return res.status(400).json({ error: 'Missing or invalid order_id' });
  }
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    console.error('Validation error: Missing or invalid amount');
    return res.status(400).json({ error: 'Missing or invalid amount' });
  }
  if (!customer_email || !/^\S+@\S+\.\S+$/.test(customer_email)) {
    console.error('Validation error: Missing or invalid customer_email');
    return res.status(400).json({ error: 'Missing or invalid customer_email' });
  }
  if (!customer_name || typeof customer_name !== 'string' || customer_name.trim() === '') {
    console.error('Validation error: Missing or invalid customer_name');
    return res.status(400).json({ error: 'Missing or invalid customer_name' });
  }

  // Validate currency
  const allowedCurrencies = ['LKR', 'USD', 'GBP', 'EUR', 'AUD'];
  if (!allowedCurrencies.includes(currency)) {
    console.error('Validation error: Unsupported currency', currency);
    return res.status(400).json({ error: 'Unsupported currency' });
  }

  // To generate PayHere hash
  const merchantSecret = CryptoJS.MD5(process.env.PAYHERE_MERCHANT_SECRET)
    .toString()
    .toUpperCase();
  const hash = CryptoJS.MD5(
    process.env.PAYHERE_MERCHANT_ID +
      order_id +
      Number(amount).toFixed(2) +
      currency +
      merchantSecret
  )
    .toString()
    .toUpperCase();

  // Log the generated hash and payment data
  console.log('Generated Hash:', hash);
  console.log('Payment Data:', {
    order_id,
    amount,
    currency,
    customer_email,
    customer_name,
    hash
  });

  const paymentData = {
    sandbox: process.env.NODE_ENV === 'development' ? true : false,
    merchant_id: process.env.PAYHERE_MERCHANT_ID,
    return_url: process.env.PAYHERE_RETURN_URL,
    cancel_url: process.env.PAYHERE_CANCEL_URL,
    notify_url: process.env.PAYHERE_NOTIFY_URL,
    order_id,
    items: 'Sri Lankan Products',
    currency,
    amount: Number(amount).toFixed(2),
    first_name: customer_name.split(' ')[0],
    last_name: customer_name.split(' ').slice(1).join(' ') || 'N/A',
    email: customer_email,
    phone: req.body.phone || 'N/A',
    address: req.body.address || 'N/A',
    city: req.body.city || 'N/A',
    country: req.body.country || 'Sri Lanka',
    hash,
  };

  try {
    res.json({
      url: process.env.NODE_ENV === 'development'
        ? 'https://sandbox.payhere.lk/pay/checkout'
        : 'https://www.payhere.lk/pay/checkout',
      data: paymentData,
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
};

// Handle PayHere Webhook
export const handleWebhook = async (req, res) => {
  const {
    merchant_id,
    order_id,
    payment_id,
    status_code,
    md5sig,
    amount,
    currency,
    email,
  } = req.body;

  // Log incoming webhook data
  console.log('Received webhook:', req.body);

  // Enhanced validation
  if (!merchant_id || !order_id || !payment_id || !status_code || !md5sig) {
    console.error('Webhook validation error: Missing required fields');
    return res.status(400).send('Missing required fields');
  }

  // Verify signature
  const localSignature = CryptoJS.MD5(
    merchant_id +
      order_id +
      payment_id +
      status_code +
      CryptoJS.MD5(process.env.PAYHERE_MERCHANT_SECRET).toString().toUpperCase()
  )
    .toString()
    .toUpperCase();

  if (localSignature !== md5sig) {
    console.error('Invalid signature received', { localSignature, md5sig });
    return res.status(400).send('Invalid signature');
  }

  try {
    // Map PayHere status codes to internal status
    const statusMap = {
      '2': 'completed', '0': 'pending','-1': 'canceled','-2': 'failed', '-3': 'charged_back',
    };
    const status = statusMap[status_code] || 'failed';

    // Save or update transaction
    const paymentRecord = await Payment.findOneAndUpdate(
      { payment_id },
      {
        merchant_id,
        order_id,
        payment_id,
        status,
        amount: parseFloat(amount),
        currency,
        customer_email: email
      },
      { upsert: true, new: true }
    );
    console.log('Payment record updated:', paymentRecord);
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).send('Server error');
  }
};