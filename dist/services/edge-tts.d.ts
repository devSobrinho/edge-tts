import { PassThrough } from "stream";
import { EdgeTTSSynthesizeConfig, EdgeTTSVoice } from "../interfaces/edge-tts-interface";
export declare class EdgeTTS {
    private ws;
    private config;
    constructor(config?: Partial<EdgeTTSSynthesizeConfig>);
    listVoices(): Promise<EdgeTTSVoice[]>;
    toBase64(text: string, config?: Partial<EdgeTTSSynthesizeConfig>): Promise<string>;
    toRaw(text: string, config?: Partial<EdgeTTSSynthesizeConfig>): Promise<string>;
    private getAudioStream;
    private audioStreamHandler;
    private processAudioData;
    toStream(stream: PassThrough, text: string, config?: Partial<EdgeTTSSynthesizeConfig>): Promise<void>;
    private buildTTSConfig;
    private openWebSocketWithStream;
    private sendSSMLWithReconnect;
    private initWebSocket;
}
