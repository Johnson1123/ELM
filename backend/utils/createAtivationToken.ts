import { ActivationToken, IREGIS } from "../type/user";
require("dotenv").config();
import jwt, { Secret } from "jsonwebtoken";

export const activationToken = (user: IREGIS): ActivationToken => {
  const code = Math.floor(9000 * Math.random() + 1000).toString();

  const token = jwt.sign({ user, code }, process.env.TOKEN_SECRET as Secret, {
    expiresIn: "5m",
  });

  return { code, token };
};
