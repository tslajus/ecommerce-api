import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import path from "path";
import { BadRequestError } from "@/errors";
import { UploadedFile } from "express-fileupload";

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.files || !req.files.image) {
    throw new BadRequestError("No file uploaded");
  }
  const productImage = req.files.image as UploadedFile;

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload image");
  }
  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new BadRequestError("Please upload smaller image");
  }

  const imagePath = path.join(__dirname, `../../uploads/${productImage.name}`);

  await productImage.mv(imagePath);

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

export default uploadImage;
