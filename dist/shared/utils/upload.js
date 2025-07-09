"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_config_1 = __importDefault(require("@common/config/multer.config"));
exports.upload = (0, multer_1.default)(multer_config_1.default.upload("../tmp"));
//# sourceMappingURL=upload.js.map