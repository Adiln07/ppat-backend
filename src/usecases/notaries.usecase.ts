import {
  getAllNotariesRepository,
  getNotaryByIdRepository,
  createNotaryRepository,
  getNotaryBySkPPATRepository,
  updateNotaryRepository,
  deleteNotaryRepository,
} from "../repositories/notaries.repository.js";
import { getCityByIdRepository } from "../repositories/city.repository.js";

import { NotaryInput, NotaryUpdate } from "../types/notary.js";

const getAllNotariesUseCase = async () => {
  const notaries = await getAllNotariesRepository();
  return notaries;
};

const getNotaryByIdUseCase = async (id: number) => {
  if (id <= 0) {
    throw new Error("Invalid notary ID");
  }

  const notary = await getNotaryByIdRepository(id);

  if (!notary) {
    throw new Error("Notary not found");
  }

  return notary;
};

const createNotaryUseCase = async (notaryData: NotaryInput) => {
  if (
    !notaryData.name ||
    !notaryData.skPpat ||
    !notaryData.address ||
    !notaryData.mapUrl ||
    !notaryData.kotaId
  ) {
    throw new Error("All fields are required");
  }

  const name = notaryData.name.trim();
  if (name === "") {
    throw new Error("Notary name cannot be empty");
  }
  const skPpat = notaryData.skPpat.trim();
  if (skPpat === "") {
    throw new Error("Notary SK PPAT cannot be empty");
  }
  const address = notaryData.address.trim();
  if (address === "") {
    throw new Error("Notary address cannot be empty");
  }
  const mapUrl = notaryData.mapUrl.trim();
  if (mapUrl === "") {
    throw new Error("Notary Map Url cannot be empty");
  }

  const imageUrl = "";
  const kotaId = notaryData.kotaId;

  const city = await getCityByIdRepository(kotaId);
  if (!city) {
    throw new Error("City with this Id is not found");
  }

  const existingSkppat = await getNotaryBySkPPATRepository(skPpat);

  if (existingSkppat) {
    throw new Error("SKPPAT with this name already exists");
  }

  const newData = {
    name,
    skPpat,
    address,
    mapUrl,
    imageUrl,
    kotaId,
  };

  const newNotary = await createNotaryRepository(newData);
  return newNotary;
};

const updateNotaryUseCase = async (id: number, notaryData: NotaryUpdate) => {
  if (id <= 0) {
    throw new Error("Invalid notary ID");
  }

  if (
    !notaryData.name ||
    !notaryData.skPpat ||
    !notaryData.address ||
    !notaryData.mapUrl
  ) {
    throw new Error("All fields are required");
  }

  const name = notaryData.name.trim();
  if (name === "") {
    throw new Error("Notary name cannot be empty");
  }
  const skPpat = notaryData.skPpat.trim();
  if (skPpat === "") {
    throw new Error("Notary SK PPAT cannot be empty");
  }
  const address = notaryData.address.trim();
  if (address === "") {
    throw new Error("Notary address cannot be empty");
  }
  const mapUrl = notaryData.mapUrl.trim();
  if (mapUrl === "") {
    throw new Error("Notary Map Url cannot be empty");
  }

  const imageUrl = "";

  const existingNotary = await getNotaryByIdRepository(id);
  if (!existingNotary) {
    throw new Error("Notary Not Found");
  }

  const existingSkppat = await getNotaryBySkPPATRepository(skPpat);

  if (existingSkppat && existingSkppat.id !== id) {
    throw new Error("Notary with this SKPPAT already exists");
  }

  const newData = {
    name,
    skPpat,
    address,
    mapUrl,
    imageUrl,
  };

  const updatedNotary = await updateNotaryRepository(id, newData);
  return updatedNotary;
};

const deleteNotaryUseCase = async (id: number) => {
  if (id <= 0) {
    throw new Error("Invalid notary ID");
  }

  const notary = await getNotaryByIdRepository(id);
  if (!notary) {
    throw new Error("Notary not Found");
  }

  const deleteNotary = await deleteNotaryRepository(id);

  return deleteNotary;
};

export {
  getAllNotariesUseCase,
  getNotaryByIdUseCase,
  createNotaryUseCase,
  updateNotaryUseCase,
  deleteNotaryUseCase,
};
