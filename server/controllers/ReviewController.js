const Review = require("../models/review");
const Product = require("../models/product");
const User=require("../models/user");

class ReviewController {

    //POST /reviews/:productId/create
    async createReview(req, res) {
        const productId = req.params.productId;
        const userId = req.session._id;
        const rating = req.body.rating;
        const comment = req.body.comment;
        try {
            await Review.create({
                user_id: userId,
                product_id: productId,
                rating: rating,
                comment: comment,
            })
            return res.status(200).json({msg: "OK"});
        } catch (e) {
            console.log(e);
        }
    }

    //GET /reviews/product/:productId
    async getReviewsOfProduct(req, res) {
        const productId = req.params.productId;
        const product = await Product.findOne({_id: productId});
        if (!product) {
            return res.status(404).json({
                msg: "Product not found",
            });
        }
        const reviews = await Review.find({
            product_id: productId,
        });
        return res.status(200).json(reviews);
    }

    //GET /reviews/user/:userId
    async getReviewsOfUser(req, res) {
        const userId = req.params.userId;
        const user = await User.findOne({_id: userId});
        if (!user) {
            return res.status(404).json({
                msg: "User not found",
            });
        }
        const reviews = await Review.find({
            user_id: userId,
        });
        return res.status(200).json(reviews);
    }
}

module.exports = new ReviewController();