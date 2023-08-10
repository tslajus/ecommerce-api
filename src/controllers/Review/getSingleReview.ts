import { Request, Response, NextFunction } from "express";
import Review from "@/models/Review";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";

const getSingleReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: reviewId } = req.params;
    const review = await Review.findOne({ _id: reviewId });
    if (!review) {
      throw new NotFoundError("Review was not found");
    }
    res.status(StatusCodes.OK).json({ review });
  } catch (error) {
    next(error);
  }
};

export default getSingleReview;
