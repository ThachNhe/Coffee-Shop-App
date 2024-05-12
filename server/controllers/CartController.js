const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");
const {ObjectId} = require("mongodb");

class CartController {

    //POST /cart/addToCart
    async addToCart(req, res) {
        try {
            const userId = req.session.User;
            if (!userId) {
                return res.status(401).json({
                    msg: "Login first",
                });
            }
            const productId = req.body.productId;
            const size = req.body.size;
            const quantity = req.body.quantity;
            const product = await Product.findOne({_id: productId});
            if (!product) {
                return res.status(404).json({
                    msg: "Product not found",
                });
            }
            const existingCart = await Cart.findOne({user_id: userId});
            if (existingCart) {
                await Cart.updateOne(
                    {user_id: userId},
                    {
                        $addToSet: {
                            products: {
                                product_id: productId,
                                quantity: quantity,
                                size: size,
                            }
                        },
                    },
                );
                return res.status(200).json({
                    msg: "Product added to the cart",
                });
            } else {
                await Cart.create({
                    user_id: userId,
                    products: [{
                        product_id: productId,
                        quantity: quantity,
                        size: size,
                    }],
                });
                return res.status(200).json({
                    msg: "New cart created and product added",
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    //GET /cart/myCart
    async getMyCart(req, res) {
        return res.json(await getCart(req.session.User));
    }
}

async function getCart(userId) {
    try {
        return await Cart.aggregate([{
                $match:
                    {
                        user_id: new ObjectId(userId),
                    },
            }, {
                $unwind: "$products",
            }, {
                $lookup: {
                    from: "products",
                    localField: "products.product_id",
                    foreignField: "_id",
                    as: "product_info",
                },
            }, {
                $unwind: "$product_info",
            }, {
                $project: {
                    _id: 1,
                    user_id: 1,
                    product: {
                        product_id: "$products.product_id",
                        name: "$product_info.name",
                        imagelink_square: "$product_info.imagelink_square",
                        special_ingredient: "$product_info.special_ingredient",
                        roasted: "$product_info.roasted",
                        type: "$product_info.size",
                        size: {
                            $filter: {
                                input: "$product_info.prices",
                                as: "price",
                                cond: {
                                    $eq: ["$$price.size", "$products.size"],
                                },
                            },
                        },
                        quantity: "$products.quantity",
                    },
                },
            },
                {
                    $unwind: "$product.size",
                },
                {
                    $addFields: {
                        "product.cost": {$multiply: ["$product.quantity", "$product.size.price"]}
                    }
                }, {
                    $group: {
                        _id: "$_id",
                        user_id: {$first: "$user_id"},
                        products: {$push: "$product"},
                        cost: {$sum: "$product.cost"},
                    }
                }
            ]
        );
    } catch (e) {
        console.log(e);
    }
}

module.exports = new CartController();
