import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import _ from "lodash";

import routes from "./routes.js";

mongoose
  .connect("mongodb://localhost:27017/portfolio", { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(
      fileUpload({
        createParentPath: true,
      })
    );
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use("/api", routes);

    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });
