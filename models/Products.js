const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

// schema design

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plase enter a name"],
      trim: true,
      unique: [true, "name must be unique"],
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
        // validate: {
        //   validator: (value) => {
        //     if (!Array.isArray(value)) {
        //       return false;
        //     }

        //     let isValid = true;
        //     value.forEach((url) => {
        //       if (!validator.isURL(url)) {
        //         isValid = false;
        //       }
        //     });
        //     return isValid;
        //   },
        //   message: "Plase privede valid image url",
        // },
      },
    ],

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "pcs", "liter", "bug"],
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

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
