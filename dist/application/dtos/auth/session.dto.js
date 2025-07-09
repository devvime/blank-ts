"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSessionDTO = void 0;
const dto_1 = __importDefault(require("@shared/utils/dto"));
const express_validator_1 = require("express-validator");
exports.authSessionDTO = [
    (0, express_validator_1.body)("email").isEmail().notEmpty(),
    (0, express_validator_1.body)("password").notEmpty(),
    dto_1.default.verify,
];
//# sourceMappingURL=session.dto.js.map