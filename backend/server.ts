import { app } from "./app";
import { connectDB } from "./utils/db";
require("dotenv").config();
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { getDBURL } from "./helpers";

// cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server connected at ${process.env.NODE_PORT}`);

  const dbUrl: string = getDBURL() || "";

  const connectDB = async () => {
    try {
      await mongoose.connect(dbUrl).then((data: any) => {
        console.log(`Server connected on ${data.connection.host}`);
      });
    } catch (error: any) {
      console.log(error.message);
      setTimeout(connectDB, 500);
    }
  };
  connectDB();
});
