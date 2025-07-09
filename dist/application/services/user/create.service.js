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
const client_1 = __importDefault(require("@common/database/prisma/client"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userAlreadyExists = yield client_1.default.user.findFirst({
                    where: {
                        email: user.email
                    }
                });
                if (userAlreadyExists) {
                    throw new Error("Email already exists.");
                }
                const passwordHash = yield (0, bcryptjs_1.hash)(user.password, 8);
                const result = yield client_1.default.user.create({
                    data: {
                        name: user.name,
                        email: user.email,
                        password: passwordHash
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                });
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = new CreateUserService();
//# sourceMappingURL=create.service.js.map