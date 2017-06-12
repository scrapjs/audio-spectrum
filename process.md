## TODOs

* Automatically recalculate frequencyBins
* Draw frequency grid
* Engage frequency diapasone
* Mark numbers, db and hz
* Add logarithmic option

## Q: Should we render grid as a separate component?
+ Allows for reusing it in audio-waveform, audio-spectrogram etc.
- Complicates grid algorithm.
	- Trouble of passing labels, axis names etc
+ Allows for complex scaling-redistribution logic, like thetamath
	- Still have to sync that with the data
- Trouble of alignment the grid with the plot, especially labels
+ How are you going to render text in webgl/canvas? That is troublesome to work with it.Grid definitely should be html-rendered.
	+ HTML grid allows for more flexible styling, also it is pixel-perfect.
✔ Ok, separate component, later. Call it plot-grid.

## Q: Should we externalize FFT and leave only frequency data setter?
- If we only set frequency, basically we only have shader’s code. What is sense then?
	+ ✔ We have an opinionated visualizator with different styles. And that is good. We don’t have anything extra, irrelevant to drawing. Pass style settings to options.

## Q: How do we implement stft in webgl?
+ glsl-fft, takes input audio data, does fft or ifft.
	- actually as far as we need fft only for display purposes, it would be significantly simpler just to do it in web-workers. That would even allow for any type of dft - we don’t really care about complexity. Doing any sort of such thing in WebGL would block stream inevitably. So safely use ndarray-fft.
	+ but still we need to send data to shader. Nothing we can do about it.
		- at least it is done in animation frame.
- What if to use straightforward dft?
	1. Take a set of line-sine textures, do r-i masking/summing on amplitudes O(C)
	2. Sum values O(N) = here you have per-frequency representation
- ✔ See gl-spectrum. All methods: dft, fft and even formants ft available in there.

## Q: from the deep learning lecture, nowadays algorithms have rich data and memory. Can we apply recognition of sound patterns to input signal?

- ✔ Irrelevant to this package, but good question. Reference to gl-formant or gl-spectrum. That is a task of separate package.

## Q: How should we pass textures into shaders?
+ Ideally just set number of texture spot, that’s it. Like inst.bindFrequency(idx).

## Q: How do we provide composable structure?
* We may want to separately draw grid, log-grid, waveform, spectrogram, numbers, extra-info.
	* All that is basically layers to be drawed. Or simply - textures.
		* But they should act individually. In sense that single require should be enough to render a scene with only this image.
* ≡ Options
	* gl-layers? launches enqueued layers stack to render...
		+ good for audio-lab, in case if want to render lots of items
			→ Create audio-lab component, composing inner module renderers
		+ place layers to verteces, textures as sprites
			→ Bind multiple buffers
	* gl-scene-graph? renders interconnected objects...
		+ each object has texture, color, coordinates, transformation matrix.
			→ per-component buffer
		+ useful for audio-pulse, because it consists of connected objects.
			→
		+ basically similar to gl-layers, object attributes are in vertex buffers, the scene is rendered fully.
			→
		+ scene graph is easy to render via DOM (dom is a scenegraph basically)
			→ do component impl of that
	* Look for regl API, or gl-shader-output, a-big-triangle, they return renderer function.
		- these are singleton solutions. We need combined scene.
		- comp.draw is alright also
	* glslify in-shader processing?
		+ avoids FBO switching problem, things are rendered in single pass.
			- gl-scene also avoids that
			- that is not scary thing
		- headache of writing own gl launch.
		- glslify is pain
	* gl-vis, sounds ideally
		+ exposes `draw` methods, which sets up fbo etc, renders sub-components
		✔ best pattern, as combines 2 sides.
* Ideally, we bind program/framebuffer/textures/unis, then render it.
	- no data returned. If user needs - let he read himself
	- no data sent (via stream etc.). If user needs - let him send himself
	- max number of textures is limited :(.
	- let user set viewport manually, dont care about viewbox
		- will not work with canvas2d
		- unable to intercept variables of vp

