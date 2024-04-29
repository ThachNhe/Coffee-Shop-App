const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CartSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    products: [{
        product_id:mongoose.Schema.Types.ObjectId,
        quantity:Number,
        size:String,
    }],
});

module.exports = mongoose.model("Cart", CartSchema);
