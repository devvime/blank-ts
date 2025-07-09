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
const list_service_1 = __importDefault(require("@app/services/user/list.service"));
const create_service_1 = __importDefault(require("@app/services/user/create.service"));
const update_service_1 = __importDefault(require("@app/services/user/update.service"));
const delete_service_1 = __importDefault(require("@app/services/user/delete.service"));
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield list_service_1.default.execute();
            res.json(users);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const result = yield create_service_1.default.execute(user);
            res.json(result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const id = req.params.id;
            const result = yield update_service_1.default.execute(id, user);
            res.json(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.params.id;
            const result = yield delete_service_1.default.execute({ user_id });
            res.json(result);
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map