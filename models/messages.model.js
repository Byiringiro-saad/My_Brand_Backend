import * as mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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

export default mongoose.model("Message", messageSchema);
