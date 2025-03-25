"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceLocaleError = void 0;
const app_error_1 = require("./app-error");
class VoiceLocaleError extends app_error_1.AppError {
    constructor() {
        super("Could not infer voiceLocale from voiceName!");
        this.name = VoiceLocaleError.name;
    }
}
exports.VoiceLocaleError = VoiceLocaleError;
