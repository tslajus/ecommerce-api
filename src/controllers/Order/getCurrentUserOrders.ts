import { Request, Response, NextFunction } from "express";
import Order from "@/models/Order";
import { StatusCodes } from "http-status-codes";
import { castToAuthReq } from "@/utils";

const getCurrentUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = castToAuthReq(req);
    const orders = await Order.find({ user: authReq.user.userId });
    res.status(StatusCodes.OK).json({ orders, count: orders.length });
  } catch (error) {
    next(error);
  }
};

export default getCurrentUserOrders;
