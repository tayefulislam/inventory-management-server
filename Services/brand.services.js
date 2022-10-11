const Brand = require("../models/Brand");

exports.brandCreateService = async (body) => {
  const result = await Brand.create(body);
  return result;
};

exports.getBrandsService = async () => {
  const result = await Brand.find({})
    .select("-products -supplier")
    .sort({ _id: -1 });
  return result;
};

exports.getBrandByIDService = async (id) => {
  const result = await Brand.findById({ _id: id });
  return result;
};

exports.updateBrandByIDService = async (id, data) => {
  const result = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
