import { Document } from "mongoose";

declare global {
  interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    verificationToken?: string;
    isVerified: boolean;
    verified?: Date;
    passwordToken?: string;
    passwordTokenExpirationDate?: Date;
    userId?: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
  }

  interface ISingleOrderItem extends Document {
    name: string;
    image: string;
    price: number;
    amount: number;
    product: Types.ObjectId;
  }

  interface IOrder extends Document {
    tax: number;
    shippingFee: number;
    subtotal: number;
    total: number;
    orderItems: ISingleOrderItem[];
    status: "pending" | "failed" | "paid" | "delivered" | "canceled";
    user: Types.ObjectId;
    clientSecret: string;
    paymentId?: string;
    paymentIntentId?: string;
  }

  interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    image: string;
    category: "office" | "kitchen" | "bedroom";
    company: "ikea" | "liddy" | "marcos";
    colors: string[];
    featured: boolean;
    freeShipping: boolean;
    inventory: number;
    averageRating: number;
    numOfReviews: number;
    user: Types.ObjectId;
  }

  interface IReview extends Document {
    rating: number;
    title: string;
    comment: string;
    user: Types.ObjectId;
    product: Types.ObjectId;
  }

  interface IToken extends Document {
    refreshToken: string;
    ip: string;
    userAgent: string;
    isValid: boolean;
    user: Types.ObjectId;
  }

  interface UserEmailOptions {
    name: string;
    email: string;
    token?: string;
    origin?: string;
  }

  interface Payload {
    user: {
      name: string;
      userId: string;
      role: string;
    };
    refreshToken?: string;
  }

  interface AuthenticatedRequest extends Request {
    user: IUser;
    params: {
      id: string;
    };
    body: {
      user?: string;
      product?: string;
      paymentIntentId?: string;
      rating?: number;
      title?: string;
      comment?: string;
      name?: string;
      email?: string;
      oldPassword?: string;
      newPassword?: string;
    };
  }
}
