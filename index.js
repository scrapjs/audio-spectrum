/**
 * Draw spectrum
 *
 * @module  audio-spectrum
 */

var inherits = require('inherits');
var Render = require('audio-render');


/**
 * @constructor
 */
function Spectrum (options) {
	if (!(this instanceof Spectrum)) return new Spectrum(options);

	Render.call(this, options);
}

inherits(Spectrum, Render);


//Display frequencies logarithmically or linearly
// Spectrum.prototype.log = true;


/** Render frame */
Spectrum.prototype.render = function (canvas) {
	var self = this;

	//magnitude varies from -100 (min) to 0 (max)
	var magnitude = self.getFrequencyData(self.fftSize/2);

	//plot collected frequencies
	var context = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;
	var magLength = magnitude.length;
	var step = width / magLength;
	context.clearRect(0, 0, width, height);
	var dbRange = self.maxDecibels - self.minDecibels;

	for (var i = 0; i < magLength; i++) {
		var magHeight = height * (magnitude[i] - self.minDecibels) / dbRange;
		context.fillRect(i * step, height - magHeight, 1, magHeight);
	}
}


module.exports = Spectrum;