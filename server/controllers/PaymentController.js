const PayOS = require("@payos/node");
const Payment = require("../models/payment")

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
            return res.status(403).json({
                msg: "Login first",
            })
        }
        const {amount, description, cancelUrl, returnUrl} = req.body;
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
    }cd
}

module.exports = new PaymentController();
