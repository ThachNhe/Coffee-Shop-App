const express=require("express");
const paymentController=require("../controllers/PaymentController");
const router=express.Router();


router.get("/create-payment-link",paymentController.createPaymentLink);

module.exports=router;
