const {
  createStoreService,
  getStoresService,
  getStoreByIDService,
  updateStoreByIdService,
} = require("../Services/store.services");

exports.createStore = async (req, res, next) => {
  try {
    const newStore = await createStoreService(req.body);

    res.status(200).json({
      status: "failed",
      message: "Successfully Store Created",
      result: newStore,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to Create Store",
      error: error.message,
    });
  }
};

exports.getStores = async (req, res, next) => {
  try {
    const result = await getStoresService();

    res.status(200).json({
      status: "success",
      message: "Successfully get store",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to get store",
      error: error.message,
    });
  }
};

exports.getStoreByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getStoreByIDService(id);

    res.status(200).json({
      status: "success",
      message: "Successfully get store by id",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to get store by id",
      error: error.message,
    });
  }
};

exports.updateStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateStore = await updateStoreByIdService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully Store Updated by Id",
      result: updateStore,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to Store Updated by Id",
      error: error.message,
    });
  }
};
