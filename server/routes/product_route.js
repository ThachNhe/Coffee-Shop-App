const express = require("express");
const productController = require("../controllers/ProductController");
const router = express.Router();

router.post("/products/createProduct", productController.createNewProduct);
router.get("/products/bean", productController.getAllBeans);
router.get("/products/coffee", productController.getAllCoffees);
router.get("/products/:productId", productController.getProductById);
router.get("/products", productController.getAllProducts);

module.exports = router;
