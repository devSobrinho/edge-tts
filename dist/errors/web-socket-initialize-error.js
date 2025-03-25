"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketInitializeError = void 0;
const app_error_1 = require("./app-error");
class WebSocketInitializeError extends app_error_1.AppError {
    constructor() {
        super("WebSocket not initialized.");
        this.name = WebSocketInitializeError.name;
    }
}
exports.WebSocketInitializeError = WebSocketInitializeError;
