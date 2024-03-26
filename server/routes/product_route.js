const express=require("express");
const productController=require("../controllers/ProductController");
const router=express.Router();

router.get("/createProduct",productController.createNewProduct);

module.exports = router;
