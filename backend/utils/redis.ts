require("dotenv").config();
import { Redis } from "ioredis";

const redisCLient = () => {
  if (process.env.REDIS_URL) {
    console.log("connected");
    return process.env.REDIS_URL;
  }
  throw new Error("Redis connection failed");
};

export const redis = new Redis(redisCLient());
