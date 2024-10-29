import { AppError } from "./app-error";

export class AudioDataError extends AppError {
  constructor() {
    super("No audio data available.");
    this.name = AudioDataError.name;
  }
}
