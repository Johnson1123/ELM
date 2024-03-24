import express from "express";
import {
  getCourseAnalytics,
  getOrderAnalytics,
  getUserAnalytics,
} from "../controller/analytics.controller";
const analyticRoutes = express.Router();

analyticRoutes.get("/get-user-analytics", getUserAnalytics);
analyticRoutes.get("/get-course-analytics", getCourseAnalytics);
analyticRoutes.get("/get-order-analytics", getOrderAnalytics);

export default analyticRoutes;
