const mongoose = require("mongoose");

const giftCardSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unqiue: true,
  },
  transactions: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
});

//create mode
const Giftcard = mongoose.model("Giftcard", giftCardSchema);

module.exports = Giftcard;
