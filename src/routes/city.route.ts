import express from "express";
import {
  getAllCitiesController,
  getCityByIdController,
  createCityController,
} from "../controllers/city.controller.js";

const router = express.Router();

router.get("/", getAllCitiesController);
router.get("/:id", getCityByIdController);
router.post("/", createCityController);

export default router;
