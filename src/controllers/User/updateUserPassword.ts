import { Request, Response, NextFunction } from "express";
import User from "../../models/User";
import { StatusCodes } from "http-status-codes";
import {
  NotFoundError,
  UnauthenticatedError,
  BadRequestError,
} from "../../errors";
import { castToAuthReq } from "@/utils";

const updateUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = castToAuthReq(req);
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new BadRequestError("Please provide a password");
    }

    const user = await User.findOne({ _id: authReq.user.userId });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({ msg: "Password Updated" });
  } catch (error) {
    next(error);
  }
};

export default updateUserPassword;
