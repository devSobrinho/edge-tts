"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = AppError.name;
    }
}
exports.AppError = AppError;
