const mongoose = require("mongoose");

module.exports = mongoose
  .connect(
    "mongodb+srv://saad:hLoohkt0tfgRk5CZ@cluster0.c4fnv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("database connected");
  });
