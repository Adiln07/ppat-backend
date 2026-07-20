import express from "express";
import {
  getAllCitiesController,
  getCityByIdController,
  createCityController,
  updateCityController,
  deleteCityController,
} from "../controllers/city.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllCitiesController);
router.get("/:id", authMiddleware, getCityByIdController);
router.post("/", authMiddleware, createCityController);
router.patch("/:id", authMiddleware, updateCityController);
router.delete("/:id", authMiddleware, deleteCityController);

export default router;
