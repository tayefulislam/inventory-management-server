exports.brandCreate = async (req, res, next) => {
  try {
    const createdNewBrand = await createBrand(req.body);
    res.status(200).json({
      status: "fail",
      message: "create new brand",
      result: createdNewBrand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "could't create new brand",
    });
  }
};
