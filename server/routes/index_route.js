const productRoute = require("./product_route");
const userRoute = require("./user_route");
const reviewRoute = require("./review_route");
const cartRoute = require("./cart_route");
const paymentRoute = require("./payment_route");

function routesInit(app) {
    app.use("/", productRoute);
    app.use("/", userRoute);
    app.use("/", reviewRoute);
    app.use("/", cartRoute);
    app.use("/", paymentRoute);
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}

module.exports = routesInit;
