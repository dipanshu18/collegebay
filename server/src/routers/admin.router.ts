import express from "express";
import { adminHome, adminLogin } from "../controllers/admin.controller";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/all", adminHome);

export { adminRouter };
