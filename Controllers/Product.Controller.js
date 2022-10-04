
const Product = require("../models/Products");
const { saveProductService, getProductService, updateProductService, blukUpdateProductService } = require("../Services/product.services");

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
     const result =await saveProductService(req.body)

     
        res.status(200).json({
            status: 'success',
            message: "Product internted successfully",
            data: result
     
        });

    } catch (error) {

        res.status(400).json({
            status: 'failed',
            message: "Product is not insetred",
            error: error.message,
        })

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

        const getProduct =await getProductService();

        
        res.status(200).json(getProduct);
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Did not get data",
            error: error.message,
            
        })
    }
    
};


exports.updateProduct = async (req, res, next) => {
    try { 
        const { id } = req.params;

        const result = await updateProductService(id, req.body);
        res.status(200).json(result);
    }


    
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could't updaate",
            error:error.message,
        })
    }
}


exports.blukProductUpdate = async (req, res, next) => {
    console.log(req.body)
    
    try {

        const result = await blukUpdateProductService(req.body);
        res.status(200).json({
            status: "success",
            message:"bluk update successful"
        })
     }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: "could not bluk update successful",
            error:error.message
        })
        
    }
}