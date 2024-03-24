import { NextFunction, Response } from "express";
import OrderModel from "../model/order.model";
import { asyncError } from "../middleware/asyncCatchError";

export const createOrder = asyncError(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await OrderModel.create(data);
    res.status(201).json({
      status: "success",
      data: order,
    });
  }
);

export const getAllOrder = asyncError(async (res: Response) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    data: orders,
  });
});
