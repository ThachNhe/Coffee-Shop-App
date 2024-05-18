const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcrypt");
const {ObjectId} = require("mongodb");


class UserController {
    //POST /register
    async register(req, res) {
        try {
            const {email, password, phone, address, name} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                email,
                password: hashedPassword,
                phone,
                address,
                name
            });
            // res.redirect("/login");
            return res.status(200).json({
                msg: "OK",
            })
        } catch (err) {
            console.error(err);
            // res.redirect("/register");
        }
    }

    //POST /login
    async logIn(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({message: 'Invalid password'});
            }
            req.session.User = user._id.toString();
            console.log(req.session);
            return res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }


    //GET /users
    async getAllUsers(req, res) {
        const users = await User.find();
        return res.status(200).json(users);
    }

    //GET /logout
    async logOut(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).send('Error logging out');
            } else {
                console.log(req.session);
                res.redirect('/');
            }
        });
    }

    //GET /users/:_id
    async getUserById(req, res) {
        const user = await User.findOne({_id: req.params.id});
        if (!user) {
            return res.status(404).json({
                msg: "User not found",
            });
        }
        return res.status(200).json(user);
    }

    //POST /users/:userId/addToFavorite
    async addToFavorite(req, res) {
        const userId = req.params.userId;
        const user = await User.findOne({
            _id: userId,
        });
        if (!user) {
            return res.status(404).json({
                errCode: 1,
                msg: "User not found",
            });
        }

        const productId = req.body.productId;
        const product = await Product.findOne({
            _id: productId,
        });
        if (!product) {
            return res.status(404).json({
                errCode: 1,
                msg: "Product not found",
            });
        }

        const isfFavorite = user.favorite.find(id => id == productId);
        if (!isfFavorite) {
            user.favorite.push(productId);
            await user.save();
        }

        return res.status(200).json({
            errorCode: 0,
            msg: "Add to favorite successfully",
        });
    }

    //GET POST /users/:userId/myFavorite
    async getMyFavorite(req, res) {
        const userId = req.params.userId;
        const user = await User.findOne({
            _id: userId,
        });
        if (!user) {
            return res.status(404).json({
                errCode: 1,
                msg: "User not found",
            });
        }
        return res.status(200).json({
            errCode:0,
            favorite: user.favorite,
        })
    }
}

module.exports = new UserController();