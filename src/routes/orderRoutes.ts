import express from "express";
import { Router } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "@/middleware/authentication";

import {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} from "@/controllers/Order";

const router: Router = express.Router();

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions("admin"), getAllOrders);

router.route("/showAllMyOrder").get(authenticateUser, getCurrentUserOrders);

router
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);

export default router;
