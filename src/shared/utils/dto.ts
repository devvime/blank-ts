import { Request, Response } from "express";
import { validationResult } from "express-validator";

class DTO {
  verify(req: Request, res: Response, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}

export default new DTO();