import { PassThrough } from "stream";
import {
  OUTPUT_FORMAT,
  PITCH,
  RATE,
  VOLUME,
} from "../configs/speech-api-config";

interface VoiceTag {
  ContentCategories: string[];
  VoicePersonalities: string[];
}

export interface EdgeTTSVoice {
  Name: string;
  ShortName: string;
  Gender: string;
  Locale: string;
  FriendlyName: string;
  SuggestedCodec?: string;
  Status?: string;
  VoiceTag?: VoiceTag;
}

export interface EdgeTTSSynthesizeConfig {
  voice?: string;
  rate: RATE | string | number;
  volume: VOLUME | string | number;
  pitch: PITCH | string;
  voiceLocale?: string;
  outputFormat?: OUTPUT_FORMAT;
}

export interface EdgeTTSToStreamOutput {
  stream: PassThrough;
  abort: () => void;
}
