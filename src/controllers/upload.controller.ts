import { Request, Response } from "express";

const uploadImageController = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Image is required",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      url: `/uploads/${req.file.filename}`,
    },
  });
};

export { uploadImageController };
