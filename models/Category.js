const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Plase provide a category"],
      maxLength: 100,
      unique: true,
      lowercase: true,
    },
    description: String,
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please enter valid address"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
