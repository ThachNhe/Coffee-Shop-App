const express = require("express");
const userController = require("../controllers/UserController");
const router = express.Router();

router.get("/users", userController.getAllUsers);
router.post("/register", userController.register);
router.post("/login", userController.logIn);
router.get("/logout", userController.logOut);
router.get("/users/:id", userController.getUserById);
router.post("/users/:userId/addToFavorite", userController.addToFavorite);
router.get("/users/:userId/myFavorite", userController.getMyFavorite);
router.post("/users/:userId/deleteFromFavorite", userController.deleteFromFavorite);
router.get("/users/:userId/products/:productId", userController.checkIfIsFavorite);
router.get("/users/:userId/addresses", userController.getAddress);
router.post("/users/:userId/addresses", userController.addAddress);
router.put("/users/:userId/addresses/:addressId/default", userController.setDefaultAddress);

module.exports = router;