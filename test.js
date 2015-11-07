var Generator = require('audio-generator');
var Spectrum = require('./');
var Processor = require('audio-processor');
var Speaker = require('audio-speaker');
var isBrowser = require('is-browser');

var spectrum = Spectrum({
	fftSize: 1024*2,
	smoothingTimeConstant: 0.8
});

if (isBrowser) document.documentElement.appendChild(spectrum.canvas);

Generator({
	generate: function (time) {
		return [
			(Math.random() * 2  - 1),
			(Math.random() * 2  - 1),
			// Math.cos(Math.PI * 2 * 20 * time) / 2
			// + Math.cos(Math.PI * 2 * 50 * time) / 2
			// + Math.cos(Math.PI * 2 * 1000 * time)
			// + Math.cos(Math.PI * 2 * 5000 * time) / 2
			// + Math.cos(Math.PI * 2 * 10000 * time) / 2
			// + Math.cos(Math.PI * 2 * 20000 * time) / 2
		]
	},
	duration: 5
})
.pipe(spectrum)
.on('render', function (canvas, data) {
	if (!isBrowser)	process.stdout.write(canvas._canvas.frame());
})
.pipe(Speaker());
