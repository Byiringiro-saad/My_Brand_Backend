const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
  file: {
    type: String,
    requierd: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [
      {
        name: String,
        comment: String,
      },
    ],
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = model("Blog", blogSchema);
