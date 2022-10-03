const express =require("express");
const app =express();

const cors = require("cors");

const mongoose = require("mongoose");
const { json } = require("express");

// middle ware 
app.use(express.json());
app.use(cors());


// schema design 

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Plase enter a name"],
        trim:true,
        unique:[true,'name must be unique'],
        minLength:[3,'enter more than 3 characters'],
        maxLength:[100,'enter less than 100 characters'],

    },
    description:{
        type:String,
        required:true
    },
    price:{type:Number,
        required:true,
        min:[0,"Price can't be a nagative number"]},
    unit:{
        type:String,
        required:true,
        enum:{
            values:['kg','pcs','liter'],
            message:`Unit value can't be {VALUE} ,must be kg/liter/pcs`,
        }
    },
    quantity:{
        type:Number,
        required:true,
        min:[0,"Qunatity can not be less then 0"],
        validate:{
            validator:(value)=>{

                const isInteger = Number.isInteger(value);
                if(isInteger){
                    return true;
                }else{
                    return false;
                }

            }
        },
        message:"Quantity must be integer",

    },
    status:{
        type:String,
        enum:{
            values:['in-stock','out-of-stock','delivered'],
            message:"Status can be {VALUE} ",
        }
    },

    // createdAt:{
    //     type:Date,
    //     default:Date.now,     
    // },
    // updatedAt:{
    //     type:Date,
    //     default:Date.now,
    // },
   supplier:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Supplier",
   },

   categories:[{
    name:{
        type:String,
        required:true,
    },
    _id:mongoose.Schema.Types.ObjectId,
   }]


},{
    timestamps:true,

});


// mongoose middleware for saving data : pre/post

productSchema.pre('save',function(next){
    console.log("before save data");
    console.log(this)

    if(this.quantity ==0){
    this.status =='out-of-stock'
    }

    next();
});


// productSchema.post('save',function(doc,next){
// console.log("after save data");
// next();
// })


productSchema.methods.logger=function(){
    console.log(`Data save ${this.name}`);
};



// SCHEMA => MODEL => QUERY

const Product = mongoose.model('Product', productSchema);





app.get("/",(req,res)=>{
    res.send("Route is working");
})


// add new product
app.post('/api/v1/product',async(req,res,next)=>{


    try{

        // // save  system

        const product = new Product(req.body);


        

        // intanace create => do some thing => save()

        
        if(product.quantity==0){
            product.status='out-of-stock'
        }
        const result=await product.save();
        // create system
        // const result =await Product.create(req.body);


     
         res.status(200).json({
             status:'success',
             message:"Product internted successfully",
             data:result
     
         });

    }catch(error){

res.status(400).json({
    status:'failed',
    message:"Product is not insetred",
    error:error.message,
})

    }
   
   
});

// get product

app.get('/api/v1/product',async(req,res,next)=>{
    try {

        // const getProduct = await Product.find({ $or: [{ _id: "633ae0d9796c99ae39ffcda0" }, { status: "in-stock1" }] });
        // const getProduct = await Product.find({ status: { $ne: "in-stock" } });
        // const getProduct = await Product.find({ unit: "kg" });
        // const getProduct = await Product.find({ name: { $in: ['chal','dal']} });
        // projection

        // const getProduct = await Product.find({}, '-name -quantity');
        // const getProduct = await Product.find({}).sort({quantity:1}).select({name:-1});

        // const getProduct = await Product.where('name').equals('chal').where("price").gt(99);

        
        res.status(200).json(getProduct);
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Did not get data",
            error:error.message,
            
        })
    }
    
})

module.exports=app;