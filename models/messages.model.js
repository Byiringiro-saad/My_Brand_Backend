const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
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

module.exports = model("Message", messageSchema);
