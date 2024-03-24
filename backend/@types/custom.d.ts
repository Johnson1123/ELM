import { Request } from "express";
import { IUSER } from "../model/user";
export {};
declare global {
  namespace Express {
    interface Request {
      user?: IUSER;
    }
  }
}
