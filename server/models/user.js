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
    addresses: [{
        province: String,
        district: String,
        ward: String,
        details: String,
        isDefault: Boolean,
    }],
    favorite: {
        type: [ObjectId],
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    googleId: {
        type: String,
    },
});

module.exports = mongoose.model("User", UserSchema);
