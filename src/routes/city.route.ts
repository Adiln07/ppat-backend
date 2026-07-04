import express from "express";
import {
  getAllCitiesController,
  getCityByIdController,
  createCityController,
  updateCityController,
  deleteCityController,
} from "../controllers/city.controller.js";

const router = express.Router();

router.get("/", getAllCitiesController);
router.get("/:id", getCityByIdController);
router.post("/", createCityController);
router.patch("/:id", updateCityController);
router.delete("/:id", deleteCityController);

export default router;
