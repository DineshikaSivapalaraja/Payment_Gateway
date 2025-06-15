import express from 'express';
import { initiatePayment, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// Routes
router.post('/initiate-payment', initiatePayment);
router.post('/notify', handleWebhook);

export default router;
