const Product = require("../models/Products");
const {
  saveProductService,
  getProductService,
  updateProductService,
  blukUpdateProductService,
  deleteProductByIdService,
  blukDeleteProductByIdsService,
  insertBlukProductService,
} = require("../Services/product.services");

exports.saveProduct = async (req, res, next) => {
  try {
    /*  // // save  system

        const product = new Product(req.body);


        

        // intanace create => do some thing => save()

        
        if (product.quantity == 0) {
            product.status = 'out-of-stock'
        }
        const result = await product.save();
        // create system
        // const result =await Product.create(req.body); 
        */
    // use services system
    const result = await saveProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "Product internted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Product is not insetred",
      error: error.message,
    });
  }
};

exports.blukProductInsert = async (req, res, next) => {
  try {
    const result = await insertBlukProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "Items inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Product is not insetred",
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    // const getProduct = await Product.find({ $or: [{ _id: "633ae0d9796c99ae39ffcda0" }, { status: "in-stock1" }] });

    // const getProduct = await Product.find({ status: { $ne: "in-stock" } });
    // const getProduct = await Product.find({ unit: "kg" });
    // const getProduct = await Product.find({ name: { $in: ['chal','dal']} });
    // projection

    // const getProduct = await Product.find({}, '-name -quantity');
    // const getProduct = await Product.find({}).sort({quantity:1}).select({name:-1});

    // const getProduct = await Product.where('name').equals('chal').where("price").gt(99);

    /// filtering

    console.log(req.query);

    let filters = { ...req.query };
    const excludedFields = ["sort", "page", "limit"];
    excludedFields.forEach((field) => {
      // console.log(field);
      delete filters[field];
    });

    // console.log(req.query);
    // console.log(filters);

    // gt ,lt,gte,lte

    //  { price: { $gt: 50 } }

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
      const { page = 0, limit = 10 } = req.query;
      console.log(page, limit);

      const skip = (page - 1) * parseInt(limit);
      console.log(skip);
      queries.skip = skip;
      queries.limit = limit;
    }

    const getProduct = await getProductService(filters, queries);

    res.status(200).json(getProduct);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Did not get data",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await updateProductService(id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't updaate",
      error: error.message,
    });
  }
};

exports.blukProductUpdate = async (req, res, next) => {
  console.log(req.body);

  try {
    const result = await blukUpdateProductService(req.body);
    res.status(200).json({
      status: "success",
      message: "bluk update successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "could not bluk update successful",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductByIdService(id);

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

exports.blukDeleteProductByIds = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await blukDeleteProductByIdsService(req.body.ids);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "failed",
        message: `Total Item :${req?.body?.ids?.length || 0} ,Delete Item ${
          result.deletedCount
        }, Not delete  ${req?.body?.ids?.length || 0 - result.deletedCount}`,
        data: result,
      });
    }

    res.status(200).json({
      status: "success",
      message: `Total Item :${req?.body?.ids?.length || 0} ,Delete Item ${
        result.deletedCount
      }, ${
        !result.deletedCount &&
        `Not delete  ${req?.body?.ids?.length || 0 - result.deletedCount}`
      }`,
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
