import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import User from "@/models/User";
import { BadRequestError } from "@/errors";
import { createHash } from "@/utils";

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, email, password } = req.body;

  if (!token || !email || !password) {
    return next(new BadRequestError("Please provide all values"));
  }

  const user = await User.findOne({ email });

  if (user && user.passwordToken && user.passwordTokenExpirationDate) {
    const currentDate = new Date();

    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = undefined;
      user.passwordTokenExpirationDate = undefined;

      await user.save();
    }
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Password has been reset successfully" });
};

export default resetPassword;
