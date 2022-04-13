import * as mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  file: {
    type: "string",
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
});

export default mongoose.model("about", aboutSchema);
