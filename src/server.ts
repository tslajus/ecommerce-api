import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";

import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";

import connectDB from "./db/connectDB";

// import authRouter from './routes/authRoutes';
// import userRouter from './routes/userRoutes';
// import productRouter from './routes/productRoutes';
// import reviewRouter from './routes/reviewRoutes';
// import orderRouter from './routes/orderRoutes';

// import notFoundMiddleware from './middleware/not-found';
// import errorHandlerMiddleware from './middleware/error-handler';

dotenv.config();

const app: Express = express();

app.set("trust proxy", 1);

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(cors());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET!));
app.use(fileUpload());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/products', productRouter);
// app.use('/api/v1/reviews', reviewRouter);
// app.use('/api/v1/orders', orderRouter);

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

const port: string | number = process.env.PORT || 5000;

const start = async (): Promise<void> => {
  try {
    await connectDB(process.env.MONGO_URL!);
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
