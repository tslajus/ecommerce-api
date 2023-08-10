import jwt from "jsonwebtoken";
import { Response } from "express";

interface AttachCookiesProps {
  res: Response;
  user: {
    name: string;
    userId: string;
    role: string;
  };
  refreshToken?: string;
}

const secret = process.env.JWT_SECRET!;
const lifetime = process.env.JWT_LIFETIME;

const createJWT = ({ payload }: { payload: Payload }): string => {
  const token = jwt.sign(payload, secret, { expiresIn: lifetime });

  return token;
};

const isTokenValid = (token: string) => {
  return jwt.verify(token, secret);
};

const attachCookiesToResponse = ({
  res,
  user,
  refreshToken,
}: AttachCookiesProps): void => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });
  const fiveMinutes = 5 * 60 * 1000;
  const oneMonth = 30 * 24 * 60 * 60 * 1000;

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + fiveMinutes),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + oneMonth),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
