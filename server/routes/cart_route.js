const express = require("express");
const cartController = require("../controllers/CartController");
const router = express.Router();

router.post("/cart/addToCart", cartController.addToCart);
router.get("/cart/myCart", cartController.getMyCart);

module.exports = router;