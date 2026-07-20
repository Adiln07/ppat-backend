import { Router } from "express";
import {
  registerAdminController,
  loginAdminController,
} from "../controllers/auth.controller.js";

const adminRouter = Router();

adminRouter.post("/register", registerAdminController);
adminRouter.post("/login", loginAdminController);

export default adminRouter;
