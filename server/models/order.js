const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }],
    cost: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "completed", "cancelled",],
        default: "pending",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", OrderSchema);
