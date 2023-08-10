import { Request, Response, NextFunction, RequestHandler } from "express";
import { UnauthenticatedError } from "@/errors";
import { isTokenValid, attachCookiesToResponse } from "@/utils";
import Token from "@/models/Token";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

function isJwtPayload(payload: string | JwtPayload): payload is JwtPayload {
  return typeof payload !== "string" && "user" in payload;
}

const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload: string | JwtPayload = isTokenValid(accessToken);
      if (isJwtPayload(payload)) {
        req.user = payload.user;
        return next();
      }
    }
    const payload: string | JwtPayload = isTokenValid(refreshToken);
    if (isJwtPayload(payload)) {
      const existingToken = await Token.findOne({
        user: payload.user.userId,
        refreshToken: payload.refreshToken,
      });

      if (!existingToken || !existingToken?.isValid) {
        throw new UnauthenticatedError("Authentication Invalid");
      }
      attachCookiesToResponse({
        res,
        user: payload.user,
        refreshToken: existingToken.refreshToken,
      });
      req.user = payload.user;
    }

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles: ("admin" | "user")[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user && roles.includes(req.user.role as "admin" | "user")) {
      next();
    } else {
      throw new UnauthenticatedError("Access unauthorized");
    }
  };
};

export { authenticateUser, authorizePermissions };
