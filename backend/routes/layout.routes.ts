import express from "express";
import {
  editLayout,
  getLayout,
  insertLayout,
} from "../controller/layout.controller";
import { updateAccessToken } from "../controller/user";
import isAuth, { roleAuth } from "../middleware/isAuth";

const layoutRoutes = express.Router();
layoutRoutes.post(
  "/insert-layout",
  updateAccessToken,
  isAuth,
  roleAuth("admin"),
  insertLayout
);
layoutRoutes.put(
  "/edit-layout",
  updateAccessToken,
  isAuth,
  roleAuth("admin"),
  editLayout
);
layoutRoutes.get("/get-layout/:type", getLayout);

export default layoutRoutes;
