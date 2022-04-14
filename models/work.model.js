import mongoose from "mongoose";

const workSchema = mongoose.Schema({
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

export default mongoose.model("Work", workSchema);
