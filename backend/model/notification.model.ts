import { Mode } from "fs";
import mongoose from "mongoose";
import { Model, Schema, Document } from "mongoose";

export interface INOTIFICATION {
  title: string;
  message: string;
  status: string;
  userId: string;
}

const NotificationSchema = new Schema<INOTIFICATION>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NOTIFICATION: Model<INOTIFICATION> = mongoose.model(
  "NOTIFICATION",
  NotificationSchema
);

export default NOTIFICATION;
