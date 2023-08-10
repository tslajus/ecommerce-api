import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { castToAuthReq } from "@/utils";

const showCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authReq = castToAuthReq(req);

  res.status(StatusCodes.OK).json({ user: authReq.user });
};

export default showCurrentUser;
