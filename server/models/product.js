const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },

    imagelink_square: {
        type: [String],
    },
    imagelink_portrait: [String],
    type: {
        type: String,
    },
    ingredients: {
        type: [String],
    },
    special_ingredient: [String],
    prices: [{
        size: String,
        price: Number,
        currency: {
            type: String,
            default: "$",
        },
    },
    ],
    roasted: String,
});

module.exports = mongoose.model("Product", ProductSchema);
