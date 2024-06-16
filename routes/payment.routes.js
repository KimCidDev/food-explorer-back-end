const { Router } = require('express');
const PaymentController = require('../controllers/paymentController');
const paymentController = new PaymentController();

const paymentRoutes = Router();

paymentRoutes.post(
  '/create-checkout-session',
  paymentController.createCheckoutSession
);

module.exports = paymentRoutes;
