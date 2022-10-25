const Store = require("../models/Store");

exports.createStoreService = async (newStore) => {
  const result = await Store.create(newStore);
  return result;
};

exports.getStoresService = async () => {
  const result = await Store.find({}).sort({ _id: -1 });
  return result;
};

exports.getStoreByIDService = async (id) => {
  const result = await Store.findById({ _id: id });
  return result;
};

exports.updateStoreByIdService = async (id, data) => {
  const result = await Store.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
