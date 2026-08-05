import { Router } from "express";
import { uploadImageController } from "../controllers/upload.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/", upload.single("image"), uploadImageController);

export default router;
