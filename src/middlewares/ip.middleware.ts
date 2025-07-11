import { Request, Response, NextFunction } from "express";

export function requestIP(req: Request, res: Response, next: NextFunction) {
  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress;
  req.userIP = ip;
  next();
}