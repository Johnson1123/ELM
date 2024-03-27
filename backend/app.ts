require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user";
import { errorMiddleware } from "./middleware/errors";
import courseRoute from "./routes/course.routes";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import analyticRoutes from "./routes/analytics.routes";
import layoutRoutes from "./routes/layout.routes";
import orderRoutes from "./routes/order.routes";
import { getOrigin } from "./helpers";
// import { apiDoc } from "./utils/swagger";
const origin = getOrigin() || "";
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);
app.use(
  "/app/v1",
  userRoute,
  courseRoute,
  analyticRoutes,
  layoutRoutes,
  orderRoutes
);
// const options = {
//   definition: {
//     openapi: "3.1.0",
//     info: {
//       title: "New-ageTech Solutions Inc API",
//       description:
//         "NewageTech solutions inc. online learning platform for programming courses.",

//       version: "1.0.0",
//       contact: {
//         name: "onifade Johnson",
//         email: "Onifadejohnson2014@gmail.com",
//         stack: "React, Node, TypeScript, MongoDB, Next.js, Nest.js",
//         url: "https://github.com/DesmondSanctity/node-js-swagger",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:5000",
//         description: "Local Host",
//       },
//       {
//         url: "http://localhost:3000",
//         description: "Live Server",
//       },
//     ],
//   },
//   apis: ["./routes/*.ts", "./model/*.ts"],
// };
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EasyTech Solution LMS Api",
      version: "1.0.0",
      description:
        "NewageTech solutions inc. online learning platform for programming courses.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],
    paths: {
      "/api/users": {
        get: {
          summary: "Get a list of users",
          responses: {
            "200": {
              description: "Successfully retrieved users",
              content: {
                "application/json": {
                  example: {
                    users: [],
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a new user",
          requestBody: {
            content: {
              "application/json": {
                example: {
                  name: "John Doe",
                  email: "john@example.com",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "User created successfully",
              content: {
                "application/json": {
                  example: {
                    id: 1,
                    name: "John Doe",
                    email: "john@example.com",
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["../routes/*.ts"],
};
const swaggJson = swaggerJSDoc(options);
app.use(
  "/doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggJson, { explorer: true })
);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Routes ${req.originalUrl} cannot be found`) as any;
  err.status = 404;
  next(err);
});

app.use(errorMiddleware);
