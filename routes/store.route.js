const express = require("express");
const router = express.Router();
const storeController = require("../Controllers/Store.Controller");

router
  .route("/")
  .post(storeController.createStore)
  .get(storeController.getStores);

router
  .route("/:id")
  .get(storeController.getStoreByID)
  .patch(storeController.updateStoreById);

module.exports = router;
