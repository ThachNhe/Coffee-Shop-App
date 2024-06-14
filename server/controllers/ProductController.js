const Product = require("../models/product");
const multer = require("multer");

class ProductController {

    //POST /products/createProduct
    async createNewProduct(req, res) {
        const {
            name,
            description,
            type,
            ingredients,
            special_ingredient,
            prices,
            roasted,
        } = req.body;


        try {
            await Product.create({
                name: name,
                description: description,
                type: type,
                ingredients: ingredients,
                special_ingredient: special_ingredient,
                prices: prices,
                roasted: roasted,
                imagelink_square: req.file
                    ? {
                        filename: req.file.originalname,
                        contentType: req.file.mimetype,
                        imageBase64: req.file.buffer.toString('base64'),
                    } : undefined
            });
            return res.status(200).json({
                errorCode: 0,
                msg: "OK",
            })
        } catch (e) {
            console.log(e);
        }
    }

    //GET /products/:productId
    async getProductById(req, res) {
        const productId = req.params.productId;
        const product = await Product.findOne({
            _id: productId,
        });
        if (!product) {
            return res.status(404).json({
                errorCode: 1,
                msg: "Product not found",
            });
        }
        return res.status(200).json({
            product,
            errorCode: 0,
        })
    }

    //GET /products
    async getAllProducts(req, res) {
        let products = await queryAllProducts();
        products = products.map((obj, index) => {
            return {
                ...obj,
                index: index + 1,
            }
        })
        return res.status(200).json({
            errorCode: 0,
            products
        });
    }

    //GET /products/coffee
    async getAllCoffees(req, res) {
        const products = await queryAllProducts();
        let coffees = products.filter((product) => product.type === "coffee" || product.type === "Coffee");
        coffees = coffees.map((obj, index) => {
            return {
                ...obj,
                index: index + 1,
            }
        })
        return res.status(200).json({
            errorCode: 0,
            coffees
        });
    }

    //GET /products/bean
    async getAllBeans(req, res) {
        const products = await queryAllProducts();
        let beans = products.filter((product) => product.type === "bean" || product.type === "Bean");
        beans = beans.map((obj, index) => {
            return {
                ...obj,
                index: index + 1,
            }
        })
        return res.status(200).json({
            errorCode: 0,
            beans
        });
    }
}

function queryAllProducts() {
    const products = Product.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "product_id",
                as: "reviews",
            }
        }, {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                type: 1,
                average_rating: {
                    $cond: {
                        if: {$gt: [{$size: '$reviews'}, 0]},
                        then: {$avg: '$reviews.rating'},
                        else: 0,
                    },
                },
                ratings_count: {
                    $size: '$reviews',
                },
                roasted: 1,
                imagelink_square: 1,
                imagelink_portrait: 1,
                ingredients: 1,
                prices: 1,
                special_ingredient: 1,
            }
        }
    ]);
    return products;
}

module.exports = new ProductController();
