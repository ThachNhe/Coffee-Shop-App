const express = require("express");
const paymentController = require("../controllers/PaymentController");
const router = express.Router();


router.post("/create-payment-link", paymentController.createPaymentLink);
router.get("/payment/:orderId", paymentController.getPaymentLink);
router.post("/payment/:orderId", paymentController.cancelPaymentLink);
router.put("/payment/:paymentId/processing", paymentController.setPaymentToProcessing);
router.put("/payment/:paymentId/completed", paymentController.setPaymentToCompleted);
router.get("/payment/users/:userId", paymentController.getPaymentOfUser);
router.get("/payment", paymentController.getAllPayments);

module.exports = router;
