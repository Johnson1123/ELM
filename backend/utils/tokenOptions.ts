require("dotenv").config();

interface ITOKENACESSREFRESH {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}
const access_TokenExpires = parseInt(
  process.env.ACCESS_TOKENEXPIRES || "5",
  10
);
const refresh_TokenExpires = parseInt(
  process.env.REFRESH_TOKENEXPIRES || "5",
  10
);

export const access_TokenOptions: ITOKENACESSREFRESH = {
  expires: new Date(Date.now() + access_TokenExpires * 60 * 60 * 1000),
  maxAge: access_TokenExpires * 60 * 60 * 1000,
  sameSite: "lax",
  httpOnly: true,
};
export const refresh_TokenOptions: ITOKENACESSREFRESH = {
  expires: new Date(Date.now() + refresh_TokenExpires * 24 * 60 * 60 * 1000),
  maxAge: refresh_TokenExpires * 24 * 60 * 60 * 1000,
  sameSite: "lax",
  httpOnly: true,
};
