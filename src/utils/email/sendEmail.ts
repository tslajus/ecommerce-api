import nodemailer from "nodemailer";
import nodemailerConfig from "./nodemailerConfig";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Test Shop" <test@shop.com>',
    to,
    subject,
    html,
  });
};

export default sendEmail;
