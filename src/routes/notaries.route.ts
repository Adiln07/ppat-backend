import express from "express";
import {
  getAllNotariesController,
  getNotaryByIdController,
  createNotaryController,
  updateNotaryController,
  deleteNotaryController,
} from "../controllers/notaries.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllNotariesController);
router.get("/:id", authMiddleware, getNotaryByIdController);
router.post("/", authMiddleware, createNotaryController);
router.patch("/:id", authMiddleware, updateNotaryController);
router.delete("/:id", authMiddleware, deleteNotaryController);

export default router;
