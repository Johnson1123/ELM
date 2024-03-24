require("dotenv").config();
import { Model, Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import mongoose from "mongoose";

const emailRex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     User:
//  *       type: object
//  *       required:
//  *         - name
//  *         - email
//  *       properties:
//  *         id:
//  *           type: string
//  *           description: The auto-generated id of the book
//  *         password:
//  *            type: string
//  *            description: user passord
//  *         name:
//  *           type: string
//  *           description: The book title
//  *         email:
//  *           type: string
//  *           description: The book author
//  *         avatar:
//  *           type: string
//  *           description: user profile image
//  *         isVerified:
//  *           type: boolean
//  *           description: check if a user is a verify user
//  *         role:
//  *           type: string
//  *           description: admin or user
//  *         courses:
//  *           type: array
//  *           description: courses register bu the user
//  *         timestamps:
//  *           type: date
//  *           description
//  *       example:
//  *         id: 144ggffdjgg
//  *         name: Onifade Johnson
//  *         email: onifadejohnson2014@gmail.com
//  *         avatar: https://cloudinary.com/avatar/profile.jpg
//  *         isVerified: false
//  *         role: user
//  *         courses: [144ggffdjgg, 144ggffdjgg]
//  *         timestamps: 20-23-24
//  *
//  */

export interface IUSER extends Document {
  email: string;
  name: string;
  password: string;
  role: string;
  isVerfied: boolean;
  signAccessToken: () => string;
  signRefreshToken: () => string;
  comparePassword: (password: string) => Promise<Boolean>;
  avatar: {
    public_id: string;
    url: string;
  };
  courses: Array<{ courseId: string }>;
}

const user: Schema<IUSER> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (value: string) {
          return emailRex.test(value);
        },
        message: "Invalid email type",
      },
      unique: true,
    },
    password: {
      type: String,
      max: [15, "Password must less than 15"],
      min: [5, "Password must be up to 5"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);

user.pre<IUSER>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
user.methods.signAccessToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_tOKEN || "@Dammyjohn");
};
user.methods.signRefreshToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN || "@Dammyjohn");
};
user.methods.comparePassword = async function (
  hashPassword: string
): Promise<Boolean> {
  return await bcrypt.compare(hashPassword, this.password);
};

const userModel: Model<IUSER> = mongoose.model("USER", user);

export default userModel;
