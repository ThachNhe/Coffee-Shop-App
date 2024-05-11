const Product = require("../models/product");

class ProductController {

    //POST /products/createProduct
    async createNewProduct(req, res) {
        const {
            name,
            description,
            image_square,
            image_portrait,
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
                image_square: image_square,
                image_portrait: image_portrait,
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
        return res.status(200).json(await queryAllProducts());
    }

    //GET /products/coffee
    async getAllCoffees(req, res) {
        const products = await queryAllProducts();
        const coffees = products.filter((product) => product.type === "coffee" || product.type === "Coffee");
        return res.status(200).json(coffees);
    }

    //GET /products/bean
        async getAllBeans(req, res) {
            const products = await queryAllProducts();
            const beans = products.filter((product) => product.type === "bean" || product.type === "Bean");
            return res.status(200).json(beans);
        }
}

function queryAllProducts() {
    return Product.aggregate([
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
                image_square: 1,
                image_portrait: 1,
                ingredients: 1,
                special_ingredient: 1,
            }
        }
    ]);
}

module.exports = new ProductController();
