import {
  registerAdminUsecase,
  loginAdminUsecase,
} from "../usecases/auth.usecase.js";
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response.js";
import { AdminData } from "../types/admin.js";

const registerAdminController = async (req: Request, res: Response) => {
  try {
    const adminData: AdminData = req.body;
    const newAdmin = await registerAdminUsecase(adminData);
    successResponse(res, newAdmin, "success Register Admin");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to Register Admin";
    errorResponse(res, errorMessage);
  }
};

const loginAdminController = async (req: Request, res: Response) => {
  try {
    const adminData: AdminData = req.body;
    const loginData = await loginAdminUsecase(adminData);
    successResponse(res, loginData, "success login admin");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to login Admin";
    errorResponse(res, errorMessage);
  }
};

export { registerAdminController, loginAdminController };
