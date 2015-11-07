Render frequency domain of an audio signal in canvas, nothing more.

## Usage

[![$ npm install audio-spectrum](http://nodei.co/npm/audio-spectrum.png?mini=true)](http://npmjs.org/package/audio-spectrum)


```js
var Spectrum = require('audio-spectrum');
var Generator = require('audio-generator');
var isBrowser = require('is-browser');


//create spectrum plotter
var plotter = new Spectrum({
	//Frequency diapasone
	minFrequency:  20,
	maxFrequency:  20000,

	//Magnitude diapasone, in dB
	minDecibels:  -90,
	maxDecibels:  -0,

	//FFT transform size
	fftSize:  1024,
	smoothingTimeConstant:  0.2

	//...also pcm-format and rendering properties, see pcm-util and audio-render
});

//visualise, depending on the environment
if (isBrowser) {
	document.body.appendChild(plotter.element);
}
else {
	plotter.on('render', function (canvas) {
		process.stdout.write(canvas._canvas.frame());
	});
}

//send audio-stream to the plitter
Generator(function (time) {
	return Math.sin(Math.PI * 2 * 440 * time);
}).pipe(plotter);
```

## Related

> [audio-render](https://npmjs.org/package/audio-render) — render node for audio-streams.<br/>
> [audio-analyser](https://npmjs.org/package/audio-analyser) — analyser node for audio-streams.<br/>
> [pcm-util](https://npmjs.org/package/pcm-util) — utils to work with pcm-streams.<br/>
> [drawille-canvas](https://github.com/madbence/node-drawille-canvas) — paint in terminal with braille characters.<br/>
> [frequency-viewer](https://www.npmjs.com/package/frequency-viewer) — show spectrum in browser by @substack.
> [sillyscope](https://www.npmjs.com/package/sillyscope) — oscilloscope and spectrogram in chromeless chrome by @substack.
> [AnalyserNode](https://developer.mozilla.org/en/docs/Web/API/AnalyserNode) — web-audio-api frequency analyser node.<br/>