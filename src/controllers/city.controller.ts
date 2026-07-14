import {
  getAllCitiesUseCase,
  getCityByIdUseCase,
  createCityUseCase,
  updateCityUseCase,
  deleteCityUseCase,
} from "../usecases/city.usecase.js";
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response.js";
import { FilterCity } from "../types/city.js";

const getAllCitiesController = async (req: Request, res: Response) => {
  try {
    const filter: FilterCity = {
      name: req.query.name ? String(req.query.name) : undefined,
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    };
    const { cities, pagination } = await getAllCitiesUseCase(filter);
    successResponse(res, cities, "Cities fetched successfully", pagination);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch All city";
    errorResponse(res, errorMessage);
  }
};

const getCityByIdController = async (req: Request, res: Response) => {
  try {
    const cityId = Number(req.params.id);
    const city = await getCityByIdUseCase(cityId);
    successResponse(res, city, "City fetched successfully");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch city";
    errorResponse(res, errorMessage);
  }
};

const createCityController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCity = await createCityUseCase(name);
    successResponse(res, newCity, "City created successfully");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create city";
    errorResponse(res, errorMessage);
  }
};

const updateCityController = async (req: Request, res: Response) => {
  try {
    const cityId = Number(req.params.id);
    const { name } = req.body;
    const updatedCity = await updateCityUseCase(cityId, name);
    successResponse(res, updatedCity, "City updated successfully");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update city";
    errorResponse(res, errorMessage);
  }
};

const deleteCityController = async (req: Request, res: Response) => {
  try {
    const cityId = Number(req.params.id);
    const deletedCity = await deleteCityUseCase(cityId);
    successResponse(res, deletedCity, "City deleted successfully");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete city";
    errorResponse(res, errorMessage);
  }
};

export {
  getAllCitiesController,
  getCityByIdController,
  createCityController,
  updateCityController,
  deleteCityController,
};
