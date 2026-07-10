import prisma from "../config/prisma.js";
import { FilterNotary, NotaryUpdate, NotaryInput } from "../types/notary.js";

const getAllNotariesRepository = async (filter: FilterNotary) => {
  const where: any = {};

  if (filter.kotaId) {
    where.kotaId = filter.kotaId;
  }
  if (filter.name) {
    where.name = {
      contains: filter.name,
    };
  }

  const page = Number(filter.page) || 1;

  const take = filter.limit ? Number(filter.limit) : undefined;
  const skip = take ? (page - 1) * take : undefined;

  const notaries = await prisma.notaris.findMany({
    select: {
      id: true,
      name: true,
      skPpat: true,
      address: true,
      mapUrl: true,
      kotaId: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
    },
    where,
    skip,
    take,
  });
  return notaries;
};

const getNotaryByIdRepository = async (id: number) => {
  const notary = await prisma.notaris.findUnique({
    where: {
      id: id,
    },
  });
  return notary;
};

const getNotaryBySkPPATRepository = async (skPpat: string) => {
  const notary = await prisma.notaris.findUnique({
    where: {
      skPpat: skPpat,
    },
  });
  return notary;
};

const createNotaryRepository = async (notaryData: NotaryInput) => {
  const newNotary = await prisma.notaris.create({
    data: {
      name: notaryData.name,
      skPpat: notaryData.skPpat,
      address: notaryData.address,
      mapUrl: notaryData.mapUrl,
      kotaId: notaryData.kotaId,
      imageUrl: notaryData.imageUrl,
    },
  });
  return newNotary;
};

const updateNotaryRepository = async (id: number, notaryData: NotaryUpdate) => {
  const updatedNotary = await prisma.notaris.update({
    where: {
      id: id,
    },
    data: {
      name: notaryData.name,
      skPpat: notaryData.skPpat,
      address: notaryData.address,
      mapUrl: notaryData.mapUrl,
      imageUrl: notaryData.imageUrl,
    },
  });

  return updatedNotary;
};

const deleteNotaryRepository = async (id: number) => {
  const deleteNotary = await prisma.notaris.delete({
    where: {
      id: id,
    },
  });

  return deleteNotary;
};

export {
  getAllNotariesRepository,
  getNotaryByIdRepository,
  getNotaryBySkPPATRepository,
  createNotaryRepository,
  updateNotaryRepository,
  deleteNotaryRepository,
};
