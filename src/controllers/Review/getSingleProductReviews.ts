import { Request, Response, NextFunction } from "express";
import Review from "@/models/Review";
import { StatusCodes } from "http-status-codes";

const getSingleProductReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: productId } = req.params;
    const reviews = await Review.find({ product: productId });
    res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
  } catch (error) {
    next(error);
  }
};

export default getSingleProductReviews;
