const express = require("express");
const cartController = require("../controllers/CartController");
const router = express.Router();

router.post("/carts/:userId/addToCart", cartController.addToCart);
router.get("/carts/:userId", cartController.getCartByUserId);

module.exports = router;