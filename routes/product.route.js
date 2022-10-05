const express = require("express");
const router = express.Router();
const productController = require("../Controllers/Product.Controller");


router.route("/bluk-insert")
    .post(productController.blukProductInsert);

router.route("/bluk-update")
    .patch(productController.blukProductUpdate);


router.route("/")
    .delete(productController.blukDeleteProductByIds);

router.route('/')
    .get(productController.getProducts)
    .post(productController.saveProduct);


    
router.route("/:id")
    .patch(productController.updateProduct)
    .delete(productController.deleteProductById);


module.exports = router;


