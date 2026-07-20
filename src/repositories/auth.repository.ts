import prisma from "../config/prisma.js";
import { AdminData } from "../types/admin.js";

const getAdminByUsernameRepository = async (username: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      username,
    },
  });

  return admin;
};

const createAdminRepository = async (adminData: AdminData) => {
  const newAdmin = await prisma.admin.create({
    data: {
      username: adminData.username,
      password: adminData.password,
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return newAdmin;
};

export { getAdminByUsernameRepository, createAdminRepository };
