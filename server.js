const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/portfolio", { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", routes);

    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });
