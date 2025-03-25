import { PassThrough } from "stream";
import WebSocket from "ws";

import { SPEECH_API } from "../configs/speech-api-config";
import { AudioDataError } from "../errors/audio-data-error";
import { WebSocketInitializeError } from "../errors/web-socket-initialize-error";
import {
  EdgeTTSSynthesizeConfig,
  EdgeTTSVoice,
} from "../interfaces/edge-tts-interface";
import { TTSConfig } from "../models/tts-config";
import generate from "../utils/generate";

const edgeTTSDefaultConfig: EdgeTTSSynthesizeConfig = {
  voice: "Microsoft Server Speech Text to Speech Voice (en-US, AriaNeural)",
  rate: "0%",
  volume: "0%",
  pitch: "0Hz",
};

export class EdgeTTS {
  private ws!: WebSocket;
  private config: Partial<EdgeTTSSynthesizeConfig>;

  constructor(config?: Partial<EdgeTTSSynthesizeConfig>) {
    if (config) this.config = config;
    else {
      this.config = edgeTTSDefaultConfig;
    }
  }

  async listVoices(): Promise<EdgeTTSVoice[]> {
    const response = await fetch(
      `${SPEECH_API.VOICES_URL}?TrustedClientToken=${SPEECH_API.TRUSTED_CLIENT_TOKEN}`
    );
    return await response.json();
  }

  async toBase64(
    text: string,
    config?: Partial<EdgeTTSSynthesizeConfig>
  ): Promise<string> {
    return this.getAudioStream(text, config, "base64");
  }

  async toRaw(
    text: string,
    config?: Partial<EdgeTTSSynthesizeConfig>
  ): Promise<string> {
    return this.getAudioStream(text, config);
  }

  private async getAudioStream(
    text: string,
    config?: Partial<EdgeTTSSynthesizeConfig>,
    encoding?: BufferEncoding
  ): Promise<string> {
    const audioStream = await this.audioStreamHandler(text, config);
    if (!audioStream.length) throw new AudioDataError();
    const audioBuffer = Buffer.concat(audioStream);
    return audioBuffer.toString(encoding);
  }

  private async audioStreamHandler(
    text: string,
    config?: Partial<EdgeTTSSynthesizeConfig>
  ): Promise<Buffer<ArrayBufferLike>[]> {
    const audioStream: Buffer<ArrayBufferLike>[] = [];
    const abortController = new AbortController();
    const stream = new PassThrough({ signal: abortController.signal });
    await this.toStream(stream, text, config);
    return new Promise((resolve, reject) => {
      stream.on("data", (data) => {
        const audioData = this.processAudioData(data);
        if (audioData.length) audioStream.push(audioData);
      });
      stream.on("close", () => resolve(audioStream));
      stream.on("error", (err) => reject(err));
    });
  }

  private processAudioData(
    data: Buffer | ArrayBuffer | Buffer[]
  ): Buffer<ArrayBufferLike> {
    let audioData: Buffer<ArrayBufferLike> = Buffer.from([]);
    if (Buffer.isBuffer(data)) {
      const needle = Buffer.from("Path:audio\r\n");
      const uint8Data = new Uint8Array(data);
      const startIndex = uint8Data.indexOf(needle[0]);
      if (startIndex !== -1)
        audioData = data.subarray(startIndex + needle.length);
      if (data.includes("Path:turn.end")) this.ws.close();
    }
    return audioData;
  }

  async toStream(
    stream: PassThrough,
    text: string,
    config?: Partial<EdgeTTSSynthesizeConfig>
  ): Promise<void> {
    const ttsConfig = this.buildTTSConfig(config);
    this.openWebSocketWithStream(stream, text, ttsConfig);
  }

  private buildTTSConfig(config?: Partial<EdgeTTSSynthesizeConfig>): TTSConfig {
    return new TTSConfig(
      config?.voice || this.config.voice!,
      config?.rate || this.config.rate!,
      config?.volume || this.config.volume!,
      config?.pitch || this.config.pitch!,
      config?.voiceLocale || this.config.voiceLocale,
      config?.outputFormat || this.config.outputFormat
    );
  }

  private async openWebSocketWithStream(
    stream: PassThrough,
    text: string,
    ttsConfig: TTSConfig
  ): Promise<void> {
    const reqId = generate.uuid();
    const configMessageSSML = ttsConfig.buildTTSConfigMessage();
    const ssml = ttsConfig.buildSSML(text);
    void this.sendSSMLWithReconnect(stream, reqId, configMessageSSML, ssml);
  }

  private async sendSSMLWithReconnect(
    stream: PassThrough,
    reqId: string,
    configMessageSSML: string,
    ssml: string,
    maxAttempts = 3
  ): Promise<void> {
    let isOpenWebSocket = false;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      if (isOpenWebSocket) continue;
      const verifyConnection = attempt === maxAttempts;
      try {
        await this.initWebSocket(
          stream,
          reqId,
          configMessageSSML,
          ssml,
          (value) => {
            isOpenWebSocket = value;
          }
        );
      } catch (error) {
        if (verifyConnection) throw new WebSocketInitializeError();
        throw error;
      }
    }
  }

  private async initWebSocket(
    stream: PassThrough,
    reqId: string,
    configMessageSSML: string,
    ssml: string,
    cbOpen: (value: boolean) => void
  ): Promise<void> {
    const wsAddress = `${SPEECH_API.WSS_URL}?TrustedClientToken=${SPEECH_API.TRUSTED_CLIENT_TOKEN}`;
    this.ws = new WebSocket(wsAddress);
    return new Promise((resolve, reject) => {
      this.ws.on("open", () => {
        this.ws.send(configMessageSSML);
        const speechMessage = `X-RequestId:${reqId}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${new Date().toISOString()}Z\r\nPath:ssml\r\n\r\n${ssml}`;
        this.ws.send(speechMessage);
        cbOpen(true);
        resolve();
      });

      this.ws.on("message", (data) => {
        stream.push(data);

        const isTurnEnd =
          typeof data === "string"
            ? (data as string).includes("Path:turn.end")
            : Buffer.isBuffer(data) &&
              data.toString("utf-8").includes("Path:turn.end");

        if (isTurnEnd) this.ws.close();
      });

      this.ws.on("close", () => {
        stream.end(() => stream.emit("close"));
      });

      this.ws.on("error", (err) => {
        stream.end(() => stream.emit("error", err));
        reject(err);
      });
    });
  }
}
