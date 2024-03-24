import { NextFunction, Request, Response } from "express";
import { asyncError } from "../middleware/asyncCatchError";
import ErrorHandler from "../utils/errorHandler";
import { v2 as cloudinary } from "cloudinary";
import { createCourseService } from "../services/course.services";
import CourseModel from "../model/course";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import { sendMail } from "../utils/sendMail";
import NOTIFICATION from "../model/notification.model";
import axios from "axios";

// create course
export const createCourse = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data.thumbnail;

      if (thumbnail) {
        const myCloud = await cloudinary.uploader.upload(thumbnail, {
          folder: "thumbnail",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
          tags: myCloud.tags,
        };
      }
      console.log(data.thumbnail);
      createCourseService(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
// edit course

export const editCourse = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data.thumbnail;

      if (thumbnail) {
        await cloudinary.uploader.destroy(thumbnail.public_id);

        const myCloud = await cloudinary.uploader.upload(thumbnail, {
          folder: "thumbnail",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const courseID = req.params.id;

      const newCourse = await CourseModel.findByIdAndUpdate(
        courseID,
        {
          $set: data,
        },
        {
          new: true,
        }
      );

      res.status(201).json({
        statu: "success",
        data: newCourse,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get single course

export const getSingleCourse = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseID = req.params.id;
      const id = JSON.stringify(courseID);

      const cachedVideo = await redis.get(id);

      if (cachedVideo) {
        const course = JSON.parse(cachedVideo);
        res.status(200).json({
          status: "success",
          data: cachedVideo,
        });
      } else {
        const dataVideo = await CourseModel.findById(courseID).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );
        await redis.set(id, JSON.stringify(dataVideo), "EX", 604800);
        res.status(200).json({
          status: "success",
          data: dataVideo,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// const sellect all courses
export const getAllCourses = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await CourseModel.find().select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      );
      return res.status(200).json({
        status: "success",
        data: courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get course content

export const getCourseContent = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseList = req.user?.courses;
      const courseID = req.params.id;

      // const findCourse = courseList?.find(
      //   (course: any) => course._id.toString() === courseID
      // );

      // if (!findCourse) {
      //   return next(
      //     new ErrorHandler("You have not subcribe for this course", 400)
      //   );
      // }

      const course = await CourseModel.findById(courseID);
      const courseContent = course?.courseData;

      res.status(200).json({
        status: "success",
        data: courseContent,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// add question to course

interface IQUESTION {
  courseId: string;
  contentId: string;
  question: string;
}
export const addQuestion = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, contentId, question }: IQUESTION = req.body;

      if (courseId == "" || contentId === "" || question === "") {
        return next(new ErrorHandler("All data must be sent", 400));
      }

      const course = await CourseModel.findById(contentId);

      if (!course) {
        return next(new ErrorHandler("Invalid course", 400));
      }

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid course data", 400));
      }

      const courseData = course.courseData?.find((item: any) =>
        item._id.equals()
      );
      const newQuestion: any = {
        user: req?.user,
        question,
        questionRelies: [],
      };

      courseData?.questions.push(newQuestion);

      await course?.save();

      await NOTIFICATION.create({
        title: "New question recieved",
        userId: req.user?._id,
        message: `new order have been place on ${courseData?.title}`,
      });

      res.status(201).json({
        status: "success",
        data: course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// const add add replies
interface IADDANSWER {
  courseId: string;
  contentId: string;
  anwser: string;
  questionId: string;
}
export const addAnwser = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, contentId, anwser, questionId }: IADDANSWER = req.body;

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Invalid course", 400));
      }

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid course data", 400));
      }

      const courseContent = course?.courseData.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("Invalid course data id", 400));
      }
      const question = courseContent?.questions.find((item: any) =>
        item._id.equals(questionId)
      );

      if (!question) {
        return next(new ErrorHandler("Invalid question id", 400));
      }

      const newAnwser = {
        user: req.user,
        anwser,
      };

      question?.questionReplies.push(newAnwser);

      await course.save();
      if (req.user?._id === question.user._id) {
        // notification
      } else {
        const data = {
          name: question?.user?.name,
          title: courseContent.title,
        };
        const html = await ejs.renderFile(
          path.join(__dirname, ".../mails/replies-notification.ejs"),
          data
        );
        await NOTIFICATION.create({
          title: "You have new Order",
          userId: req.user?._id,
          message: `you have recieve new question under this course${courseContent?.title}`,
        });
        await sendMail({
          email: question.user.email,
          subject: "QuestionReply",
          template: "replies-notification.ejs",
          data,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//  add rating to course

interface IREVIEW {
  rating: number;
  courseId: string;
  contentId: string;
  review: string;
}

export const addReview = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rating, courseId, contentId, review }: IREVIEW = req.body;

      const courseList = req.user?.courses;

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Invalid course id", 400));
      }

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content  id", 400));
      }

      const content = course?.courseData.find((item: any) =>
        item._id.equals(contentId)
      );
      const eligible = courseList?.some((item: any) => item._id === contentId);
      if (!eligible) {
        return next(new ErrorHandler("You're not allow to add review", 400));
      }

      const newReview: any = {
        user: req.user,
        rating,
        comment: review,
      };

      course?.review.push(newReview);

      let avg = 0;

      course?.review.forEach((item: any) => {
        avg += item.rating;
      });

      if (course) {
        course.rating = avg / course.review.length;
      }

      await course.save();

      res.status(201).json({
        status: "success",
        data: course,
      });
    } catch (error: any) {
      new ErrorHandler(error.message, 400);
    }
  }
);

// const reply review

interface IREPLYREVIEW {
  courseId: string;
  contentId: string;
  reviewId: string;
  comment: string;
}
export const replyReview = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, contentId, reviewId, comment }: IREPLYREVIEW = req.body;

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("could not find course", 404));
      }

      const review = course.review.find((item: any) => item._id === reviewId);

      if (!review) {
        return next(new ErrorHandler("could not find review", 404));
      }
      const newReviewReply: any = {
        comment: comment,
        user: req?.user,
      };
      if (!review.reviewReplies) {
        review.reviewReplies = [];
      }

      if (review) {
        review.reviewReplies.push(newReviewReply);
      }

      await course?.save();

      res.status(201).json({
        status: "success",
        data: course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getVideoUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { videoId } = req.body;
  try {
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      { ttl: 300 },
      {
        headers: {
          Accept: "appplication/json",
          "Content-Type": "application/json",
          Authorization: `Apisecret ${process.env.VDOCIPHER_API_KEY}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// delete course
export const deleteCourse = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await CourseModel.findById(id);

      if (!course) {
        return next(new ErrorHandler("Course not Exist", 404));
      }

      await CourseModel.deleteOne({ id });
      await redis.del(id);

      res.status(200).json({
        message: "course deleted successsfully",
        success: true,
        data: course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
