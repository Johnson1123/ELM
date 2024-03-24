import { NextFunction, Request, Response } from "express";
import { asyncError } from "../middleware/asyncCatchError";
import ErrorHandler from "../utils/errorHandler";
import NOTIFICATION from "../model/notification.model";
import cron from "node-cron";

export const getNotification = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NOTIFICATION.find().sort({ createdAt: -1 });
      res.status(200).json({
        status: "success",
        data: notification,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const updateNotification = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const notification = await NOTIFICATION.findById(id);

      if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      } else {
        notification.status = notification.status
          ? (notification.status = "read")
          : notification.status;
      }

      await notification.save();

      const resNotification = await NOTIFICATION.find().sort({ createdAt: -1 });

      res.status(200).json({
        status: "success",
        data: resNotification,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//
cron.schedule("0 0 0 * *", async () => {
  const time = new Date(Date.now() - 30 * 24 * 60 * 60 * 60);
  await NOTIFICATION.deleteMany({ status: "read", createdAt: { $lt: time } });
});
