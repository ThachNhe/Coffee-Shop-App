const express = require("express");
const userController = require("../controllers/UserController");
const router = express.Router();

router.get("/users", userController.getAllUsers);
router.post("/register", userController.register);
router.post("/login", userController.logIn);
router.get("/logout", userController.logOut);
router.get("/users/:id", userController.getUserById);

module.exports = router;