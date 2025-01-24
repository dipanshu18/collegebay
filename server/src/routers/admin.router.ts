import express from "express";

import { adminHome, adminLogin } from "../controllers/admin.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/all", adminMiddleware, adminHome);

adminRouter.get("/posts/:id", adminMiddleware, adminHome);

adminRouter.patch("/posts/:id", adminMiddleware, adminHome);

adminRouter.get("/requests/:id", adminMiddleware, adminHome);

adminRouter.patch("/requests/:id", adminMiddleware, adminHome);

adminRouter.post("/logout", adminMiddleware, adminLogin);

export { adminRouter };
