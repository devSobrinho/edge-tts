"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VOLUME = exports.RATE = exports.PITCH = exports.OUTPUT_FORMAT = exports.SPEECH_API = void 0;
const BASE_URL_AUX = "speech.platform.bing.com/consumer/speech/synthesize/readaloud";
const TRUSTED_CLIENT_TOKEN_AUX = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const WSS_URL_AUX = `wss://${BASE_URL_AUX}/edge/v1`;
const VOICES_URL_AUX = `https://${BASE_URL_AUX}/voices/list`;
var SPEECH_API;
(function (SPEECH_API) {
    SPEECH_API["BASE_URL"] = "speech.platform.bing.com/consumer/speech/synthesize/readaloud";
    SPEECH_API["TRUSTED_CLIENT_TOKEN"] = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
    SPEECH_API["WSS_URL"] = "wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1";
    SPEECH_API["VOICES_URL"] = "https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list";
})(SPEECH_API || (exports.SPEECH_API = SPEECH_API = {}));
var OUTPUT_FORMAT;
(function (OUTPUT_FORMAT) {
    OUTPUT_FORMAT["AUDIO_24KHZ_48KBITRATE_MONO_MP3"] = "audio-24khz-48kbitrate-mono-mp3";
    OUTPUT_FORMAT["AUDIO_24KHZ_96KBITRATE_MONO_MP3"] = "audio-24khz-96kbitrate-mono-mp3";
    OUTPUT_FORMAT["WEBM_24KHZ_16BIT_MONO_OPUS"] = "webm-24khz-16bit-mono-opus";
})(OUTPUT_FORMAT || (exports.OUTPUT_FORMAT = OUTPUT_FORMAT = {}));
var PITCH;
(function (PITCH) {
    PITCH["X_LOW"] = "x-low";
    PITCH["LOW"] = "low";
    PITCH["MEDIUM"] = "medium";
    PITCH["HIGH"] = "high";
    PITCH["X_HIGH"] = "x-high";
    PITCH["DEFAULT"] = "default";
})(PITCH || (exports.PITCH = PITCH = {}));
var RATE;
(function (RATE) {
    RATE["X_SLOW"] = "x-slow";
    RATE["SLOW"] = "slow";
    RATE["MEDIUM"] = "medium";
    RATE["FAST"] = "fast";
    RATE["X_FAST"] = "x-fast";
    RATE["DEFAULT"] = "default";
})(RATE || (exports.RATE = RATE = {}));
var VOLUME;
(function (VOLUME) {
    VOLUME["SILENT"] = "silent";
    VOLUME["X_SOFT"] = "x-soft";
    VOLUME["SOFT"] = "soft";
    VOLUME["MEDIUM"] = "medium";
    VOLUME["LOUD"] = "loud";
    VOLUME["X_LOUD"] = "x-LOUD";
    VOLUME["DEFAULT"] = "default";
})(VOLUME || (exports.VOLUME = VOLUME = {}));
