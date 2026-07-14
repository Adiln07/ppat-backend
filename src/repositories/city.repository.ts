import prisma from "../config/prisma.js";
import { FilterCity } from "../types/city.js";

const getAllCitiesRepository = async (filter: FilterCity) => {
  const where: any = {};

  if (filter.name) {
    where.name = {
      contains: filter.name,
    };
  }
  const page = Number(filter.page) || 1;

  const take = filter.limit ? Number(filter.limit) : undefined;
  const skip = take ? (page - 1) * take : undefined;
  const cities = await prisma.kota.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    where,
    skip,
    take,
  });
  const totalItems = await prisma.kota.count({
    where,
  });

  return { cities, totalItems };
};

const getCityByIdRepository = async (id: number) => {
  const city = await prisma.kota.findUnique({
    where: {
      id,
    },
  });
  return city;
};

const getCityByNameRepository = async (name: string) => {
  const city = await prisma.kota.findUnique({
    where: {
      name,
    },
  });
  return city;
};

const createCityRepository = async (name: string) => {
  const newCity = await prisma.kota.create({
    data: {
      name,
    },
  });
  return newCity;
};

const updateCityRepository = async (id: number, name: string) => {
  const updatedCity = await prisma.kota.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return updatedCity;
};

const deleteCityRepository = async (id: number) => {
  const deletedCity = await prisma.kota.delete({
    where: {
      id,
    },
  });
  return deletedCity;
};

export {
  getAllCitiesRepository,
  getCityByIdRepository,
  getCityByNameRepository,
  createCityRepository,
  updateCityRepository,
  deleteCityRepository,
};
