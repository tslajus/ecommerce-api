// import express from "express";
// import { Router } from "express";
// import { authenticateUser, authorizePermissions } from "@/middleware/authentication";

// import {
//   getAllUsers,
//   getSingleUser,
//   showCurrentUser,
//   updateUser,
//   updateUserPassword,
// } from "@/controllers/User";

// const router: Router = express.Router();

// router
//   .route("/")
//   .get(authenticateUser, authorizePermissions("admin"), getAllUsers);
// router.route("/:id").get(authenticateUser, getSingleUser);
// router.route("/profile").get(authenticateUser, showCurrentUser);
// router.route("/updateUserProfile").post(authenticateUser, updateUser);
// router.route("/updateUserPassword").post(authenticateUser, updateUserPassword);

// export default router;
