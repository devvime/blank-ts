"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = serverError;
require("express-async-errors");
function serverError(err, request, response, next) {
    if (err instanceof Error) {
        response.status(400).json({
            error: err.message
        });
    }
    response.status(500).json({
        error: "Internal server error."
    });
}
//# sourceMappingURL=server.error.js.map