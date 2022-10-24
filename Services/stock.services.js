const { ObjectId } = require("mongodb");
const Brand = require("../models/Brand");
const Stock = require("../models/Stock");

exports.getStockService = async (filters, queries) => {
  console.log(queries.fields);

  // { price: { $gt: 50 } }
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .select(queries.fields)
    .limit(queries.limit)
    .sort(queries.sortBy);

  const StockCount = await Stock.countDocuments(filters);
  const pageCount = Math.ceil(StockCount / queries.limit);

  return { StockCount, pageCount, stocks };
};

exports.createStockService = async (data) => {
  const Stock = await Stock.create(data);
  console.log(Stock);
  return Stock;
};

exports.updateStockService = async (StockId, data) => {
  console.log(data);

  const result = await Stock.updateOne(
    { _id: StockId },
    { $set: data },
    { runValidators: true }
  );

  return result;
};

exports.deleteStockByIdService = async (id) => {
  const result = await Stock.deleteOne({ _id: id });
  return result;
};
