import express, { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  logout,
  registerUser,
  socialAuth,
  updateAccessToken,
  updateAvater,
  updatePassword,
  updateUserInfo,
  updateUserRole,
} from "../controller/user";
import isAuth, { roleAuth } from "../middleware/isAuth";

const Routes = express.Router();
Routes.post("/register-user", registerUser);
Routes.post("/create-user", createUser);
Routes.post("/login-user", loginUser);
Routes.post("/logout", updateAccessToken, isAuth, logout);
Routes.get(
  "/refresh-token",
  updateAccessToken,
  (req: Request, res: Response) => {
    res.status(200).json({ success: true });
  }
);
Routes.get("/get-user", updateAccessToken, isAuth, getUser);
Routes.get("/get-all-user", getAllUsers);
Routes.delete("/delete-by-id/:id", deleteUser);
Routes.post("/social-auth", socialAuth);
Routes.post("/update-user-role", updateUserRole);
Routes.put("/update-user-profile", updateAccessToken, isAuth, updateUserInfo);
Routes.put("/update-user-password", updateAccessToken, isAuth, updatePassword);
Routes.put("/update-user-avatar", updateAccessToken, isAuth, updateAvater);

export default Routes;
