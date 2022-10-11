const Category = require("../models/Category");

exports.createCategoryService = async (data) => {
  const result = await Category.create(data);
  return result;
};

exports.getCatagoryByIDService = async (id) => {
  const result = await Category.findById({ _id: id });
  return result;
};

exports.getCatagoriesService = async () => {
  const result = await Category.find({}).sort({ _id: -1 });
  return result;
};
exports.updateCategoryByIdService = async (id, data) => {
  const result = await Category.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
