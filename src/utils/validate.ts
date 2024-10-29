import {
  OUTPUT_FORMAT,
  PITCH,
  RATE,
  VOLUME,
} from "../configs/speech-api-config";
import { OutputFormatError } from "../errors/output-format-error";
import { PitchError } from "../errors/pitch-error";
import { RateError } from "../errors/rate-error";
import { VoiceLocaleError } from "../errors/voice-locale-error";
import { VolumeError } from "../errors/volume-error";

const validatePitch = (pitch: PITCH | string): string => {
  const isInvalidPitchEnum = !Object.values(PITCH).includes(pitch as PITCH);
  const isInvalidPitchFormat = !/^(-?\d{1,3}Hz)$/.test(pitch as string);
  if (isInvalidPitchEnum && isInvalidPitchFormat) throw new PitchError();
  return pitch;
};

const validateRate = (rate: RATE | string | number): string => {
  const rateStr = rate.toString();
  const isValidEnum = Object.values(RATE).includes(rateStr as RATE);
  const isValidFormat = /^-?\d{1,3}%$/.test(rateStr);
  if (!isValidEnum && !isValidFormat) throw new RateError();
  return rateStr;
};

const validateVolume = (volume: VOLUME | string | number): string => {
  const volumeStr = volume.toString();
  const isValidEnum = Object.values(VOLUME).includes(volumeStr as VOLUME);
  const isValidFormat = /^-?\d{1,3}%$/.test(volumeStr);
  if (!isValidEnum && !isValidFormat) throw new VolumeError();
  return volumeStr;
};

const validateVoiceLocale = (
  voiceName: string,
  voiceLocale?: string
): string | undefined => {
  const match = /\w{2}-\w{2}/.exec(voiceLocale || voiceName);
  if (!match) throw new VoiceLocaleError();
  return match[0];
};

const validateVoice = (voice: string): string => {
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

const outputFormat = (outputFormat: OUTPUT_FORMAT | string): OUTPUT_FORMAT => {
  const isValidOutputFormat = Object.values(OUTPUT_FORMAT).includes(
    outputFormat as OUTPUT_FORMAT
  );
  if (!isValidOutputFormat) throw new OutputFormatError();
  return outputFormat as OUTPUT_FORMAT;
};

const validate = {
  pitch: validatePitch,
  rate: validateRate,
  volume: validateVolume,
  voiceLocale: validateVoiceLocale,
  voice: validateVoice,
  outputFormat,
};

export default validate;
