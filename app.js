const express =require("express");
const app =express();

const cors = require("cors");

const mongoose = require("mongoose");

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
            value:['kg,liter,pcs'],
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
            value:['in-stock','out-of-stock','delivered'],
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

})


app.get("/",(req,res)=>{
    res.send("Route is working");
})

module.exports=app;