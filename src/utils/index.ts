import { createJWT, isTokenValid, attachCookiesToResponse } from "./auth/jwt";
import createTokenUser from "./auth/createTokenUser";
import checkPermissions from "./auth/checkPermissions";
import createHash from "./auth/createHash";
import castToAuthReq from "./auth/castToAuthReq";
import sendVerificationEmail from "./email/sendVerificationEmail";
import sendResetPasswordEmail from "./email/sendResetPasswordEmail";

export {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  createHash,
  castToAuthReq,
  sendVerificationEmail,
  sendResetPasswordEmail,
};
