import { NextFunction, Request, Response } from "express";
import { asyncError } from "../middleware/asyncCatchError";
import ErrorHandler from "../utils/errorHandler";
import { v2 as cloudinary } from "cloudinary";
import layoutModel from "../model/layout.model";

export const insertLayout = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await layoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`${type} layout already exist`, 400));
      }
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;

        const banner = {
          image: {
            public_id: "",
            url: "",
          },
          title: title,
          subTitle: subTitle,
        };

        if (image) {
          const myCloud = await cloudinary.uploader.upload(image, {
            folder: "banner",
          });

          banner.image = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }

        await layoutModel.create({ type: "Banner", banner });
      }

      if (type === "Faq") {
        const { faq } = req.body;

        console.log(faq);
        const faqItem = await Promise.all(
          faq.map(async (item: { question: string; answer: string }) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        console.log(faqItem);
        await layoutModel.create({ type: "Faq", faq: faqItem });
      }
      if (type === "Category") {
        const { category } = req.body;
        await layoutModel.create({ type: "Category", category: category });
      }
      res.status(201).json({
        success: true,
        message: `${type} layout inserted Successfully`,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Edit layout
export const editLayout = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const findBanner: any = await layoutModel.findOne({ type: "Banner" });
        const banner = {
          image: {
            public_id: "",
            url: "",
          },
          title: title,
          subTitle: subTitle,
        };
        if (image.startsWith("http")) {
          banner.image = {
            public_id: findBanner.banner.image.public_id,
            url: findBanner.banner.image.secure_url,
          };
        } else {
          await cloudinary.uploader.destroy(findBanner.banner.image.public_id);
          const myCloud = await cloudinary.uploader.upload(image, {
            folder: "banner",
          });
          banner.image = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }

        await layoutModel.findByIdAndUpdate(findBanner.id, {
          type: "Banner",
          banner,
        });
      }

      if (type === "Faq") {
        const { faq } = req.body;
        const findFaq = await layoutModel.findOne({ type: "Faq" });
        const faqItem = await Promise.all(
          faq.map(async (item: { question: string; answer: string }) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await layoutModel.findByIdAndUpdate(findFaq?._id, {
          type: "Faq",
          faq: faqItem,
        });
      }
      if (type === "Category") {
        const { category } = req.body;
        const findCateory = await layoutModel.findOne({ type: "Category" });
        // const categoryItem = await Promise.all(
        //   category.map(async (item: { title: string }) => {
        //     return { tiitle: item.title };
        //   })
        // );
        await layoutModel.findByIdAndUpdate(findCateory?._id, {
          type: "Category",
          category: category,
        });
      }
      res.status(200).json({
        success: true,
        message: `${type} layout is updated Successfully`,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get layout by type'  `

export const getLayout = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;

      const data = await layoutModel.findOne({ type });
      res.status(200).json({
        success: true,
        message: "data fetch successfully",
        data,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
