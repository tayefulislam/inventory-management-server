const express = require("express");

const router = express.Router();

const brandController = require("../Controllers/Brand.Controller");

router
  .route("/")
  .post(brandController.brandCreate)
  .get(brandController.getBrands);

router
  .route("/:id")
  .get(brandController.getBrandById)
  .patch(brandController.updateBrandById);

module.exports = router;
