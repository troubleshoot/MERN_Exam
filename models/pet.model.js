const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "{PATH} is required."],
    minlength: [3, "{PATH} must be a least {MINLENGTH} characters"],
  },
  type: {
    type: String,
    required: [true, "{PATH} is required."],
    minlength: [3, "{PATH} must be a least {MINLENGTH} characters"],
  },
  description: {
    type: String,
    required: [true, "{PATH} is required."],
    minlength: [3, "{PATH} must be a least {MINLENGTH} characters"],
  },
  skillOne: {
    type: String,
    default: "N/A",
  },
  skillTwo: {
    type: String,
    default: "N/A",
  },
  skillThree: {
    type: String,
    default: "N/A",
  },
}, {
  timestamps: true
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;