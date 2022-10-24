const {
  getStockService,
  createStockService,

  updateStockService,
  deleteStockByIdService,
} = require("../Services/stock.services");

exports.getStocks = async (req, res, next) => {
  try {
    console.log(req.query);

    let filters = { ...req.query };
    const excludedFields = ["sort", "page", "limit"];
    excludedFields.forEach((field) => {
      // console.log(field);
      delete filters[field];
    });

    let filterString = JSON.stringify(filters);
    console.log(filterString);
    filterString = filterString.replace(
      /\b(gt|lt|gte|lte)\b/g,
      (match) => `$${match}`
    );
    console.log(JSON.parse(filterString));

    filters = JSON.parse(filterString);

    // all queries
    const queries = {};

    // sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      //   console.log(sortBy);
    }

    // selete fields

    if (req.query.fields) {
      console.log(req.query);
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    // skip ang limit

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      console.log(page, limit);

      const skip = (page - 1) * parseInt(limit);
      console.log(skip);
      queries.skip = skip;
      queries.limit = limit;
    }

    const getStock = await getStockService(filters, queries);

    res.status(200).json(getStock);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Did not get data",
      error: error.message,
    });
  }
};

exports.createStock = async (req, res, next) => {
  try {
    const result = await createStockService(req.body);

    res.status(200).json({
      status: "success",
      message: "Stock created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Stock is not created",
      error: error.message,
    });
  }
};

exports.updateStock = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await updateStockService(id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't updaate",
      error: error.message,
    });
  }
};

exports.deleteStockById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteStockByIdService(id);

    res.status(200).json({
      status: "success",
      message: "DELETE SUCCESSFUL",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "DELETE ACTION NOT SUCCESSFUL",
      error: error.message,
    });
  }
};
