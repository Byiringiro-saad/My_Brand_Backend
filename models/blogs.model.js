const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
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
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: 0,
  },
  comments: {
    type: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        addedAt: Date,
      },
    ],
  },
  createdAt: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Blog", blogSchema);
