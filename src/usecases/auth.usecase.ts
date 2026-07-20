import {
  getAdminByUsernameRepository,
  createAdminRepository,
} from "../repositories/auth.repository.js";
import bcrypt from "bcrypt";
import { AdminData } from "../types/admin.js";
import { generateToken } from "../helpers/jwt.js";

const registerAdminUsecase = async (adminData: AdminData) => {
  if (!adminData.username || !adminData.password) {
    throw new Error("All fields are required");
  }

  const username = adminData.username.trim();
  if (username === "") {
    throw new Error("username cannot be empty ");
  }

  const existingUsername = await getAdminByUsernameRepository(username);
  if (existingUsername) {
    throw new Error("this username already here");
  }

  const hashedPassword = await bcrypt.hash(adminData.password, 10);

  const newData = {
    username,
    password: hashedPassword,
  };

  const newAdmin = await createAdminRepository(newData);

  return newAdmin;
};

const loginAdminUsecase = async (adminData: AdminData) => {
  if (!adminData.username || !adminData.password) {
    throw new Error("All fields are required");
  }

  const username = adminData.username.trim();
  if (username === "") {
    throw new Error("username cannot be empty ");
  }

  const existingAdmin = await getAdminByUsernameRepository(username);
  if (existingAdmin === null) {
    throw new Error("Invalid username or password");
  }

  const isValidPassword = await bcrypt.compare(
    adminData.password,
    existingAdmin.password,
  );
  if (!isValidPassword) {
    throw new Error("Invalid username or password");
  }

  const admin = {
    id: existingAdmin.id,
    username: existingAdmin.username,
  };

  const token = generateToken(admin);

  return {
    token,
    admin,
  };
};

export { registerAdminUsecase, loginAdminUsecase };
