const Supplier = require("../models/Supplier");

exports.createSupplierService = async (newStore) => {
  const result = await Supplier.create(newStore);
  return result;
};

exports.getSuppliersService = async () => {
  const result = await Store.find({}).sort({ _id: -1 });
  return result;
};

exports.getSupplierByIDService = async (id) => {
  const result = await Store.findById({ _id: id });
  return result;
};

exports.updateSupplierByIdService = async (id, data) => {
  const result = await Store.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
