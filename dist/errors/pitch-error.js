"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PitchError = void 0;
const app_error_1 = require("./app-error");
class PitchError extends app_error_1.AppError {
    constructor() {
        super("Invalid pitch format. Expected format: '-100Hz to 100Hz'.");
        this.name = PitchError.name;
    }
}
exports.PitchError = PitchError;
