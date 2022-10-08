const { ObjectId } = require("mongodb");
const Product = require("../models/Products");

/*
exports.getProductService = (query) => {
    console.log(query);
    // const getProduct = await Product.find({ $or: [{ _id: "633ae0d9796c99ae39ffcda0" }, { status: "in-stock1" }] });

        // const getProduct = await Product.find({ status: { $ne: "in-stock" } });
        // const getProduct = await Product.find({ unit: "kg" });
        // const getProduct = await Product.find({ name: { $in: ['chal','dal']} });
        // projection

        // const getProduct = await Product.find({}, '-name -quantity');
        // const getProduct = await Product.find({}).sort({quantity:1}).select({name:-1});

        // const getProduct = await Product.where('name').equals('chal').where("price").gt(99);
    
    const filters = { ...query };

    const excludedFields = ["sort", "page", "limit"];

    excludedFields.forEach(field => {
        // console.log(field);
        delete filters[field]
    });

    console.log(query);
    console.log(filters);


    const getProduct = Product.find(filters);

    return getProduct;
    

}

*/

exports.getProductService = async (filters, queries) => {
  console.log(queries.fields);

  // { price: { $gt: 50 } }
  const getProduct = await Product.find(filters)
    .skip(queries.skip)
    .select(queries.fields)
    .limit(queries.limit)
    .sort(queries.sortBy);

  const productCount = await Product.countDocuments(filters);
  const pageCount = Math.ceil(productCount / queries.limit);

  return { productCount, pageCount, getProduct };
};

exports.saveProductService = async (data) => {
  // // save  system
  const product = new Product(data);
  // intanace create => do some thing => save()
  if (product.quantity == 0) {
    product.status = "out-of-stock";
  }
  const result = await product.save();
  // create system
  // const result =await Product.create(req.body);

  return result;
};

exports.insertBlukProductService = async (data) => {
  const result = await Product.insertMany(data);
  return result;
};

exports.updateProductService = async (productId, data) => {
  console.log(data);

  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  );

  // const product =await Product.findById(productId);
  // const result = await product.set({data}).save();
  // console.log(result)

  return result;
};

exports.blukUpdateProductService = async (data) => {
  // const result = await Product.updateMany({ _id: data.ids }, data.data, { runValidators: true });

  const products = [];

  data.products.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  console.log(products);

  const result = await Promise.all(products);
  console.log(result);

  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.blukDeleteProductByIdsService = async (ids) => {
  // const result = await Product.deleteMany({ _id: ids });
  const result = await Product.deleteMany();
  console.log(result);
  return result;
};
