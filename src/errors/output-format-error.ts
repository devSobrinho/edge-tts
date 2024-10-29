import { AppError } from "./app-error";

export class OutputFormatError extends AppError {
  constructor() {
    super("Invalid output format.");
    this.name = OutputFormatError.name;
  }
}
