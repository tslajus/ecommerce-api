import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Token from "@/models/Token";
import { castToAuthReq } from "@/utils";

const logout = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = castToAuthReq(req);
  await Token.findOneAndDelete({ user: authReq.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export default logout;
