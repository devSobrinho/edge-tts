import { AppError } from "./app-error";

export class VoiceLocaleError extends AppError {
  constructor() {
    super("Could not infer voiceLocale from voiceName!");
    this.name = VoiceLocaleError.name;
  }
}
