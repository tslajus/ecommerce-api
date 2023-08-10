import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "@/errors";
import User from "@/models/User";

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError("Verification failed");
  }

  await User.findOneAndUpdate(
    { email },
    {
      isVerified: true,
      verified: Date.now(),
      verificationToken: "",
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ msg: "Email verified" });
};

export default verifyEmail;
