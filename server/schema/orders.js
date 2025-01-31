const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  checkoutData: Object,
  paymentInfo: Object,
  cartItems: Array,
  status: {
    type: String,
    default: "placed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
