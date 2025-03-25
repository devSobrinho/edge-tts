"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateError = void 0;
const app_error_1 = require("./app-error");
class RateError extends app_error_1.AppError {
    constructor() {
        super("Invalid rate format. Expected format: '-100% to 100%'.");
        this.name = RateError.name;
    }
}
exports.RateError = RateError;
