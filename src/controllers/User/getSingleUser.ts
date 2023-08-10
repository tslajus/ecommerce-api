import { Request, Response, NextFunction } from "express";
import User from "@/models/User";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";
import { checkPermissions, castToAuthReq } from "@/utils";

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = castToAuthReq(req);
    const user = await User.findOne({ _id: authReq.user.userId }).select(
      "-password"
    );
    if (!user) {
      throw new NotFoundError(`No user found with id ${req.params.id}`);
    }
    checkPermissions(authReq.user, user._id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export default getSingleUser;
