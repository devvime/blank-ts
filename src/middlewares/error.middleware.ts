import { Request, Response, NextFunction } from "express";
import ApiError from "@shared/errors/api.error";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    message,
    details: err.details || null,
  });
}