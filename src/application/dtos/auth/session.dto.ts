import dto from "@shared/utils/dto";
import { body } from "express-validator";

export const authSessionDTO = [
  body("email").isEmail().notEmpty(),
  body("password").notEmpty(),
  dto.verify,
];