"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolumeError = void 0;
const app_error_1 = require("./app-error");
class VolumeError extends app_error_1.AppError {
    constructor() {
        super("Invalid volume format. Expected format: '-100% to 100%'.");
        this.name = VolumeError.name;
    }
}
exports.VolumeError = VolumeError;
