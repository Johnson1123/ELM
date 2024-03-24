import { app } from "./app";
import { connectDB } from "./utils/db";
require("dotenv").config();
import { v2 as cloudinary } from "cloudinary";

// cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server connected at ${process.env.NODE_PORT}`);
  connectDB();
});
