import mongoose from "mongoose";
import { getDBURL } from "../helpers";

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

export { connectDB };
