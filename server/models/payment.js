const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    order_id: Number,
    products: [
        {
            product_id: Schema.Types.ObjectId,
            size: String,
            quantity: Number,
        }
    ],
    status: {
        type: String,
        default: "pending",
    },
    total_price: Number,
});

module.exports = new mongoose.model("Payment", PaymentSchema);
