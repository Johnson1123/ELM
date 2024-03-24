import express from "express";

import isAuth from "../middleware/isAuth";
import {
  createOrder,
  createPayment,
  getPublishableKey,
} from "../controller/order.controller";

const orderRoutes = express.Router();
orderRoutes.post("/create-order", isAuth, createOrder);
orderRoutes.get("/get-publishablekey", getPublishableKey);
orderRoutes.post("/create-payment", createPayment);

export default orderRoutes;
