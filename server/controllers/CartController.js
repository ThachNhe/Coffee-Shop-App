const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");
const {ObjectId} = require("mongodb");

class CartController {

    //POST /carts/:userId/addToCart
    async addToCart(req, res) {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                errorCode: -1,
                message: "User not found",
            })
        }

        try {
            const productId = req.body.productId;
            const size = req.body.size;
            const quantity = req.body.quantity;
            console.log(productId);
            const product = await Product.findOne({_id: productId});
            if (!product) {
                return res.status(404).json({
                    errorCode: 1,
                    msg: "Product not found",
                });
            }
            const existingCart = await Cart.findOne({user_id: userId});

            if (existingCart) {

                const existingProduct = existingCart.products.find((product) =>
                    product.product_id == productId &&
                    product.size == size,
                )

                if (existingProduct) {
                    existingProduct.quantity += Number(quantity);
                    await existingCart.save();
                    return res.status(200).json({
                        errorCode: 0,
                        msg: "Product quantity updated in the cart",
                    });
                } else {
                    await Cart.updateOne(
                        {user_id: userId},
                        {
                            $push: {
                                products: {
                                    product_id: productId,
                                    size: size,
                                    quantity: quantity
                                }
                            }
                        },
                        {upsert: true}
                    );
                    return res.status(200).json({
                        errorCode: 0,
                        msg: "Product added to the cart",
                    })
                }
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
                    errorCode: 0,
                    msg: "New cart created and product added",
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    //GET /carts/:userId
    async getCartByUserId(req, res) {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                errorCode: -1,
                message: "User not found",
            })
        }
        const cart = await getCart(userId);
        return res.json({
            errorCode: 0,
            cart,
        });
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
                        type: "$product_info.type",
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
