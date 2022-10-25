const { ObjectId } = require("mongodb");
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

exports.getStockByIdService = async (id) => {
  // console.log(id);
  // const result = await Stock.findOne({ _id: id })
  //   .populate("store.id")
  //   .populate("suppliedBy.id")
  //   .populate("brand.id");

  const result = await Stock.aggregate([
    { $match: { _id: ObjectId(id) } },
    {
      $project: {
        name: 1,
        productId: 1,

        category: 1,
        "brand.name": { $toLower: "$brand.name" },
      },
    },
    {
      $lookup: {
        from: "Brand", // collection name must be given here /ei khane collection name dite hobe
        localField: "brand.name",
        foreignField: "name", // collection match korar field ar name diete hobe
        as: "brandDetails",
      },
    },
  ]);
  return result;
};

exports.createStockService = async (data) => {
  const result = await Stock.create(data);
  console.log(result);
  return result;
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
