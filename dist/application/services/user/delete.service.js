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
class RemoveUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            if (user_id) {
                const exists = yield client_1.default.user.findFirst({
                    where: {
                        id: user_id
                    }
                });
                if (!exists) {
                    throw new Error("User is not found");
                }
                const removeUser = yield client_1.default.user.delete({
                    where: {
                        id: user_id
                    }
                });
                return removeUser;
            }
        });
    }
}
exports.default = new RemoveUserService();
//# sourceMappingURL=delete.service.js.map