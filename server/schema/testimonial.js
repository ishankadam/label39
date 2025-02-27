const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  testimonialId: {
    type: Number,
    unique: true, // Ensures testimonialId is unique
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
module.exports = Testimonial;
