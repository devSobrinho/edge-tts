"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputFormatError = void 0;
const app_error_1 = require("./app-error");
class OutputFormatError extends app_error_1.AppError {
    constructor() {
        super("Invalid output format.");
        this.name = OutputFormatError.name;
    }
}
exports.OutputFormatError = OutputFormatError;
