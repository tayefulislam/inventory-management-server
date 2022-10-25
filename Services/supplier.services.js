const Supplier = require("../models/Supplier");

exports.createSupplierService = async (newStore) => {
  const result = await Supplier.create(newStore);
  return result;
};

exports.getSuppliersService = async () => {
  console.log("helo");
  const result = await Supplier.find({}).sort({ _id: -1 });
  console.log(result);
  return result;
};

exports.getSupplierByIDService = async (id) => {
  const result = await Supplier.findById({ _id: id });
  return result;
};

exports.updateSupplierByIdService = async (id, data) => {
  const result = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
