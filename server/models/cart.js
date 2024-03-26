const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CartSchema = new Schema({
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
});

module.exports = mongoose.model("Cart", CartSchema);
