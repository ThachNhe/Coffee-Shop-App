const PayOS = require("@payos/node");
const Payment = require("../models/payment");
const User = require("../models/user");
const {ObjectId} = require("mongodb");

const payOs = new PayOS(
    "0f5eabbd-c66e-4a00-9d2d-06c4eae6ce45",
    "77d87a4d-30e1-47b0-bf21-03ed396224d1",
    "55866cb398bedd75540948adad70a57016810995567921d41f62e40450e538e5"
);

class PaymentController {
    //POST /create-payment-link
    async createPaymentLink(req, res) {
        const userId = req.session.User;
        if (!userId) {
            return res.status(401).json({
                errorCode: 1,
                msg: "Login first",
            })
        }
        const {amount, description, cancelUrl, returnUrl, products} = req.body;
        const order = {
            orderCode: Number(String(new Date().getTime()).slice(-6)),
            amount: Number(amount),
            description: description,
            cancelUrl: cancelUrl, // Payment cancel
            returnUrl: returnUrl, //Payment success

        };
        try {
            const paymentLinkRes = await payOs.createPaymentLink(order);
            await Payment.create({
                user_id: userId,
                order_id: paymentLinkRes.orderCode,
                products: products,
                total_price: Number(amount),
            });


            return res.status(200).json({
                bin: paymentLinkRes.bin,
                checkoutUrl: paymentLinkRes.checkoutUrl,
                accountNumber: paymentLinkRes.accountNumber,
                accountName: paymentLinkRes.accountName,
                amount: paymentLinkRes.amount,
                description: paymentLinkRes.description,
                orderCode: paymentLinkRes.orderCode,
                qrCode: paymentLinkRes.qrCode,
            })
        } catch (e) {
            console.log(e);
            return res.json({
                error: -1,
                message: "fail",
                data: null,
            });
        }
    }

    //GET /payment/:orderId
    async getPaymentLink(req, res) {
        try {
            const order = await payOs.getPaymentLinkInformation(req.params.orderId);
            if (!order) {
                return res.json({
                    error: -1,
                    message: "failed",
                    data: null,
                });
            }
            return res.json({
                error: 0,
                message: "ok",
                data: order,
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: -1,
                message: "failed",
                data: null,
            });
        }
    }

    //POST /payment/:orderId
    async cancelPaymentLink(req, res) {
        try {
            const {orderId} = req.params;
            const body = req.body;
            const order = await payOs.cancelPaymentLink(orderId, body.cancellationReason);
            if (!order) {
                return res.json({
                    error: -1,
                    message: "failed",
                    data: null,
                });
            }
            return res.json({
                error: 0,
                message: "ok",
                data: order,
            });
        } catch (error) {
            console.error(error);
            return res.json({
                error: -1,
                message: "failed",
                data: null,
            });
        }
    }

    //GET /payment/users/:userId
    async getPaymentOfUser(req, res) {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                errorCode: -1,
                message: "User not found",
            });
        }

        const payments = await Payment.aggregate([
            {
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
                    status: 1,
                    order_id: 1,
                    total_price: 1,
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
            }, {
                $group: {
                    _id: "$_id",
                    user_id: {$first: "$user_id"},
                    products: {$push: "$product"},
                    status: {$first: "$status"},
                    order_id: {$first: "$order_id"},
                    total_price: {$first: "$total_price"}
                }
            }
        ])

        return res.status(200).json({
            errorCode: 0,
            payments,
        })
    }


    //PUT /payment/:paymentId/processing
    async setPaymentToProcessing(req, res) {
        const paymentId = req.params.paymentId;
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({
                errorCode: -1,
                message: "Payment not found",
            })
        }

        payment.status = "processing";
        await payment.save();

        return res.status(200).json({
            error: 0,
            message: "Update payment status to processing",
        })
    }

    //PUT /payment/:paymentId/completed
    async setPaymentToCompleted(req, res) {
        const paymentId = req.params.paymentId;
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({
                errorCode: -1,
                message: "Payment not found",
            })
        }

        payment.status = "completed";
        await payment.save();

        return res.status(200).json({
            error: 0,
            message: "Update payment status to completed",
        })
    }

    //GET /payment
    async getAllPayments(req, res) {
        const payments = await Payment.aggregate([
            {
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
                    status: 1,
                    order_id: 1,
                    total_price: 1,
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
            }, {
                $group: {
                    _id: "$_id",
                    user_id: {$first: "$user_id"},
                    products: {$push: "$product"},
                    status: {$first: "$status"},
                    order_id: {$first: "$order_id"},
                    total_price: {$first: "$total_price"}
                }
            }
        ]);

        return res.status(200).json({
            errorCode: 0,
            payments,
        })
    }

}

module.exports = new PaymentController();
