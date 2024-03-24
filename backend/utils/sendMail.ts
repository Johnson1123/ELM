require("dotenv").config();
import path from "path";
import * as nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import ejs from "ejs";
import { SendMail } from "../type/utils";

export const sendMail = async (options: SendMail): Promise<void> => {
  const transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const { email, subject, template, data } = options;
  const pathTemplate = path.join(__dirname, "../mails/", template);

  const html: string = await ejs.renderFile(pathTemplate, data);

  const sendMailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(sendMailOptions);
};
