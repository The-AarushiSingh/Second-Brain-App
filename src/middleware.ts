//@ts-ignore
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_PASSWORD = "YOUR_SECRET_KEY";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  try {
    const decoded = jwt.verify(header, JWT_PASSWORD) as { id: string };
    //@ts-ignore
    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
};