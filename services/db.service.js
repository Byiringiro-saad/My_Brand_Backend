const mongoose = require("mongoose");

module.exports = mongoose
  .connect("mongodb://localhost:27017/portfolio", { useNewUrlParser: true })
  .then(() => {
    console.log("database connected");
  });
