const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    user_id: {
        type: Schema.ObjectId,
        ref: "User",
    },
    product_id: {
        type: Schema.ObjectId,
        ref: "Product",
    },
    rating: {
        type: Number,
    },
    comment: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("Review", ReviewSchema);
