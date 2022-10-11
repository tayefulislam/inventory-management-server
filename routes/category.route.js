const express = require("express");
const { route } = require("../app");

const router = express.Router();

const categoryController = require("../Controllers/Category.Controller");

router
  .route("/")
  .post(categoryController.createCatagory)
  .get(categoryController.getCatagories);

router
  .route("/:id")
  .get(categoryController.getCatagoryByID)
  .patch(categoryController.updateCategoryById);

module.exports = router;
