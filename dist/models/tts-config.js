"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTSConfig = void 0;
const speech_api_config_1 = require("../configs/speech-api-config");
const validate_1 = __importDefault(require("../utils/validate"));
class TTSConfig {
    constructor(voice, rate, volume, pitch, voiceLocale, outputFormat) {
        this.voice = voice;
        this.rate = rate;
        this.volume = volume;
        this.pitch = pitch;
        this.voiceLocale = voiceLocale;
        this.outputFormat = outputFormat;
        this.voice = validate_1.default.voice(this.voice);
        this.pitch = validate_1.default.pitch(this.pitch);
        this.rate = validate_1.default.rate(this.rate);
        this.volume = validate_1.default.volume(this.volume);
        this.voiceLocale = validate_1.default.voiceLocale(this.voice, this.voiceLocale);
        if (this.outputFormat) {
            this.outputFormat = validate_1.default.outputFormat(this.outputFormat);
        }
        else {
            this.outputFormat = speech_api_config_1.OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3;
        }
    }
    buildSSML(text) {
        // return `<speak version='1.0' xml:lang='en-US'><voice name='${this.voice}'><prosody pitch='${this.pitch}' rate='${this.rate}' volume='${this.volume}'>${text}</prosody></voice></speak>`;
        return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${this.voiceLocale}">
                <voice name="${this.voice}">
                    <prosody pitch="${this.pitch}" rate="${this.rate}" volume="${this.volume}">
                        ${text}
                    </prosody>
                </voice>
            </speak>`;
    }
    buildTTSConfigMessage() {
        // return (
        //   `X-Timestamp:${new Date().toISOString()}Z\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n` +
        //   `{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":false,"wordBoundaryEnabled":true},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`
        // );
        return `X-Timestamp:${new Date().toISOString()}Z\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{
      "context": {
          "synthesis": {
              "audio": {
                  "metadataoptions": {
                      "sentenceBoundaryEnabled": "true",
                      "wordBoundaryEnabled": "true"
                  },
                  "outputFormat": "${this.outputFormat}"
              }
          }
      }
  }`;
    }
}
exports.TTSConfig = TTSConfig;
