import { Response, Request, NextFunction } from "express";
import User from "@/models/User";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    if (!users) {
      throw new NotFoundError("No users were found");
    }
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
};

export default getAllUsers;
