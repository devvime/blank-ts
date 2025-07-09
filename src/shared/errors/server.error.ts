import 'express-async-errors';
import { Request, Response, NextFunction } from "express";

export function serverError(err: Error, request: Request, response: Response, next: NextFunction) {
  if (err instanceof Error) {
    response.status(400).json({
      error: err.message
    })
  }
  response.status(500).json({
    error: "Internal server error."
  });
}