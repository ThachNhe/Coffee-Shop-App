const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: [String],
    },
    favorite: {
        type: [ObjectId],
    },
    name: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
    },
});

module.exports = mongoose.model("User", UserSchema);
