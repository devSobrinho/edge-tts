"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const speech_api_config_1 = require("../configs/speech-api-config");
const output_format_error_1 = require("../errors/output-format-error");
const pitch_error_1 = require("../errors/pitch-error");
const rate_error_1 = require("../errors/rate-error");
const voice_locale_error_1 = require("../errors/voice-locale-error");
const volume_error_1 = require("../errors/volume-error");
const validatePitch = (pitch) => {
    const isInvalidPitchEnum = !Object.values(speech_api_config_1.PITCH).includes(pitch);
    const isInvalidPitchFormat = !/^(-?\d{1,3}Hz)$/.test(pitch);
    if (isInvalidPitchEnum && isInvalidPitchFormat)
        throw new pitch_error_1.PitchError();
    return pitch;
};
const validateRate = (rate) => {
    const rateStr = rate.toString();
    const isValidEnum = Object.values(speech_api_config_1.RATE).includes(rateStr);
    const isValidFormat = /^-?\d{1,3}%$/.test(rateStr);
    if (!isValidEnum && !isValidFormat)
        throw new rate_error_1.RateError();
    return rateStr;
};
const validateVolume = (volume) => {
    const volumeStr = volume.toString();
    const isValidEnum = Object.values(speech_api_config_1.VOLUME).includes(volumeStr);
    const isValidFormat = /^-?\d{1,3}%$/.test(volumeStr);
    if (!isValidEnum && !isValidFormat)
        throw new volume_error_1.VolumeError();
    return volumeStr;
};
const validateVoiceLocale = (voiceName, voiceLocale) => {
    const match = /\w{2}-\w{2}/.exec(voiceLocale || voiceName);
    if (!match)
        throw new voice_locale_error_1.VoiceLocaleError();
    return match[0];
};
const validateVoice = (voice) => {
    const match = voice.match(/^([a-z]{2,})-([A-Z]{2,})-(.+Neural)$/);
    if (match) {
        const language = match[1];
        let locale = match[2];
        let voiceName = match[3];
        if (voiceName.includes("-")) {
            locale = locale + "-" + voiceName.split("-")[0];
            voiceName = voiceName.split("-")[1];
        }
        voice = `Microsoft Server Speech Text to Speech Voice (${language}-${locale}, ${voiceName})`;
    }
    return voice;
};
const outputFormat = (outputFormat) => {
    const isValidOutputFormat = Object.values(speech_api_config_1.OUTPUT_FORMAT).includes(outputFormat);
    if (!isValidOutputFormat)
        throw new output_format_error_1.OutputFormatError();
    return outputFormat;
};
const validate = {
    pitch: validatePitch,
    rate: validateRate,
    volume: validateVolume,
    voiceLocale: validateVoiceLocale,
    voice: validateVoice,
    outputFormat,
};
exports.default = validate;
