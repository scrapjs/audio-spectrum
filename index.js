/**
 * Draw spectrum
 *
 * @module  audio-spectrum
 */

'use strict'

const createSpectrum = require('gl-spectrum')
const blackman = require('scijs-window-functions/blackman-harris');
const fft = require('fourier-transform')
const isAudioBuffer = require('is-audio-buffer')
const db = require('decibels')

module.exports = Spectrum

/**
 * @constructor
 */
function Spectrum (options) {
	if (!(this instanceof Spectrum)) return new Spectrum(options);

	if (!options) options = {}
	options.interactions = false
	let spectrum = createSpectrum(options)
	let channel = options.channel || 0

	return function write (data, callback) {
		if (!data) return null

		if (isAudioBuffer(data)) {
			data = data.getChannelData(channel)
		}

		data = data.slice()

		//apply window
		for (let i = 0, l = data.length; i < l; i++) {
			data[i] *= blackman(i, l)
		}

		//do fft
		let mags = fft(data)

		//convert to magnitudes
		for (let i = 0, l = mags.length; i < l; i++) {
			mags[i] = db.fromGain(mags[i])
		}

		//draw
		spectrum.set(mags)

		return mags
	}
}


module.exports = Spectrum;
