const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // To ensure the strings you save through the schema are properly trimmed
    },
    slug: {
      // unique identifier
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      // With the help of this it we will store the category
      // we will convert type into a string so we can put it manually
      //type: mongoose.Schema.Types.ObjectId,
      //ref: "Category",
      type: String,
      required: true,
    },
    brand: {
      type: String,
      //enum: ["Apple", "Samsung", "Lenovo"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
      // to hide sold from user
      // select: false,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      //enum: ["Black", "Brown", "Red"], // The enum validator is an array that will check if the value given is an item in the array
      required: true,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
