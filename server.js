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
      {
        url: "https://my-brand-back.herokuapp.com/api",
        description: "heruko",
      },
    ],
  },
  apis: ["./routes.js"],
};

const specs = swaggerJSDoc(options);

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const addHeaders = (req, res, next) => {
  req.headers["content-type"] = "application/json";
  next();
};

app.use("/api", addHeaders, routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server has started!");
});

module.exports = app;
