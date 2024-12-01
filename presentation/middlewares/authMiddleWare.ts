import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../infrastructure/services/JwtService";

const jwtService = new JwtService();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwtService.verifyToken(token);
    // req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
