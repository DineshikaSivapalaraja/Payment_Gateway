import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import paymentRoutes from './src/routes/paymentRoute.js';

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Content Security Policy middleware
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy",
    "default-src 'self'; " +
    "connect-src 'self' " + process.env.BACKEND_URL + " https://sandbox.payhere.lk https://www.payhere.lk; " +
    "frame-src https://sandbox.payhere.lk https://www.payhere.lk; " +
    "script-src 'self' https://www.payhere.lk https://sandbox.payhere.lk; " +
    "style-src 'self' 'unsafe-inline' https://www.payhere.lk https://sandbox.payhere.lk;"
  );
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Payment Service is running successfully!');
});
app.use('/api/payment', paymentRoutes);

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 5080;
app.listen(PORT, () => {
  console.log(`Payment Service is running on port ${PORT}`);
});