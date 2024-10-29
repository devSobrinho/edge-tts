import { AppError } from "./app-error";

export class PitchError extends AppError {
  constructor() {
    super("Invalid pitch format. Expected format: '-100Hz to 100Hz'.");
    this.name = PitchError.name;
  }
}
