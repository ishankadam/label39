const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // Unique discount code
  description: { type: String }, // Description of the discount
  discountType: {
    type: String,
    required: true,
  }, // Type of discount
  value: { type: Number, required: true }, // Discount value (percentage or fixed amount)
  expiresAt: { type: Date }, // Expiration date
  usageLimit: { type: Number, default: null }, // Limit of times a code can be used
  usedCount: { type: Number, default: 0 }, // Number of times used
  onlyForNewUsers: { type: Boolean, default: false }, // If true, only new users can use it
});

module.exports = mongoose.model("Discount", discountSchema);
