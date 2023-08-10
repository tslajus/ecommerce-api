import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "@/errors";
import User from "@/models/User";
import { sendVerificationEmail } from "@/utils";
import crypto from "crypto";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    return next(new BadRequestError("Email already exists"));
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  const origin = process.env.FRONT_END_URL;

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    token: user.verificationToken,
    origin,
  });

  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email to verify account",
  });
};

export default register;
