import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import User from "@/models/User";
import { BadRequestError } from "@/errors";
import { sendResetPasswordEmail, createHash } from "@/utils";
import crypto from "crypto";

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (!email) {
    return next(new BadRequestError("Please provide valid email"));
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    const origin = process.env.FRONT_END_URL;

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    await User.updateOne(
      { email },
      {
        $set: {
          passwordToken: createHash(passwordToken),
          passwordTokenExpirationDate,
        },
      }
    );
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

export default forgotPassword;
