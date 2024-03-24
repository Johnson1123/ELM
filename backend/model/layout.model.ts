import mongoose, { Document, Model, Schema } from "mongoose";

interface IFAQ extends Document {
  question: string;
  answer: string;
}
interface ICategory extends Document {
  title: string;
}
interface IBannerImage extends Document {
  public_id: string;
  url: string;
}

interface ILayout extends Document {
  type: string;
  faq: Array<IFAQ>;
  category: ICategory[];
  banner: {
    image: IBannerImage;
    title: string;
    subTitle: string;
  };
}

const faqSchema = new Schema<IFAQ>({
  question: { type: String },
  answer: { type: String },
});

const categorySchema = new Schema<ICategory>({
  title: { type: String },
});
const bannerSchema = new Schema<IBannerImage>({
  public_id: { type: String },
  url: { type: String },
});

const layoutSchema = new Schema<ILayout>({
  type: { type: String },
  faq: [faqSchema],
  category: [categorySchema],
  banner: {
    image: bannerSchema,
    title: { type: String },
    subTitle: { type: String },
  },
});

const layoutModel: Model<ILayout> = mongoose.model("layout", layoutSchema);

export default layoutModel;
