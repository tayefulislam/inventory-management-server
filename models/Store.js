const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const StoreSchema = mongoose.Schema(
  {
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
    description: String,

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;
