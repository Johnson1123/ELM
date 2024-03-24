import { model, Schema, Document, Model } from "mongoose";
import mongoose from "mongoose";
import { IUSER } from "./user";

interface IComment extends Document {
  user: IUSER;
  question: string;
  questionReplies: [object];
}

interface IReview extends Document {
  user: IUSER;
  rating: number;
  comment: string;
  reviewReplies?: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseData extends Document {
  title: string;
  videoUrl: string;
  videoLenght: number;
  videoPlayer: string;
  description: string;
  suggestion: string;
  link: ILink[];
  questions: IComment[];
  videoSection: string;
}

interface ICourse extends Document {
  price: number;
  level: string;
  estimatedPrice?: number;
  review: IReview[];
  purchase?: number;
  courseData: ICourseData[];
  thumbnail: object;
  demoUrl: string;
  category: string;
  tags: string;
  perequisite: { title: string }[];
  benefits: { title: string }[];
  name: string;
  description: string;
  rating?: number;
}

const reviewSchema = new mongoose.Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
  reviewReplies: [Object],
});

const linkSchema = new mongoose.Schema<ILink>({ title: String, url: String });

const commentSchema = new mongoose.Schema<IComment>({
  user: Object,
  question: String,
  questionReplies: [Object],
});

const courseDataSchema = new mongoose.Schema<ICourseData>({
  videoLenght: Number,
  videoPlayer: String,
  videoSection: String,
  description: String,
  videoUrl: String,
  title: String,
  link: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

const courseSchema = new mongoose.Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        required: true,
        type: String,
      },
    },
    level: {
      type: String,
      required: true,
    },
    demoUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    benefits: [{ title: String }],
    perequisite: [{ title: String }],
    review: [reviewSchema],
    courseData: [courseDataSchema],
    purchase: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    tags: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default CourseModel;
