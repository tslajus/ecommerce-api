import { Request, Response, NextFunction } from "express";
import Product from "@/models/Product";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      price,
      description,
      image,
      category,
      company,
      colors,
      featured,
      freeShipping,
      inventory,
      averageRating,
      numOfReviews,
    } = req.body;

    const { id: productId } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      {
        name,
        price,
        description,
        image,
        category,
        company,
        colors,
        featured,
        freeShipping,
        inventory,
        averageRating,
        numOfReviews,
      },
      { new: true, runValidators: true }
    );
    if (!product) {
      throw new NotFoundError("Product was not found");
    }
    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    next(error);
  }
};

export default updateProduct;
