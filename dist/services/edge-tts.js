"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeTTS = void 0;
const stream_1 = require("stream");
const ws_1 = __importDefault(require("ws"));
const speech_api_config_1 = require("../configs/speech-api-config");
const audio_data_error_1 = require("../errors/audio-data-error");
const web_socket_initialize_error_1 = require("../errors/web-socket-initialize-error");
const tts_config_1 = require("../models/tts-config");
const generate_1 = __importDefault(require("../utils/generate"));
const edgeTTSDefaultConfig = {
    voice: "Microsoft Server Speech Text to Speech Voice (en-US, AriaNeural)",
    rate: "0%",
    volume: "0%",
    pitch: "0Hz",
};
class EdgeTTS {
    constructor(config) {
        if (config)
            this.config = config;
        else {
            this.config = edgeTTSDefaultConfig;
        }
    }
    listVoices() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${speech_api_config_1.SPEECH_API.VOICES_URL}?TrustedClientToken=${speech_api_config_1.SPEECH_API.TRUSTED_CLIENT_TOKEN}`);
            return yield response.json();
        });
    }
    toBase64(text, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getAudioStream(text, config, "base64");
        });
    }
    toRaw(text, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getAudioStream(text, config);
        });
    }
    getAudioStream(text, config, encoding) {
        return __awaiter(this, void 0, void 0, function* () {
            const audioStream = yield this.audioStreamHandler(text, config);
            if (!audioStream.length)
                throw new audio_data_error_1.AudioDataError();
            const audioBuffer = Buffer.concat(audioStream);
            return audioBuffer.toString(encoding);
        });
    }
    audioStreamHandler(text, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const audioStream = [];
            const abortController = new AbortController();
            const stream = new stream_1.PassThrough({ signal: abortController.signal });
            yield this.toStream(stream, text, config);
            return new Promise((resolve, reject) => {
                stream.on("data", (data) => {
                    const audioData = this.processAudioData(data);
                    if (audioData.length)
                        audioStream.push(audioData);
                });
                stream.on("close", () => resolve(audioStream));
                stream.on("error", (err) => reject(err));
            });
        });
    }
    processAudioData(data) {
        let audioData = Buffer.from([]);
        if (Buffer.isBuffer(data)) {
            const needle = Buffer.from("Path:audio\r\n");
            const uint8Data = new Uint8Array(data);
            const startIndex = uint8Data.indexOf(needle[0]);
            if (startIndex !== -1)
                audioData = data.subarray(startIndex + needle.length);
            if (data.includes("Path:turn.end"))
                this.ws.close();
        }
        return audioData;
    }
    toStream(stream, text, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const ttsConfig = this.buildTTSConfig(config);
            this.openWebSocketWithStream(stream, text, ttsConfig);
        });
    }
    buildTTSConfig(config) {
        return new tts_config_1.TTSConfig((config === null || config === void 0 ? void 0 : config.voice) || this.config.voice, (config === null || config === void 0 ? void 0 : config.rate) || this.config.rate, (config === null || config === void 0 ? void 0 : config.volume) || this.config.volume, (config === null || config === void 0 ? void 0 : config.pitch) || this.config.pitch, (config === null || config === void 0 ? void 0 : config.voiceLocale) || this.config.voiceLocale, (config === null || config === void 0 ? void 0 : config.outputFormat) || this.config.outputFormat);
    }
    openWebSocketWithStream(stream, text, ttsConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqId = generate_1.default.uuid();
            const configMessageSSML = ttsConfig.buildTTSConfigMessage();
            const ssml = ttsConfig.buildSSML(text);
            void this.sendSSMLWithReconnect(stream, reqId, configMessageSSML, ssml);
        });
    }
    sendSSMLWithReconnect(stream_2, reqId_1, configMessageSSML_1, ssml_1) {
        return __awaiter(this, arguments, void 0, function* (stream, reqId, configMessageSSML, ssml, maxAttempts = 3) {
            let isOpenWebSocket = false;
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                if (isOpenWebSocket)
                    continue;
                const verifyConnection = attempt === maxAttempts;
                try {
                    yield this.initWebSocket(stream, reqId, configMessageSSML, ssml, (value) => {
                        isOpenWebSocket = value;
                    });
                }
                catch (error) {
                    if (verifyConnection)
                        throw new web_socket_initialize_error_1.WebSocketInitializeError();
                    throw error;
                }
            }
        });
    }
    initWebSocket(stream, reqId, configMessageSSML, ssml, cbOpen) {
        return __awaiter(this, void 0, void 0, function* () {
            const wsAddress = `${speech_api_config_1.SPEECH_API.WSS_URL}?TrustedClientToken=${speech_api_config_1.SPEECH_API.TRUSTED_CLIENT_TOKEN}`;
            this.ws = new ws_1.default(wsAddress);
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
                    const isTurnEnd = typeof data === "string"
                        ? data.includes("Path:turn.end")
                        : Buffer.isBuffer(data) &&
                            data.toString("utf-8").includes("Path:turn.end");
                    if (isTurnEnd) {
                        this.ws.close();
                        stream.emit("close");
                    }
                });
                this.ws.on("close", () => {
                    stream.end(() => stream.emit("close"));
                });
                this.ws.on("error", (err) => {
                    stream.end(() => stream.emit("error", err));
                    reject(err);
                });
            });
        });
    }
}
exports.EdgeTTS = EdgeTTS;
