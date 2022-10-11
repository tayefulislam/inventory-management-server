const {
  createCategoryService,

  getCatagoryByIDService,
  getCatagoriesService,
  updateCategoryByIdService,
} = require("../Services/category.services");

exports.createCatagory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created category",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Failed to create Category",
      error: error.message,
    });
  }
};

exports.getCatagoryByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getCatagoryByIDService(id);

    res.status(200).json({
      status: "success",
      message: "Successfully get category by ID",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Failed to get Category by Id",
      error: error.message,
    });
  }
};
exports.getCatagories = async (req, res, next) => {
  try {
    const result = await getCatagoriesService();

    res.status(200).json({
      status: "success",
      message: "Successfully get categories",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Failed to get categories",
      error: error.message,
    });
  }
};

exports.updateCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateCategoryByIdService(id, req.body);
    console.log(result);

    if (!result.modifiedCount) {
      res.status(400).json({
        status: "fail",
        message: "Failed to update Category by Id",
        error: error.message,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully update category by ID",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Failed to update Category by Id",
      error: error.message,
    });
  }
};
