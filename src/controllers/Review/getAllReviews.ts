import { Request, Response, NextFunction } from "express";
import Review from "@/models/Review";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";

const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await Review.find({})
      .populate({
        path: "product",
        select: "name company price",
      })
      .populate({ path: "user", select: "name email" });

    if (!reviews) {
      throw new NotFoundError("No reviews were found");
    }

    res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
  } catch (error) {
    next(error);
  }
};

export default getAllReviews;
