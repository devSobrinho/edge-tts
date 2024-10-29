# Edge TTS Server-Side Package

Server-side implementation of the Edge TTS package — utilizing the Microsoft Edge Read Aloud API to generate text-to-speech with support for data streaming or Base64 encoding.

## Features

- **Text-to-Speech Conversion**: Effortlessly convert text into natural-sounding speech using Microsoft Edge's TTS capabilities.
- **Voice Customization**: Access a wide range of voices and adjust rate, volume, and pitch to tailor the output for your project.
- **Flexible Audio Output**: Export synthesized audio in various formats including streaming, raw audio, or Base64-encoded output.

## Installation

Install the Edge TTS package via npm or bun by running one of the following commands:

```bash
npm install @devsobrinho/edge-tts
```

```bash
yarn add @devsobrinho/edge-tts
```

```bash
bun add @devsobrinho/edge-tts
```

## Configuration Options

The `EdgeTTS` package allows for configuration either globally or on a per-method basis:

- **Global Configuration**: Pass a configuration object to the constructor for a persistent setup.
- **Dynamic Method Configuration**: Optionally override global settings by passing a configuration object to individual methods (`toRaw`, `toBase64`, or `toStream`).

The `EdgeTTSSynthesizeConfig` interface defines the following configurable options:

```typescript
export interface EdgeTTSSynthesizeConfig {
  voice?: string;
  rate: RATE | string | number;
  volume: VOLUME | string | number;
  pitch: PITCH | string;
  voiceLocale?: string;
  outputFormat?: OUTPUT_FORMAT;
}
```

## Usage Examples

### Streaming Output

The following example shows how to stream the generated audio data:

```typescript
import { EdgeTTS } from "@devsobrinho/edge-tts";
import { PassThrough } from "stream";

const abortController = new AbortController();
const stream = new PassThrough({ signal: abortController.signal });
const edgeTTS = new EdgeTTS();

await edgeTTS.toStream(
  stream,
  "Hello, my name is Francisca, and I am your virtual assistant.",
  {
    voice:
      "Microsoft Server Speech Text to Speech Voice (pt-BR, FranciscaNeural)",
    volume: "50%",
  }
);

stream.on("data", (data) => {
  console.log("Data chunk received:", data);
});

stream.on("close", () => {
  console.log("Stream closed.");
});

stream.on("error", (err) => {
  console.error("Stream error:", err);
});
```

### Base64 Output

For projects where Base64 encoding is more suitable, here’s an example:

```typescript
import { EdgeTTS } from "@devsobrinho/edge-tts";

const edgeTTS = new EdgeTTS();

const base64Audio = await edgeTTS.toBase64(
  "Hello, my name is Francisca, and I am your virtual assistant.",
  {
    voice:
      "Microsoft Server Speech Text to Speech Voice (pt-BR, FranciscaNeural)",
    volume: "50%",
  }
);

console.log("Base64 Audio:", base64Audio);
```

## Acknowledgments

We would like to thank the developers and contributors of related projects for their valuable groundwork and inspiration, including:

- [rany2/edge-tts](https://github.com/rany2/edge-tts/tree/master/examples)
