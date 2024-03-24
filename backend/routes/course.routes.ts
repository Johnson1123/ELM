import express from "express";
import {
  createCourse,
  editCourse,
  getAllCourses,
  getCourseContent,
  getSingleCourse,
  getVideoUrl,
} from "../controller/course.controller";
import isAuth, { roleAuth } from "../middleware/isAuth";
import { updateAccessToken } from "../controller/user";

const courseRoute = express.Router();
courseRoute.post("/create-course", createCourse);
// isAuth, roleAuth("admin"),
courseRoute.post(
  "/edit-course",
  updateAccessToken,
  isAuth,
  roleAuth("admin"),
  editCourse
);
courseRoute.post("/getCourseUrlOtp", getVideoUrl);
courseRoute.get("/get-all-courses", getAllCourses);
courseRoute.get("/get-course/:id", getSingleCourse);
courseRoute.get("/get-course-content/:id", getCourseContent);

export default courseRoute;
