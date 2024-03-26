const productRoute=require("./product_route");

function routesInit(app) {
    app.use("/",productRoute);
}

module.exports = routesInit;
