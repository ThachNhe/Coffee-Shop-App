const productRoute = require("./product_route");
const userRoute = require("./user_route");

function routesInit(app) {
    app.use("/", productRoute);
    app.use("/", userRoute);
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}

module.exports = routesInit;
