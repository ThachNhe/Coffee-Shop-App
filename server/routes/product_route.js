const express = require("express");
const productController = require("../controllers/ProductController");
const router = express.Router();

router.post("/product/createProduct", productController.createNewProduct);
router.get("/product/:productId", productController.getProductById)
router.get("/product", productController.getAllProduct);

module.exports = router;
