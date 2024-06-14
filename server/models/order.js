const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: Number,
        size: String,
    }],
    amount: {
        type: Number,
        required: true,
    },
    // status: {
    //     type: String,
    //     enum: ["pending", "processing", "completed", "cancelled",],
    //     default: "pending",
    // },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", OrderSchema);
