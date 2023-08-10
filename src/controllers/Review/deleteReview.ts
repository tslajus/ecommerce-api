import { Request, Response, NextFunction } from "express";
import Review from "@/models/Review";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";
import { checkPermissions, castToAuthReq } from "@/utils";

const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authReq = castToAuthReq(req);
  const { id: reviewId } = req.params;
  const review = await Review.findOneAndDelete({ _id: reviewId });
  if (!review) {
    throw new NotFoundError("Review was not found");
  }

  checkPermissions(authReq.user, review.user);
  await Review.calculateAverageRating(review.product);

  res.status(StatusCodes.OK).json({ msg: "Review deleted successfully" });
};

export default deleteReview;
