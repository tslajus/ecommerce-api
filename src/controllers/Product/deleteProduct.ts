import { Request, Response, NextFunction } from "express";
import Product from "@/models/Product";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";
import mongoose from "mongoose";

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new NotFoundError("Product was not found");
    }

    await mongoose.model("Review").deleteMany({ product: productId });
    const deleteResult = await Product.deleteOne({ _id: productId });

    if (deleteResult.deletedCount === 0) {
      throw new NotFoundError("Product was not found");
    }

    res.status(StatusCodes.OK).json({ msg: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default deleteProduct;
