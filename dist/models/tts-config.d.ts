import { OUTPUT_FORMAT, PITCH, RATE, VOLUME } from "../configs/speech-api-config";
export declare class TTSConfig {
    voice: string;
    rate: RATE | string | number;
    volume: VOLUME | string | number;
    pitch: PITCH | string;
    voiceLocale?: string | undefined;
    outputFormat?: OUTPUT_FORMAT | undefined;
    constructor(voice: string, rate: RATE | string | number, volume: VOLUME | string | number, pitch: PITCH | string, voiceLocale?: string | undefined, outputFormat?: OUTPUT_FORMAT | undefined);
    buildSSML(text: string): string;
    buildTTSConfigMessage(): string;
}
