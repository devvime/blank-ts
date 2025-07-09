"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDTO = void 0;
const dto_1 = __importDefault(require("@shared/utils/dto"));
const express_validator_1 = require("express-validator");
exports.updateUserDTO = [
    (0, express_validator_1.body)("name").optional(),
    (0, express_validator_1.body)("email").isEmail().optional(),
    (0, express_validator_1.body)("password").isEmpty(),
    (0, express_validator_1.body)("role").custom((value, { req }) => {
        if (value)
            throw new Error("You cannot set the function manually.");
        return true;
    }),
    dto_1.default.verify,
];
//# sourceMappingURL=update.dto.js.map