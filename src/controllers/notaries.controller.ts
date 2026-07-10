import {
  getAllNotariesUseCase,
  getNotaryByIdUseCase,
  createNotaryUseCase,
  updateNotaryUseCase,
  deleteNotaryUseCase,
} from "../usecases/notaries.usecase.js";
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response.js";
import { FilterNotary, NotaryInput, NotaryUpdate } from "../types/notary.js";

const getAllNotariesController = async (req: Request, res: Response) => {
  try {
    const filter: FilterNotary = {
      kotaId: req.query.kotaId ? Number(req.query.kotaId) : undefined,
      name: req.query.name ? String(req.query.name) : undefined,
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    };

    const notaries = await getAllNotariesUseCase(filter);
    successResponse(res, notaries, "Notaries fetched successfully");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch all notary";
    errorResponse(res, errorMessage);
  }
};

const getNotaryByIdController = async (req: Request, res: Response) => {
  try {
    const notaryId = Number(req.params.id);
    const notary = await getNotaryByIdUseCase(notaryId);
    successResponse(res, notary, "Notary fetched successfully");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch notary";
    errorResponse(res, errorMessage);
  }
};

const createNotaryController = async (req: Request, res: Response) => {
  try {
    const { name, skPpat, address, mapUrl, kotaId, imageUrl }: NotaryInput =
      req.body;

    const newNotaryData = { name, skPpat, address, mapUrl, kotaId, imageUrl };
    const newNotary = await createNotaryUseCase(newNotaryData);
    successResponse(res, newNotary, "Notary created successfully");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create notary";
    errorResponse(res, errorMessage);
  }
};

const updateNotaryController = async (req: Request, res: Response) => {
  try {
    const idNotary = Number(req.params.id);
    const { name, skPpat, address, mapUrl, imageUrl }: NotaryUpdate = req.body;

    const updateNotaryData = { name, skPpat, address, mapUrl, imageUrl };
    const updateNotary = await updateNotaryUseCase(idNotary, updateNotaryData);
    successResponse(res, updateNotary, "Notary Updated successfully");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create notary";
    errorResponse(res, errorMessage);
  }
};

const deleteNotaryController = async (req: Request, res: Response) => {
  try {
    const idNotary = Number(req.params.id);
    const deleteNotary = await deleteNotaryUseCase(idNotary);
    successResponse(res, deleteNotary, "Notary Deleted Successfully");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to deleted notary";
    errorResponse(res, errorMessage);
  }
};

export {
  getAllNotariesController,
  getNotaryByIdController,
  createNotaryController,
  updateNotaryController,
  deleteNotaryController,
};
