"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = __importDefault(require("@common/database/prisma/client"));
class AuthSessionService {
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield client_1.default.user.findFirst({
                    where: {
                        email: data.email
                    }
                });
                if (!user) {
                    throw new Error("Wrong username or password.");
                }
                const passwordMatch = yield (0, bcryptjs_1.compare)(data.password, user === null || user === void 0 ? void 0 : user.password);
                if (!passwordMatch) {
                    throw new Error("Wrong username or password.");
                }
                const token = (0, jsonwebtoken_1.sign)({
                    name: user.name,
                    email: user.email
                }, process.env.JWT_SECRET, {
                    subject: user.id,
                    expiresIn: "30d"
                });
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = new AuthSessionService();
//# sourceMappingURL=session.service.js.map