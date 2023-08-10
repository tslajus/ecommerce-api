import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import User from "@/models/User";
import { BadRequestError, NotFoundError } from "@/errors";
import {
  createTokenUser,
  attachCookiesToResponse,
  castToAuthReq,
} from "@/utils";

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = castToAuthReq(req);
    const { name, email } = req.body;
    if (!name || !email) {
      throw new BadRequestError("Invalid Credentials");
    }
    const user = await User.findOneAndUpdate(
      { _id: authReq.user.userId },
      { name, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
  } catch (error) {
    next(error);
  }
};

export default updateUser;
