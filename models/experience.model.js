import * as mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  current: {
    type: Boolean,
    required: true,
  },
  content: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Experience", experienceSchema);
