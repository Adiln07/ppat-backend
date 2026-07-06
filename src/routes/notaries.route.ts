import express from "express";
import {
  getAllNotariesController,
  getNotaryByIdController,
  createNotaryController,
  updateNotaryController,
  deleteNotaryController,
} from "../controllers/notaries.controller.js";

const router = express.Router();

router.get("/", getAllNotariesController);
router.get("/:id", getNotaryByIdController);
router.post("/", createNotaryController);
router.patch("/:id", updateNotaryController);
router.delete("/:id", deleteNotaryController);

export default router;
