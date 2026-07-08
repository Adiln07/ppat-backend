import express from "express";
import {
  getAllArticleController,
  getArticleByIdController,
  createArticleController,
  updateArticleController,
  deleteArticleController,
} from "../controllers/article.controller.js";

const router = express.Router();

router.get("/", getAllArticleController);
router.get("/:id", getArticleByIdController);
router.post("/", createArticleController);
router.patch("/:id", updateArticleController);
router.delete("/:id", deleteArticleController);

export default router;
