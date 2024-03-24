import { NextFunction, Request, Response } from "express";
import { asyncError } from "../middleware/asyncCatchError";
import { IORDER } from "../model/order.model";
import ErrorHandler from "../utils/errorHandler";
import CourseModel from "../model/course";
import path from "path";
import ejs from "ejs";
import { sendMail } from "../utils/sendMail";
import NOTIFICATION from "../model/notification.model";
import { redis } from "../utils/redis";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createOrder = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IORDER;
      if (payment_info) {
        if ("id" in payment_info) {
          const paymentId = payment_info.id;
          const paymentRetrieve = await stripe.paymentIntents.retrieve(
            paymentId
          );
          if (paymentRetrieve.status !== "succeeded") {
            return next(new ErrorHandler("Payment not authorized", 400));
          }
        }
      }
      const user = req?.user;
      const courseExist = user?.courses.some(
        (item: any) => item._id === courseId
      );

      if (courseExist) {
        return next(
          new ErrorHandler("You have already purchase this course", 400)
        );
      }

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const mailData: any = {
        courseId: courseId.slice(0, 10),
        name: course.name,
        price: course.price,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-mails.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order comfirmation",
            template: "order-mails.ejs",
            data: mailData,
          });
        }
        user?.courses.push(course._id);

        course.purchase = course.purchase
          ? (course.purchase += 1)
          : course.purchase;

        await redis.set(user?.id, JSON.stringify(user));
        course?.save();

        createOrder(data, res, next);

        await NOTIFICATION.create({
          title: "You have new Order",
          userId: user?._id,
          message: `new order have been place on ${course.name}`,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

const getPublishableKey = asyncError(async (req: Request, res: Response) => {
  res.status(200).json({
    publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

const createPayment = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        metadata: {
          description: "Course Payment",
          company: "IconmiumTech",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(200).json({
        success: true,
        client_secret: payment.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export { createOrder, getPublishableKey, createPayment };
