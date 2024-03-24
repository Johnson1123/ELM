require("dotenv").config();

export const getDBURL = (): string => {
  if (process.env.NODE_ENVIRONMENT == "Production") {
    return process.env.MONGODB_URL || "";
  } else {
    return process.env.LOCAL_MONGODB_URL || "";
  }
};
export const getOrigin = (): string => {
  if (process.env.NODE_ENVIRONMENT == "Production") {
    return process.env.PRODUCTION_ORIGIN || "";
  } else {
    return process.env.DEVELOPMENT_ORIGIN || "";
  }
};
