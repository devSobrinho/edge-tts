"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioDataError = void 0;
const app_error_1 = require("./app-error");
class AudioDataError extends app_error_1.AppError {
    constructor() {
        super("No audio data available.");
        this.name = AudioDataError.name;
    }
}
exports.AudioDataError = AudioDataError;
