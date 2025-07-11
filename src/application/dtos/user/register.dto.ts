import dto from "@shared/utils/dto";
import { body } from "express-validator";

export const registerUserDTO = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").notEmpty(),
  body("role").custom((value, { req }) => {
    if (value) throw new Error("You cannot set the function manually.");
    return true;
  }),
  dto.verify,
];