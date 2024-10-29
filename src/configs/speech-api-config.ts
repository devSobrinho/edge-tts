const BASE_URL_AUX =
  "speech.platform.bing.com/consumer/speech/synthesize/readaloud";
const TRUSTED_CLIENT_TOKEN_AUX = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const WSS_URL_AUX = `wss://${BASE_URL_AUX}/edge/v1`;
const VOICES_URL_AUX = `https://${BASE_URL_AUX}/voices/list`;

export enum SPEECH_API {
  BASE_URL = BASE_URL_AUX,
  TRUSTED_CLIENT_TOKEN = TRUSTED_CLIENT_TOKEN_AUX,
  WSS_URL = WSS_URL_AUX,
  VOICES_URL = VOICES_URL_AUX,
}

export enum OUTPUT_FORMAT {
  AUDIO_24KHZ_48KBITRATE_MONO_MP3 = "audio-24khz-48kbitrate-mono-mp3",
  AUDIO_24KHZ_96KBITRATE_MONO_MP3 = "audio-24khz-96kbitrate-mono-mp3",
  WEBM_24KHZ_16BIT_MONO_OPUS = "webm-24khz-16bit-mono-opus",
}

export enum PITCH {
  X_LOW = "x-low",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  X_HIGH = "x-high",
  DEFAULT = "default",
}

export enum RATE {
  X_SLOW = "x-slow",
  SLOW = "slow",
  MEDIUM = "medium",
  FAST = "fast",
  X_FAST = "x-fast",
  DEFAULT = "default",
}

export enum VOLUME {
  SILENT = "silent",
  X_SOFT = "x-soft",
  SOFT = "soft",
  MEDIUM = "medium",
  LOUD = "loud",
  X_LOUD = "x-LOUD",
  DEFAULT = "default",
}
