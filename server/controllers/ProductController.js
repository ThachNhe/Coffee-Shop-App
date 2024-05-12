const Product = require("../models/product");
const collect = require("collect");

class ProductController {

    //POST /products/createProduct
    async createNewProduct(req, res) {
        const {
            name,
            description,
            imagelink_square,
            imagelink_portrait,
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
                imagelink_square: imagelink_square,
                imagelink_portrait: imagelink_portrait,
                type: type,
                ingredients: ingredients,
                special_ingredient: special_ingredient,
                prices: prices,
                roasted: roasted,
            });
            return res.status(200).json({
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
        let products = await queryAllProducts();
        products = products.map((obj, index) => {
            return {
                ...obj,
                index: index + 1,
            }
        })
        return res.status(200).json(products);
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
        return res.status(200).json(coffees);
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
        return res.status(200).json(beans);
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
                special_ingredient: 1,
            }
        }
    ]);
    return products;
}

module.exports = new ProductController();
