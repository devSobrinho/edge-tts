import { OUTPUT_FORMAT, PITCH, RATE, VOLUME } from "../configs/speech-api-config";
declare const validate: {
    pitch: (pitch: PITCH | string) => string;
    rate: (rate: RATE | string | number) => string;
    volume: (volume: VOLUME | string | number) => string;
    voiceLocale: (voiceName: string, voiceLocale?: string) => string | undefined;
    voice: (voice: string) => string;
    outputFormat: (outputFormat: OUTPUT_FORMAT | string) => OUTPUT_FORMAT;
};
export default validate;
