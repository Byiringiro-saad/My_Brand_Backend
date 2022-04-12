const { Schema, model } = require("mongoose");

const aboutSchema = new Schema({
  file: {
    type: "string",
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
});

module.exports = model("about", aboutSchema);
