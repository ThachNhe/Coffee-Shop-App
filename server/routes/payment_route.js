const express = require("express");
const paymentController = require("../controllers/PaymentController");
const router = express.Router();


router.post("/create-payment-link", paymentController.createPaymentLink);
router.get("/payment/:orderId", paymentController.getPaymentLink);
router.post("/payment/:orderId", paymentController.cancelPaymentLink);

module.exports = router;
