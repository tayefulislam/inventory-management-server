const Product = require("../models/Products");




exports.getProductService = () => {
    // const getProduct = await Product.find({ $or: [{ _id: "633ae0d9796c99ae39ffcda0" }, { status: "in-stock1" }] });

        // const getProduct = await Product.find({ status: { $ne: "in-stock" } });
        // const getProduct = await Product.find({ unit: "kg" });
        // const getProduct = await Product.find({ name: { $in: ['chal','dal']} });
        // projection

        // const getProduct = await Product.find({}, '-name -quantity');
        // const getProduct = await Product.find({}).sort({quantity:1}).select({name:-1});

        // const getProduct = await Product.where('name').equals('chal').where("price").gt(99);

    const getProduct = Product.find({ status: "in-stock" });

    return getProduct;
    

}


exports.saveProductService = async (data) => {
    
    // // save  system
    const product = new Product(data);
    // intanace create => do some thing => save()  
    if (product.quantity == 0) {
        product.status = 'out-of-stock'
    }
    const result = await product.save();
    // create system
    // const result =await Product.create(req.body);

    return result;
    
}