import type { Request, Response, NextFunction } from "express";
import { verifyAccess } from "../utils/jwt.js";

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "unauthorized" });
  try {
    const payload = verifyAccess(token);
    (req as any).userId = payload.id;
    next();
  } catch {
    res.status(401).json({ message: "unauthorized" });
  }
}
