import { NextFunction, Response } from "express";
import CourseModel from "../model/course";
import ErrorHandler from "../utils/errorHandler";
import { asyncError } from "../middleware/asyncCatchError";
import userModel from "../model/user";

export const createCourseService = asyncError(
  async (data: any, res: Response, next: NextFunction) => {
    try {
      const course = await CourseModel.create({ ...data });
      res.status(201).json({
        status: "success",
        data: course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getSingleCouserService = asyncError(
  async (data: any, res: Response, next: NextFunction) => {
    try {
      const course = await CourseModel.findOne({});
      res.status(200).json({
        status: "success",
        data: course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getAllUser = asyncError(async (res: Response) => {
  const courses = await userModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    data: courses,
  });
});
