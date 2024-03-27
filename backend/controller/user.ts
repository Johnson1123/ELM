import { Request, Response, NextFunction } from "express";
import ejs from "ejs";
import { asyncError } from "../middleware/asyncCatchError";
import ErrorHandler from "../utils/errorHandler";
import userModel, { IUSER } from "../model/user";
import { IREGIS } from "../type/user";
import { activationToken } from "../utils/createAtivationToken";
import path from "path";
import { sendMail } from "../utils/sendMail";
import jwt, { JwtPayload } from "jsonwebtoken";
import signToken from "../utils/tokenHandler";
import { redis } from "../utils/redis";
import { v2 as cloudinary } from "cloudinary";
import {
  access_TokenOptions,
  refresh_TokenOptions,
} from "../utils/tokenOptions";
import getUserById, {
  getAllUser,
  updateUserRoleSevice,
} from "../services/user.services";

export const registerUser = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body as IREGIS;

      const userExist = await userModel.findOne({ email });
      if (userExist) {
        // return next(new ErrorHandler("Email already register", 400));
        return res.status(400).json({
          status: "Failed Request",
          message: "Email exist",
        });
      }

      const user: IREGIS = {
        name,
        email,
        password,
      };

      const activationTokenData = activationToken(user);

      const activationCode = activationTokenData.code;

      const data = {
        user: {
          name: user.name,
        },
        activationCode,
      };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mails.ejs"),
        data
      );
      try {
        await sendMail({
          email: user.email,
          subject: "Activate your Account",
          template: "activation-mails.ejs",
          data,
        });
        return res.status(200).json({
          status: "success",
          message: "check your email to activate your account",
          token: activationTokenData.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// validate token and create user

interface IACTIVATIONREQ {
  activationToken: string;
  activationCode: string;
}

export const createUser = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activationCode, activationToken } = req.body as IACTIVATIONREQ;

      const userData: { user: IUSER; code: string } = (await jwt.verify(
        activationToken,
        process.env.TOKEN_SECRET as string
      )) as { user: IUSER; code: string };
      if (userData.code !== activationCode) {
        return next(new ErrorHandler("Wrong activation code", 400));
      }
      const { name, email, password } = userData.user;
      const userExit = await userModel.findOne({ email });
      if (userExit) {
        return next(new ErrorHandler("User already Exist", 400));
      }
      const user = await userModel.create({ name, email, password });
      return res.status(201).json({
        status: "success",
        user,
      });
    } catch (error: any) {}
  }
);

// login reqest request

interface ILOGIN {
  email: string;
  password: string;
}

export const loginUser = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILOGIN;
      const user = await userModel.findOne({ email }).select({ password: -1 });
      if (!email || !password) {
        return next(new ErrorHandler("send all credential", 400));
      }
      if (!user) {
        return next(new ErrorHandler("Invalid credential", 400));
      }
      const comparePass = await user.comparePassword(password);
      if (!comparePass) {
        return next(new ErrorHandler("Invalid credential", 400));
      }

      const token = user.signAccessToken();
      signToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// log out user

export const logout = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });

      const id = req.user?._id || "";
      await redis.del(id);
      res.status(200).json({
        status: "success",
        message: "User Successfully logout",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update Access token

export const updateAccessToken = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.refresh_token as string;
      if (!token) {
        return next(
          new ErrorHandler("Unauthorization denied, please login", 400)
        );
      }

      const decode = jwt.verify(
        token,
        process.env.REFRESH_TOKEN || "@Dammyjohn"
      ) as JwtPayload;

      console.log({ decode, decode1: true });
      if (!decode) {
        return next(new ErrorHandler("Invalid token, please login", 400));
      }
      const session = await redis.get(decode?._id as string);

      console.log(session);
      if (!session) {
        return next(new ErrorHandler("Session expired, please login", 400));
      }
      const user = JSON.parse(session);

      const accesss_token = jwt.sign(
        user,
        process.env.ACCESS_tOKEN || "@Dammyjohn",
        {
          expiresIn: "5m",
        }
      );
      const refresh_token = jwt.sign(
        user,
        process.env.REFRESH_TOKEN || "@Dammyjohn",
        {
          expiresIn: "3d",
        }
      );
      req.user = user;
      res.cookie("access_token", accesss_token, access_TokenOptions);
      res.cookie("refresh_token", refresh_token, refresh_TokenOptions);

      await redis.set(user._id, JSON.stringify(user), "EX", 604800); // session expire in 7 days

      next();
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get user by Id

export const getUser = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.user?._id;
      getUserById(id, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getAllUsers = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUser(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// social auth handler

interface ISOCIALAUTH {
  email: string;
  name: string;
  avatar: string;
}

export const socialAuth = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, avatar } = req.body as ISOCIALAUTH;
      const user = await userModel.findOne({ email });
      if (!user) {
        const newUser = await userModel.create({ email, name, avatar });
        signToken(newUser, 200, res);
      } else {
        signToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update user information

interface IUPDATEUSER {
  name: string;
  email: string;
}

export const updateUserInfo = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name } = req.body as IUPDATEUSER;
      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (email && user) {
        const emailExist = await userModel.findOne({ email });
        if (emailExist) {
          return next(new ErrorHandler("email already exist", 400));
        }
        user.email = email;
      }
      if (name && user) {
        user.name = name;
      }

      const newUser = await user?.save();

      await redis.set(userId, JSON.stringify(newUser));

      res.status(201).json({
        status: "success",
        data: user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// change password

interface ICHANGEPASS {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as ICHANGEPASS;
      if (!oldPassword || !newPassword) {
        return next(
          new ErrorHandler("enter old password or new password", 400)
        );
      }
      const userId = req.user?._id;
      const user = await userModel.findById(userId).select("+password");

      if (user?.password === undefined) {
        return next(new ErrorHandler("password does not exist", 400));
      }

      const matchPass = await user?.comparePassword(oldPassword);
      if (!matchPass) {
        return next(new ErrorHandler("incorrect old password", 400));
      }
      user.password = newPassword;
      const newUser = await user.save();

      await redis.set(userId, JSON.stringify(newUser));

      res.status(200).json({
        status: "success",
        data: newUser,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update user avater

interface IAVATER {
  avatar: string;
}

export const updateAvater = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IAVATER;

      if (!avatar) {
        return next(new ErrorHandler("avatar not provided", 400));
      }

      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (user && avatar) {
        if (user?.avatar?.public_id) {
          await cloudinary.uploader.destroy(user?.avatar?.public_id);
          const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "avater",
            width: 150,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "avater",
            width: 150,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }
      await user?.save();

      await redis.set(userId, JSON.stringify(user));

      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IUpdateUserRole {
  email: string;
  role: string;
}

// update user role

export const updateUserRole = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, role } = req.body as IUpdateUserRole;
      updateUserRoleSevice(email, role, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// delete user role
export const deleteUser = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      if (!user) {
        return next(new ErrorHandler("User not exist", 404));
      }
      await userModel.deleteOne({ _id: id });
      await redis.del(id);

      res.status(200).json({
        success: true,
        data: user,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
