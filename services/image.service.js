// import multer from "multer";
const { v2 } = require("cloudinary");
// import { CloudinaryStorage } from "multer-storage-cloudinary";

const dotenv = require("dotenv");

dotenv.config();

module.exports = v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// const storage = new CloudinaryStorage({
//   cloudinary: v2,
//   folder: "portfolio",
//   allowedFormats: ["jpg", "png", "jpeg"],
//   transformation: [{ width: 500, height: 500, crop: "limit" }],
// });

// const upload = multer({ storage: storage });

// export default upload;
