const express = require("express");

const router = express.Router();

const supplierController = require("../Controllers/Supplier.Controller");

router
  .route("/")
  .post(supplierController.supplierCreate)
  .get(supplierController.getSuppliers);

router
  .route("/:id")
  .get(supplierController.getSupplierById)
  .patch(supplierController.updateSupplierById);

module.exports = router;
