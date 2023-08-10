import express from "express";
import { Router } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "@/middleware/authentication";

import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from "@/controllers/Product";

import { getSingleProductReviews } from "@/controllers/Review";

const router: Router = express.Router();

router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin"), createProduct)
  .get(getAllProducts);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authenticateUser, authorizePermissions("admin"), updateProduct)
  .delete(authenticateUser, authorizePermissions("admin"), deleteProduct);

router
  .route("/uploadImage")
  .post(authenticateUser, authorizePermissions("admin"), uploadImage);

router.route("/:id/reviews").get(getSingleProductReviews);

export default router;
