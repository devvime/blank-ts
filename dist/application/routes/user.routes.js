"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("@app/controllers/user.controller"));
const create_dto_1 = require("@app/dtos/user/create.dto");
const update_dto_1 = require("@app/dtos/user/update.dto");
const session_middleware_1 = require("@middlewares/session.middleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/user', session_middleware_1.isAuthenticated, user_controller_1.default.list);
router.post('/user', session_middleware_1.isAuthenticated, create_dto_1.createUserDTO, user_controller_1.default.create);
router.put('/user', session_middleware_1.isAuthenticated, update_dto_1.updateUserDTO, user_controller_1.default.update);
router.delete('/user', session_middleware_1.isAuthenticated, user_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=user.routes.js.map