const Brand = require("../models/Brand");

exports.brandCreate = async (body) => {
  const result = await Brand.create(body);
  return result;
};
