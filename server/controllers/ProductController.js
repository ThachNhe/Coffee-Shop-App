const Product = require("../models/product");

class ProductController {

    //POST /products/createProduct
    async createNewProduct(req, res) {
        const {name, description, price, image} = req.body;
        const newProduct = await Product.create({
            name: name,
            description: description,
            price: price,
            image: image,
        });
        return res.status(200).json({
            newProduct,
            message: "Create successfully",
        })
    }

    //GET /products/:productId
    async getProductById(req, res) {
        const productId = req.params.productId;
        const product = await Product.findOne({
            _id: productId,
        });
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        return res.status(200).json({
            product,
            message: "Query successfully",
        })
    }

    //GET /products
    async getAllProducts(req, res) {
        const products = await Product.find();
        if (!products) {
            return res.status(200).json({
                message: "There is no product",
            });
        }
        return res.status(200).json({
            products,
            message: "Query successfully",
        })
    }
}

module.exports = new ProductController();
