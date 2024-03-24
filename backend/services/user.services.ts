import { Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../model/user";

const getUserById = async (id: string, res: Response) => {
  console.log(id);
  const userString = await redis.get(id);
  if (userString) {
    const user = JSON.parse(userString);
    res.status(200).json({
      status: "success",
      data: user,
    });
  }
};

export default getUserById;

export const getAllUser = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1, password: -1 });
  res.status(200).json({
    status: "success",
    data: users,
  });
};

export const updateUserRoleSevice = async (
  email: string,
  role: string,
  res: Response
) => {
  const user = await userModel.findOneAndUpdate(
    { email },
    { role },
    { new: true }
  );
  await redis.set(user?._id, JSON.stringify(user) as any);
  res.status(200).json({
    message: "success",
    data: user,
  });
};

export const deleteUserService = async (id: string, res: Response) => {
  // const destro = await redis.destroy(id);
  const des = await userModel.findByIdAndDelete(id);
  if (des) {
    res.status(200).json({
      status: "success",
      message: "User deleted",
    });
  }
};
