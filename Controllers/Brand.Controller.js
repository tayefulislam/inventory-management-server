const {
  brandCreateService,
  getBrandsService,
  getBrandByIDService,
  updateBrandByIDService,
} = require("../Services/brand.services");

exports.brandCreate = async (req, res, next) => {
  try {
    const createdNewBrand = await brandCreateService(req.body);
    res.status(200).json({
      status: "success",
      message: "create new brand",
      result: createdNewBrand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "could't create new brand",
      error: error.message,
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const getBrands = await getBrandsService(req.body);
    res.status(200).json({
      status: "success",
      message: "data get succuss",
      result: getBrands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "could't get brand data",
      error: error.message,
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandByIDService(id);

    if (!brand) {
      res.status(400).json({
        status: "fail",
        message: "could't get brand data",
        error: error.message,
      });
    }
    res.status(200).json({
      status: "success",
      message: "data get succuss",
      result: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "could't get brand data",
      error: error.message,
    });
  }
};

exports.updateBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await updateBrandByIDService(id, req.body);
    console.log(brand);

    if (!brand.modifiedCount) {
      res.status(400).json({
        status: "fail",
        message: "could not update the data",
        error: error.message,
      });
    }
    res.status(200).json({
      status: "success",
      message: "update succesful succuss",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "could't update brand data",
      error: error.message,
    });
  }
};
