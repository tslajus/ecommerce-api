import { Request, Response, NextFunction } from "express";
import Product from "@/models/Product";
import { StatusCodes } from "http-status-codes";
import { castToAuthReq } from "@/utils";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = castToAuthReq(req);
    req.body.user = authReq.user.userId as string;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    next(error);
  }
};

export default createProduct;
