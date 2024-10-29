import { AppError } from "./app-error";

export class RateError extends AppError {
  constructor() {
    super("Invalid rate format. Expected format: '-100% to 100%'.");
    this.name = RateError.name;
  }
}
