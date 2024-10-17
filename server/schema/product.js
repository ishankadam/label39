const mongoose = require("mongoose");

// Define the schema
const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        if (typeof v === "string" || v instanceof String) {
          return false;
        }
      },
      message: "Value is not a  number",
    },
  },
  name: String,
  price: Number,
  description: String,
  sizes: Array,
  garmentDetails: Array,
  deliveryIn: Array,
});

// Create the model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
