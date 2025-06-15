import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      index: true,
    },
    payment_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    merchant_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['completed', 'pending', 'canceled', 'failed', 'charged_back'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, 'Amount must be positive'],
    },
    currency: {
      type: String,
      default: 'LKR',
      enum: ['LKR', 'USD', 'GBP', 'EUR', 'AUD'], //compatible with PayHere currencies
    },
    customer_email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for faster queries
paymentSchema.index({ order_id: 1, payment_id: 1 });

export default mongoose.model('Payment', paymentSchema);