import express from 'express';
import {
  createPaymentOrder,
  verifyPayment,
  paymentFailed
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createPaymentOrder);
router.post('/verify', verifyPayment);
router.post('/failed', paymentFailed);

export default router;
