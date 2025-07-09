"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("@app/controllers/auth.controller"));
const session_dto_1 = require("@app/dtos/auth/session.dto");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/session', session_dto_1.authSessionDTO, auth_controller_1.default.session);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map