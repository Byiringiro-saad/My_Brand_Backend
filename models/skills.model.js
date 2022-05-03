const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  skills: {
    type: [
      {
        name: String,
        percent: String,
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("Skill", skillSchema);
