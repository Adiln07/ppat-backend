import jwt from "jsonwebtoken";

type JwtPayload = {
  id: number;
  username: string;
};

const generateToken = (payload: JwtPayload): string => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyToken = (token: string): JwtPayload => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
export { generateToken, verifyToken };
