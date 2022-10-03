const mongoose =  require("mongoose");
require('dotenv').config();
const app = require("./app");


// server
const port = process.env.PORT || 5000;
const uri = process.env.URI||process.env.LOCAL; // hello


//database connection
mongoose.connect(`${uri}`).then(()=>{
    console.log("database connect successful");
})

// server

app.listen(port,()=>{
    console.log(`App is runnig at ${port}`);
})


