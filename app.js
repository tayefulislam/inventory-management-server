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


// SCHEMA => MODEL => QUERY

const Product=mongoose.model('Product',productSchema);


app.get("/",(req,res)=>{
    res.send("Route is working");
})



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
   
   
})

module.exports=app;