const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  replied: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
