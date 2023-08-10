import { Request, Response, NextFunction } from "express";
import Order from "@/models/Order";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";
import { checkPermissions, castToAuthReq } from "@/utils";

const getSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = castToAuthReq(req);
    const { id: orderId } = authReq.params;
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      throw new NotFoundError(`No order with id: ${orderId}`);
    }
    checkPermissions(authReq.user, order.user);
    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    next(error);
  }
};

export default getSingleOrder;
