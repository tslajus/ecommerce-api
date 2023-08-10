import mongoose, { Schema, Types } from "mongoose";

const ReviewSchema = new Schema<IReview>(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    title: {
      type: String,
      maxLength: [200, "Title cannot be more than 200 characters"],
      required: [true, "Please provide review title"],
    },
    comment: {
      type: String,
      maxLength: [1000, "Comment cannot be more than 1000 characters"],
      required: [true, "Please provide comment"],
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (
  productId: Types.ObjectId
) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: "$product",
        averageRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);
  try {
    await mongoose.model<IReview>("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating * 10 || 0) / 10,
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

interface IReviewStaticMethods {
  calculateAverageRating(productId: Types.ObjectId): Promise<void>;
}

export interface IReviewModel
  extends mongoose.Model<IReview>,
    IReviewStaticMethods {}

const Review: IReviewModel = mongoose.model<IReview, IReviewModel>(
  "Review",
  ReviewSchema
);

export default Review;
