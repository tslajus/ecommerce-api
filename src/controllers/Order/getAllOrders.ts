import { Request, Response, NextFunction } from "express";
import Order from "@/models/Order";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find({});
    if (!orders || orders.length === 0) {
      throw new NotFoundError("No orders were found");
    }

    res.status(StatusCodes.OK).json({ orders, count: orders.length });
  } catch (error) {
    next(error);
  }
};

export default getAllOrders;
