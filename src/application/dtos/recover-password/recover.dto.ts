import dto from "@shared/utils/dto";
import { body } from "express-validator";

export const recoverPasswordDTO = [
  body("email").isEmail().notEmpty(),
  dto.verify,
];

export const changePasswordDTO = [
  body("password").isString().notEmpty(),
  dto.verify,
];