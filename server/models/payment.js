const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    order_id: Number,
});

module.exports = new mongoose.model("Payment", PaymentSchema);
