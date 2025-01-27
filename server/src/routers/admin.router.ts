import express from "express";

import {
  adminHome,
  adminLogin,
  adminLogout,
  approvePost,
  approveRequest,
  rejectPost,
  rejectRequest,
  requestDetails,
} from "../controllers/admin.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/all", adminMiddleware, adminHome);

adminRouter.patch("/posts/approve/:id", adminMiddleware, approvePost);

adminRouter.patch("/posts/reject/:id", adminMiddleware, rejectPost);

adminRouter.get("/requests/:id", adminMiddleware, requestDetails);

adminRouter.patch("/requests/approve/:id", adminMiddleware, approveRequest);

adminRouter.patch("/requests/reject/:id", adminMiddleware, rejectRequest);

adminRouter.post("/logout", adminMiddleware, adminLogout);

export { adminRouter };
