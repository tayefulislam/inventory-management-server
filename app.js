const express =require("express");
const app =express();

const cors = require("cors");

const mongoose = require("mongoose");
const { json } = require("express");

// middle ware 
app.use(express.json());
app.use(cors());



// routes
const productRoute = require('./routes/product.route');



app.get("/",(req,res)=>{
    res.send("Route is working");
})


// add new product
app.use('/api/v1/product',productRoute);



module.exports=app;