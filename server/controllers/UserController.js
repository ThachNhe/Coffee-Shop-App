const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcrypt");


class UserController {
    //POST /register
    async register(req, res) {
        try {
            const {email, password, phone, name, role} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                email,
                password: hashedPassword,
                phone,
                name,
                role,
            });
            return res.status(200).json({
                errorCode: 0,
                msg: "OK",
            })
        } catch (err) {
            console.error(err);
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
            return res.status(200).json({
                errorCode: 0,
                user,
            });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }


    //GET /users
    async getAllUsers(req, res) {
        const users = await User.find();
        return res.status(200).json({
            errorCode: 0,
            users,
        });
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
        return res.status(200).json({
            errorCode: 0,
            user
        });
    }

    //POST /users/:userId/addToFavorite
    async addToFavorite(req, res) {
        const userId = req.params.userId;
        const user = await User.findOne({
            _id: userId,
        });
        if (!user) {
            return res.status(404).json({
                errorCode: 1,
                msg: "User not found",
            });
        }

        const productId = req.body.productId;
        const product = await Product.findOne({
            _id: productId,
        });
        if (!product) {
            return res.status(404).json({
                errorCode: 1,
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

    //GET /users/:userId/myFavorite
    async getMyFavorite(req, res) {
        const userId = req.params.userId;
        const user = await User.findOne({
            _id: userId,
        });
        if (!user) {
            return res.status(404).json({
                errorCode: 1,
                msg: "User not found",
            });
        }
        const favorites = user.favorite;

        const products = await Product.find({
            _id: {
                $in: favorites,
            }
        })

        return res.status(200).json({
            errorCode: 0,
            favorite: products,
        })
    }

    //POST /users/:userId/deleteFromFavorite
    async deleteFromFavorite(req, res) {
        const userId = req.params.userId;
        const user = await User.findOne({
            _id: userId,
        });
        if (!user) {
            return res.status(404).json({
                errorCode: 1,
                msg: "User not found",
            });
        }
        const favorites = user.favorite;

        const productId = req.body.productId;
        const product = await Product.findOne({
            _id: productId,
        });
        if (!product) {
            return res.status(404).json({
                errorCode: 1,
                msg: "Product not found",
            });
        }

        const isfFavorite = favorites.find(id => id == productId);
        if (!isfFavorite) {
            return res.status(403).json({
                errorCode: 1,
                msg: "Product is not in favorite list",
            });
        }

        favorites.splice(favorites.indexOf(productId));
        await user.save();
        return res.status(200).json({
            errorCode: 0,
            msg: "Delete from favorite list successfully",
        });

    }

    //GET /users/:userId/products/:productId
    async checkIfIsFavorite(req, res) {
        const userId = req.params.userId;
        const user = await User.findOne({
            _id: userId,
        });
        if (!user) {
            return res.status(404).json({
                errorCode: 1,
                msg: "User not found",
            });
        }
        const favorites = user.favorite;

        const productId = req.params.productId;
        const product = await Product.findOne({
            _id: productId,
        });
        if (!product) {
            return res.status(404).json({
                errorCode: 1,
                msg: "Product not found",
            });
        }

        return res.status(200).json({
            errCode: 0,
            isFavorite: favorites.includes(productId),
        })
    }

    //GET /users/:userId/addresses
    async getAddress(req, res) {
        const userId = req.params.userId;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    errorCode: 1,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                errorCode: 0,
                address: user.addresses,
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({
                errorCode: -1,
                message: "Interval server error",
            })
        }
    }

    //POST /users/:userId/addresses
    async addAddress(req, res) {
        const userId = req.params.userId;
        const {province, district, ward, details, userName, phone} = req.body;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    errorCode: 1,
                    message: "User not found",
                });
            }

            user.addresses.push({
                province: province,
                district: district,
                ward: ward,
                details: details,
                user_name: userName,
                phone: phone,
                isDefault: false
            });
            await user.save();

            return res.status(200).json({
                errorCode: 0,
                message: "Address added successfully",
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                errorCode: -1,
                message: "Interval server error",
            })
        }
    }

    //PUT /users/:userId/addresses/:addressId/default
    async setDefaultAddress(req, res) {
        const userId = req.params.userId;
        const addressId = req.params.addressId;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    errorCode: 1,
                    message: "User not found",
                });
            }

            const address = user.addresses.find(address => address._id.toString() === addressId);
            if (!address) {
                return res.status(404).json({message: 'Address not found'});
            }

            user.addresses.forEach(address => address.isDefault = false);
            address.isDefault = true;
            await user.save();

            return res.status(200).json({
                errorCode: 0,
                message: "Address set as default successfully",
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({
                errorCode: -1,
                message: "Interval server error",
            })
        }
    }

}

function isFavorite(favorites, productId) {
    return favorites.find(id => id == productId);
}

module.exports = new UserController();