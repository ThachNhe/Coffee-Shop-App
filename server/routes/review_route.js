const express = require("express");
const reviewController = require("../controllers/ReviewController");
const router = express.Router();

router.post("/reviews/:productId/users/:userId/create", reviewController.createReview);
router.get("/reviews/product/:productId",reviewController.getReviewsOfProduct);
router.get("/reviews/user/:userId",reviewController.getReviewsOfUser);

module.exports = router;
