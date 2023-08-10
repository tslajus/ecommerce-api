import { Request, Response, NextFunction } from "express";
import Product from "@/models/Product";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({});
    if (!products) {
      throw new NotFoundError("No products were found");
    }
    res.status(StatusCodes.OK).json({ products, count: products.length });
  } catch (error) {
    next(error);
  }
};

export default getAllProducts;
