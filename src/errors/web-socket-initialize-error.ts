import { AppError } from "./app-error";

export class WebSocketInitializeError extends AppError {
  constructor() {
    super("WebSocket not initialized.");
    this.name = WebSocketInitializeError.name;
  }
}
