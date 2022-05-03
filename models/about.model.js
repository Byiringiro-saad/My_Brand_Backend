const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema({
  file: {
    type: "string",
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("about", aboutSchema);
