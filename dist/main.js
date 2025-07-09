"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server_error_1 = require("@shared/errors/server.error");
const auth_routes_1 = __importDefault(require("@app/routes/auth.routes"));
const user_routes_1 = __importDefault(require("@app/routes/user.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(server_error_1.serverError);
app.use((0, cors_1.default)());
app.use(auth_routes_1.default);
app.use(user_routes_1.default);
app.listen(process.env.PORT || 3333, () => {
    console.log(`Server running on port: ${process.env.PORT || '3333'}`);
});
//# sourceMappingURL=main.js.map