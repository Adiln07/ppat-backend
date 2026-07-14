import {
  getAllCitiesRepository,
  getCityByIdRepository,
  getCityByNameRepository,
  createCityRepository,
  updateCityRepository,
  deleteCityRepository,
} from "../repositories/city.repository.js";

import { FilterCity } from "../types/city.js";
import { Pagination } from "../types/pagination.js";

const getAllCitiesUseCase = async (filter: FilterCity) => {
  if (filter.name) {
    if (!filter.name.trim()) {
      throw new Error("Invalid Searching By Name");
    }
  }

  if (filter.page) {
    const page = Number(filter.page);

    if (isNaN(page)) {
      throw new Error("Page must be a number");
    }

    if (page <= 0) {
      throw new Error("Invalid Page");
    }
  }

  if (filter.limit) {
    const limit = Number(filter.limit);
    if (isNaN(limit)) {
      throw new Error("Limit Must be a number");
    }
    if (limit <= 0) {
      throw new Error("Invalid Limit");
    }
  }

  const { cities, totalItems } = await getAllCitiesRepository(filter);

  const page = Number(filter.page) || 1;
  const limit = Number(filter.limit) || 10;
  const totalPages = Math.ceil(totalItems / limit);

  const pagination: Pagination = {
    page,
    limit,
    totalItems: totalItems,
    totalPages: totalPages,
  };

  return {
    cities,
    pagination,
  };
};

const getCityByIdUseCase = async (id: number) => {
  if (id <= 0) {
    throw new Error("Invalid city ID");
  }

  const city = await getCityByIdRepository(id);

  if (!city) {
    throw new Error("City not found");
  }

  return city;
};

const createCityUseCase = async (name: string) => {
  if (!name) {
    throw new Error("City name is required");
  }

  const trimmedName = name.trim();

  if (trimmedName === "") {
    throw new Error("City name cannot be empty");
  }

  const existingCity = await getCityByNameRepository(trimmedName);
  if (existingCity) {
    throw new Error("City with this name already exists");
  }

  const newCity = await createCityRepository(trimmedName);
  return newCity;
};

const updateCityUseCase = async (id: number, name: string) => {
  if (id <= 0) {
    throw new Error("Invalid city ID");
  }

  if (!name) {
    throw new Error("City name is required");
  }

  const trimmedName = name.trim();
  if (trimmedName === "") {
    throw new Error("City name cannot be empty");
  }

  const city = await getCityByIdRepository(id);

  if (!city) {
    throw new Error("City not found");
  }

  const existingCity = await getCityByNameRepository(trimmedName);
  if (existingCity && existingCity.id !== id) {
    throw new Error("City with this name already exists");
  }

  if (city.name === trimmedName) {
    throw new Error("City name is the same as the current name");
  }

  const updatedCity = await updateCityRepository(id, trimmedName);
  return updatedCity;
};

const deleteCityUseCase = async (id: number) => {
  if (id <= 0) {
    throw new Error("Invalid city ID");
  }

  const city = await getCityByIdRepository(id);

  if (!city) {
    throw new Error("City not found");
  }

  const deletedCity = await deleteCityRepository(id);
  return deletedCity;
};

export {
  getAllCitiesUseCase,
  getCityByIdUseCase,
  createCityUseCase,
  updateCityUseCase,
  deleteCityUseCase,
};
