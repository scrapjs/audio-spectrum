# audio-spectrum [![unstable](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges) [![Greenkeeper badge](https://badges.greenkeeper.io/audiojs/audio.svg)](https://greenkeeper.io/)

Show spectrum of audio data.

## Usage

[![$ npm install audio-spectrum](http://nodei.co/npm/audio-spectrum.png?mini=true)](http://npmjs.org/package/audio-spectrum)


```js
let context = require('audio-context')()
let spectrum = require('audio-spectrum')()
let generate = require('audio-generator')(Math.random, {duration: 4})
let write = require('web-audio-write')(context.destination, {channels: 1})

function tick () {
  let buf = generate()
  write(buf, tick)
  spectrum(buf)
}
tick()
```

## API

#### let showSpectrum = Spectrum(options)

Create spectrum visualizer function with `showSpectrum(data)` signature. `options` may include `channel` to pick the channel to show and every option for [gl-spectrum](https://github.com/audio-lab/gl-spectrum).


## Analogs

* [frequency-viewer](https://www.npmjs.com/package/frequency-viewer) — show spectrum in browser.
* [sillyscope](https://www.npmjs.com/package/sillyscope) — oscilloscope and spectrogram in chromeless chrome.
