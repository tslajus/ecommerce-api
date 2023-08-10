import { Request, Response, NextFunction } from "express";
import Review from "@/models/Review";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";
import { checkPermissions, castToAuthReq } from "@/utils";

const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = castToAuthReq(req);
    const { rating, title, comment } = req.body;
    const { id: reviewId } = req.params;
    const review = await Review.findOneAndUpdate(
      { _id: reviewId },
      {
        rating,
        title,
        comment,
      },
      { new: true, runValidators: true }
    );

    if (!review) {
      throw new NotFoundError("Review was not found");
    }

    checkPermissions(authReq.user, review.user);
    await Review.calculateAverageRating(review.product);

    res.status(StatusCodes.OK).json({ review });
  } catch (error) {
    next(error);
  }
};

export default updateReview;
