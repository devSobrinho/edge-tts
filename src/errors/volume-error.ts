import { AppError } from "./app-error";

export class VolumeError extends AppError {
  constructor() {
    super("Invalid volume format. Expected format: '-100% to 100%'.");
    this.name = VolumeError.name;
  }
}
