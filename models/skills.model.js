const { Schema, model } = require("mongoose");

const skillSchema = new Schema({
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

module.exports = model("Skill", skillSchema);
