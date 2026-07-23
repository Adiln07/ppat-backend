import express from "express";
import {
  getAllArticleController,
  getArticleByIdController,
  createArticleController,
  updateArticleController,
  deleteArticleController,
} from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllArticleController);
router.get("/:id", authMiddleware, getArticleByIdController);
router.post("/", authMiddleware, createArticleController);
router.patch("/:id", authMiddleware, updateArticleController);
router.delete("/:id", authMiddleware, deleteArticleController);

export default router;
