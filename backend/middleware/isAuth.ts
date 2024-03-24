import { NextFunction, Request, Response } from "express";
import { asyncError } from "./asyncCatchError";
import ErrorHandler from "../utils/errorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

const isAuth = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    if (!access_token) {
      return next(new ErrorHandler("Authorization fail, please login", 401));
    }
    const verifyToken = (await jwt.verify(
      access_token,
      process.env.ACCESS_tOKEN as string
    )) as JwtPayload;
    if (!verifyToken) {
      return next(new ErrorHandler("Invalid token, please login", 401));
    }
    const user = await redis.get(verifyToken._id);

    if (!user) {
      return next(new ErrorHandler("Your session have expired", 400));
    }
    req.user = JSON.parse(user);
    next();
  }
);

export default isAuth;

export const roleAuth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler("Access denied, only admin have access", 403)
      );
    }
    next();
  };
};
