import express from "express";
import { Router } from "express";
import { authenticateUser } from "@/middleware/authentication";

import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from "@/controllers/Review";

const router: Router = express.Router();

router.route("/").post(authenticateUser, createReview).get(getAllReviews);
router
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

export default router;
