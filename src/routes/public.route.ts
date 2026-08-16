import express from "express";
import {
  getAllArticleController,
  getArticleByIdController,
} from "../controllers/article.controller.js";
import {
  getAllNotariesController,
  getNotaryByIdController,
} from "../controllers/notaries.controller.js";
import { getAllCitiesController } from "../controllers/city.controller.js";

const router = express.Router();

router.get("/article", getAllArticleController);
router.get("/article/:id", getArticleByIdController);

router.get("/notary", getAllNotariesController);
router.get("/notary/:id", getNotaryByIdController);

router.get("/cities", getAllCitiesController);

export default router;
