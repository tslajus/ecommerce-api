import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "@/errors";

interface ExtendedRequest extends Request {
  user?: {
    userId: string;
  };
}

interface OrderItemPayload {
  name: string;
  image: string;
  price: number;
  amount: number;
  product: Types.ObjectId;
}

const fakeStripeAPI = async ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

const createOrder = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    items: cartItems,
    tax,
    shippingFee,
  } = req.body as {
    items: ISingleOrderItem[];
    tax: number;
    shippingFee: number;
  };

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No cart items provided");
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError("Please provide tax and shipping fee");
  }

  let orderItems: OrderItemPayload[] = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new NotFoundError(`No product with id : ${item.product}`);
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem: OrderItemPayload = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    orderItems = [...orderItems, singleOrderItem];
    subtotal += item.amount * price;
  }
  const total = tax + shippingFee + subtotal;

  //stripe later
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });

  if (!req.user || !req.user.userId) {
    throw new BadRequestError("User not authenticated");
  }

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

export default createOrder;
