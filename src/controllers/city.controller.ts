import {
  getAllCitiesUseCase,
  getCityByIdUseCase,
  createCityUseCase,
  updateCityUseCase,
} from "../usecases/city.usecase.js";
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response.js";
import { City } from "../types/city.js";

const getAllCitiesController = async (req: Request, res: Response) => {
  try {
    const cities = await getAllCitiesUseCase();
    successResponse(res, cities, "Cities fetched successfully");
  } catch (error) {
    errorResponse(res, "Failed to fetch cities");
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

export {
  getAllCitiesController,
  getCityByIdController,
  createCityController,
  updateCityController,
};
