'use-strict'

const Generator = require('audio-generator/direct')
const Spectrum = require('./');
const Writer = require('web-audio-write')
const Context = require('audio-context')

let context = Context()

let spectrum = Spectrum({
	smoothingTimeConstant: 0.8
})

let generate = Generator((time) => {
		return [
			// (Math.random() * 2  - 1),
			// (Math.random() * 2  - 1),
			// Math.cos(Math.PI * 2 * 20 * time) / 2
			// + Math.cos(Math.PI * 2 * 50 * time) / 2
			+ Math.cos(Math.PI * 2 * 60 * time)
			+ Math.cos(Math.PI * 2 * 220 * time) / 2
			+ Math.cos(Math.PI * 2 * 1000 * time) / 3
			+ Math.cos(Math.PI * 2 * 4000 * time) / 5
			// + Math.cos(Math.PI * 2 * 20000 * time) / 2
		]
	}, {
	duration: 4
})

let write = Writer(context.destination, {channels: 2})


function tick () {
	let buf = generate()

	write(buf, tick)

	spectrum(buf)
}

tick()
