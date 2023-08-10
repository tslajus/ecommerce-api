import { Request, Response, NextFunction } from "express";
import Order from "@/models/Order";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "@/errors";
import { checkPermissions, castToAuthReq } from "@/utils";

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = castToAuthReq(req);
    const { id: orderId } = authReq.params;
    const { paymentIntentId } = authReq.body;

    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      throw new NotFoundError(`No order with id : ${orderId}`);
    }
    checkPermissions(authReq.user, order.user);

    order.paymentIntentId = paymentIntentId;
    order.status = "paid";
    await order.save();

    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    next(error);
  }
};

export default updateOrder;
