// import multer from "multer";
import { v2 } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

import dotenv from "dotenv";

dotenv.config();

export default v2.config({
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
