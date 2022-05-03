const _ = require("lodash");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fileUpload = require("express-fileupload");

const routes = require("./routes.js");

require("./services/image.service.js");
require("./services/db.service");

const app = express();

const addHeaders = (req, res, next) => {
  req.headers["content-type"] = "application/json";
  next();
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(fileUpload({ useTempFiles: true }));
app.use("/api", addHeaders, routes);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My-Brand Website",
      version: "1.0.0",
      description: "Made with ❤️ by Byiringiro Saad",
      contact: {
        name: "Saad",
        email: "byiringirosaad@gmail.com",
      },
    },

    servers: [
      {
        url: "http://localhost:5000/api",
        description: "localhost",
      },
    ],
  },
  apis: ["./routes.js"],
};

const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(5000, () => {
  console.log("Server has started!");
});

module.exports = app;
