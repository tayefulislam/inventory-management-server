const express = require("express");
const router = express.Router();
const productController = require("../Controllers/Product.Controller");

router.route('/')
    .get(productController.getProducts)
    .post(productController.saveProduct);



module.exports = router;


