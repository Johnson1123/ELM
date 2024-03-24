require("dotenv").config();
import { IUSER } from "../model/user";
import { redis } from "./redis";
import { Response } from "express";
import { access_TokenOptions, refresh_TokenOptions } from "./tokenOptions";

const signToken = async (user: IUSER, statusCode: number, res: Response) => {
  const access_Token = await user.signAccessToken();
  const refress_token = await user.signRefreshToken();
  await redis.set(user._id, JSON.stringify(user) as any);

  if (process.env.NODE_ENVIRONMENT === "production") {
    access_TokenOptions.secure = true;
  }

  res.cookie("access_token", access_Token, access_TokenOptions);
  res.cookie("refresh_token", refress_token, refresh_TokenOptions);

  res.status(statusCode || 200).json({
    status: "success",
    user,
    access_Token,
  });
};

export default signToken;
