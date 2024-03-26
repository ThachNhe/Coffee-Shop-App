const Product = require("../models/product");

class ProductController {

    //POST /createProduct
    async createNewProduct(req, res) {
        const name = "Espresso";
        const description = "Espresso coffee";
        const price = 45000;
        const image = [
            "https://vuanem.com/blog/wp-content/uploads/2022/12/cach-pha-espresso-1.jpg",
            "https://pos.cafeongbau.com:4433/images/list/eppresso.png",
        ];
        const newProduct = await Product.create({
            name: name,
            description: description,
            price: price,
            image: image,
        });
        return res.status(200).json({
            newProduct,
            message: "Create successfully",
        })
    }
}

module.exports = new ProductController();
