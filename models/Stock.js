const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

// schema design

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "Plase enter a name"],
      trim: true,
      // unique: [true, "name must be unique"],
      lowercase: true,
      minLength: [3, "enter more than 3 characters"],
      maxLength: [100, "enter less than 100 characters"],
    },
    description: {
      type: String,
      required: true,
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: [validator.isURL, "Please privied valid url"],
      },
    ],

    price: {
      type: Number,
      required: true,
      min: [0, "Product Price can't be nagative"],
    },

    quantity: {
      type: Number,
      required: true,
      min: [0, "Product Quantity can't be nagative"],
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "pcs", "liter", "bag"],
        message: `Unit value can't be {VALUE} ,must be kg/liter/pcs`,
      },
    },

    category: {
      type: String,
      required: true,
    },
    brand: {
      name: { type: String, required: true },
      id: { type: ObjectId, ref: "Brand", required: true },
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },

    store: {
      name: {
        type: String,
        trim: true,
        lowercase: true,
        maxLength: 120,
        require: [true, "Please provide a store name"],
        enum: {
          values: ["dhaka", "chattogram", "khulna", "barishal"],
          message: "{VALUE} is not valid name",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },

    suppliedBy: {
      name: {
        type: String,
        trim: true,
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },

    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data : pre/post

// productSchema.pre('save',function(next){
//     console.log("before save data");
//     console.log(this)

//     if(this.quantity ==0){
//     this.status =='out-of-stock'
//     }

//     next();
// });

// productSchema.post('save',function(doc,next){
// console.log("after save data");
// next();
// })

// productSchema.methods.logger=function(){
//     console.log(`Data save ${this.name}`);
// };

// SCHEMA => MODEL => QUERY

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
