import { Response } from "express";

import { Pagination } from "../types/pagination.js";

function successResponse<T>(
  res: Response,
  data: T,
  message: string = "Success",
  pagination?: Pagination,
): void {
  pagination
    ? res.status(200).json({
        status: "success",
        message,
        data,
        pagination,
      })
    : res.status(200).json({
        status: "success",
        message,
        data,
      });
}

function errorResponse(res: Response, errorMessage: string = "Error") {
  return res.status(404).json({
    status: "error",
    message: errorMessage,
  });
}

export { successResponse, errorResponse };
