import {
  OUTPUT_FORMAT,
  PITCH,
  RATE,
  VOLUME,
} from "../configs/speech-api-config";
import validate from "../utils/validate";

export class TTSConfig {
  constructor(
    public voice: string,
    public rate: RATE | string | number,
    public volume: VOLUME | string | number,
    public pitch: PITCH | string,
    public voiceLocale?: string,
    public outputFormat?: OUTPUT_FORMAT
  ) {
    this.voice = validate.voice(this.voice);
    this.pitch = validate.pitch(this.pitch);
    this.rate = validate.rate(this.rate);
    this.volume = validate.volume(this.volume);
    this.voiceLocale = validate.voiceLocale(this.voice, this.voiceLocale);
    if (this.outputFormat) {
      this.outputFormat = validate.outputFormat(this.outputFormat);
    } else {
      this.outputFormat = OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3;
    }
  }

  buildSSML(text: string): string {
    // return `<speak version='1.0' xml:lang='en-US'><voice name='${this.voice}'><prosody pitch='${this.pitch}' rate='${this.rate}' volume='${this.volume}'>${text}</prosody></voice></speak>`;
    return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${this.voiceLocale}">
                <voice name="${this.voice}">
                    <prosody pitch="${this.pitch}" rate="${this.rate}" volume="${this.volume}">
                        ${text}
                    </prosody>
                </voice>
            </speak>`;
  }

  buildTTSConfigMessage(): string {
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
