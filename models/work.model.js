const { Schema, model } = require("mongoose");

const workSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cards: {
    type: [String],
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = model("Work", workSchema);
