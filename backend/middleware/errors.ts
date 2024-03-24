import ErrorHandler from "../utils/errorHandler";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  (err.statusCode = err.statusCode || 500),
    (err.message = err.message || "Internal Server Error");

  if (err.statusCode == 1100) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "CastError") {
    const message = `Rousource not found, ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is not valid, try again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = "Json web token Expired, try again";
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    status: "failed",
    message: err.message,
  });
};
