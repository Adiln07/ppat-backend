import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt.js";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No Token Bearer" });
  }

  try {
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid Authorization Header" });
    }

    const decoded = verifyToken(token);

    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid Token" });
  }
};

export { authMiddleware };
