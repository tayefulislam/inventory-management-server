const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const BrandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "Name must be unique"],
      lowercase: true,
      maxLength: 120,
    },
    description: String,
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    website: {
      type: String,
      validate: [validator.isURL, "please enter a valid url"],
    },
    location: String,
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    supplier: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", BrandSchema, "Brand");

module.exports = Brand;
