import { Request, Response, NextFunction } from "express";
import Review from "@/models/Review";
import Product from "@/models/Product";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "@/errors";
import { castToAuthReq } from "@/utils";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = castToAuthReq(req);
    const { product: productId } = req.body;
    const isValidProduct = await Product.findOne({ _id: productId });

    if (!isValidProduct) {
      throw new NotFoundError(`No product with id: ${productId}`);
    }

    const alreadySubmitted = await Review.findOne({
      product: productId,
      user: authReq.user.userId,
    });

    if (alreadySubmitted) {
      throw new BadRequestError(`Already submitted review for this product`);
    }

    req.body.user = authReq.user.userId as string;

    const review = await Review.create(req.body);
    await Review.calculateAverageRating(review.product);
    res.status(StatusCodes.CREATED).json({ review });
  } catch (error) {
    next(error);
  }
};

export default createReview;
