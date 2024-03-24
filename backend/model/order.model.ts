import { timeStamp } from "console";
import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";

export interface IORDER extends Document {
  courseId: string;
  userId: string;
  payment_info: object;
}

const IORDERSCHEMA = new mongoose.Schema<IORDER>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Object,
    },
  },
  { timestamps: true }
);

const OrderModel: Model<IORDER> = mongoose.model("OrderModel", IORDERSCHEMA);

export default OrderModel;
