import { NextFunction, Request, Response } from "express";
import { asyncError } from "../middleware/asyncCatchError";
import ErrorHandler from "../utils/errorHandler";
import { generateLast12MonthData } from "../utils/analytic.generate";
import userModel from "../model/user";
import CourseModel from "../model/course";
import OrderModel from "../model/order.model";

export const getUserAnalytics = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await generateLast12MonthData(userModel);

      res.status(200).json({
        success: true,
        message: "data fetched successfully",
        data,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getCourseAnalytics = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await generateLast12MonthData(CourseModel);
      res.status(200).json({
        success: true,
        message: "data fetched successfully",
        data,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
export const getOrderAnalytics = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await generateLast12MonthData(OrderModel);
      res.status(200).json({
        success: true,
        message: "data fetched successfully",
        data,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
