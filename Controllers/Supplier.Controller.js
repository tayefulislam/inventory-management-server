const {
  createSupplierService,
  getSuppliersService,
  getSupplierByIDService,
  updateSupplierByIdService,
} = require("../Services/supplier.services");

exports.supplierCreate = async (req, res, next) => {
  try {
    const createdNewSupplier = await createSupplierService(req.body);
    res.status(200).json({
      status: "success",
      message: "create new supplier",
      result: createdNewSupplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "could't create new supplier",
      error: error.message,
    });
  }
};

exports.getSuppliers = async (req, res, next) => {
  try {
    const getSuppliers = await getSuppliersService(req.body);
    res.status(200).json({
      status: "success",
      message: "data get succuss",
      result: getSuppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "could't get supplier data",
      error: error.message,
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await getSupplierByIDService(id);

    if (!supplier) {
      res.status(400).json({
        status: "fail",
        message: "could't get supplier data",
        error: error.message,
      });
    }
    res.status(200).json({
      status: "success",
      message: "data get succuss",
      result: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "could't get supplier data",
      error: error.message,
    });
  }
};

exports.updateSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await updateSupplierByIdService(id, req.body);
    console.log(supplier);

    if (!supplier.modifiedCount) {
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
      message: "could't update supplier data",
      error: error.message,
    });
  }
};
