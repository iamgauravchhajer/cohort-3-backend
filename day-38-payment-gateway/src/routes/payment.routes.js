const express = require('express');
const { checkout, verify } = require('../controllers/payment.controller');

const paymentRoutes = express.Router();

paymentRoutes.post("/:productId/checkout", checkout);
paymentRoutes.post("/verify", verify);

module.exports = paymentRoutes;

