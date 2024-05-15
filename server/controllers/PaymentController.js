const PayOS = require("@payos/node");

const payOs = new PayOS(
    "0f5eabbd-c66e-4a00-9d2d-06c4eae6ce45",
    "77d87a4d-30e1-47b0-bf21-03ed396224d1",
    "55866cb398bedd75540948adad70a57016810995567921d41f62e40450e538e5"
);

class PaymentController {
    //POST /create-payment-link
    async createPaymentLink(req, res) {
        const order = {
            amount: 10000,
            description: "Thanh toan tien my tom",
            orderCode: 20,
            returnUrl: `${process.env.DOMAIN}/${process.env.PORT}`,
            cancelUrl: `${process.env.DOMAIN}/${process.env.PORT}`,
        };
        const paymentLink=await  payOs.createPaymentLink(order);
        res.redirect(paymentLink.checkoutUrl);
    }
}

module.exports = new PaymentController();
