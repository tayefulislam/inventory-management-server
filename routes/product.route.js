const express = require("express");
const router = express.Router();
const productController = require("../Controllers/Product.Controller");

router.route('/')
    .get(productController.getProducts)
    .post(productController.saveProduct);

router.route("/bluk-update")
    .patch(productController.blukProductUpdate);
    
router.route("/:id")
    .patch(productController.updateProduct);


module.exports = router;


