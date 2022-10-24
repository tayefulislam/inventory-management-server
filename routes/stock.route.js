const express = require("express");
const router = express.Router();
const stockController = require("../Controllers/Stock.Controller");

// router.route("/bluk-insert").post(stockController.blukProductInsert);

// router.route("/bluk-update").patch(stockController.blukProductUpdate);

// router.route("/").delete(stockController.blukDeleteStockByIds);

router
  .route("/")
  .get(stockController.getStocks)
  .post(stockController.createStock);

router
  .route("/:id")
  .get(stockController.getStockById)
  .patch(stockController.updateStock)
  .delete(stockController.deleteStockById);

module.exports = router;
