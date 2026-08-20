<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity'
	import type { LinearProgressProps } from './types.ts'

	let {
		value = 0,
		max = 1,
		indeterminate = false,
		fourColor = false,
		buffer = 0,
		wavy = false,
		track = true,
		...attributes
	}: LinearProgressProps = $props()

	const WAVE_AMPLITUDE = 3
	const WAVE_THICKNESS = 4
	const DETERMINATE_WAVELENGTH = 40
	const INDETERMINATE_WAVELENGTH = 20

	const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)', false)
	let wave = $derived(wavy && !reducedMotion.current)

	let wavelength = $derived(indeterminate ? INDETERMINATE_WAVELENGTH : DETERMINATE_WAVELENGTH)
	const amplitudeFor = (fraction: number) =>
		!wave ? 0 : indeterminate || (fraction > 0.1 && fraction < 0.95) ? 1 : 0

	const cubicBezier = (x1: number, y1: number, x2: number, y2: number) => {
		const A = (a: number, b: number) => 1 - 3 * b + 3 * a
		const B = (a: number, b: number) => 3 * b - 6 * a
		const bez = (t: number, a: number, b: number) => ((A(a, b) * t + B(a, b)) * t + 3 * a) * t
		const slope = (t: number) => (3 * A(x1, x2) * t + 2 * B(x1, x2)) * t + 3 * x1
		return (x: number) => {
			if (x <= 0) return 0
			if (x >= 1) return 1
			let t = x
			for (let i = 0; i < 8; i++) {
				const err = bez(t, x1, x2) - x
				if (Math.abs(err) < 1e-6) break
				const d = slope(t)
				if (Math.abs(d) < 1e-6) break
				t -= err / d
			}
			return bez(t, y1, y2)
		}
	}
	const accelerate = cubicBezier(0.3, 0, 0.8, 0.15)
	const CYCLE = 1750
	const RAMPS = [
		[0, 1000],
		[250, 1000],
		[650, 850],
		[900, 850],
	] as const
	const rampAt = (t: number, delay: number, duration: number) =>
		t <= delay ? 0 : t >= delay + duration ? 1 : accelerate((t - delay) / duration)

	const WAVE_STEPS = 12
	let containerWidth = $state(0)
	let wavePathA = $state<SVGPathElement>()
	let wavePathB = $state<SVGPathElement>()
	let renderedAmplitude = 0

	const buildWave = (width: number, len: number, amp: number, phase: number) => {
		const height = WAVE_THICKNESS + 2 * WAVE_AMPLITUDE
		const mid = height / 2
		const step = len / WAVE_STEPS
		const xs: number[] = []
		const ys: number[] = []
		for (let x = 0; x <= width + step; x += step) {
			xs.push(x)
			ys.push(mid - amp * WAVE_AMPLITUDE * Math.cos(((x + phase) / len) * Math.PI * 2))
		}
		let d = `M${xs[0].toFixed(2)},${ys[0].toFixed(2)}`
		const cum = [0]
		for (let i = 1; i < xs.length; i++) {
			d += `L${xs[i].toFixed(2)},${ys[i].toFixed(2)}`
			cum.push(cum[i - 1] + Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1]))
		}
		return { d, xs, cum, step, total: cum[cum.length - 1] }
	}

	type Wave = ReturnType<typeof buildWave>
	const lengthAt = (wave: Wave, x: number) => {
		if (x <= 0) return 0
		const i = Math.min(wave.xs.length - 2, Math.max(0, Math.floor(x / wave.step)))
		const span = wave.xs[i + 1] - wave.xs[i]
		const f = span > 0 ? Math.min(1, Math.max(0, (x - wave.xs[i]) / span)) : 0
		return wave.cum[i] + (wave.cum[i + 1] - wave.cum[i]) * f
	}

	const trim = (path: SVGPathElement | undefined, wave: Wave, x0: number, x1: number) => {
		if (!path) return
		const cap = WAVE_THICKNESS / 2
		const from = x0 + cap
		const to = x1 - cap
		if (to <= from) {
			path.style.visibility = 'hidden'
			return
		}
		path.style.visibility = ''
		const a = lengthAt(wave, from)
		const b = lengthAt(wave, to)
		path.setAttribute('d', wave.d)
		path.style.strokeDasharray = `${b - a} ${wave.total}`
		path.style.strokeDashoffset = `${-a}`
	}

	$effect(() => {
		if (!wave || !containerWidth) return
		const len = wavelength
		const width = containerWidth
		const host = wavePathA?.closest('.progress') as HTMLElement | null
		const hostStyles = host && getComputedStyle(host)
		let raf = 0
		let last = 0
		const frame = (now: number) => {
			raf = requestAnimationFrame(frame)
			const dt = last ? Math.min(64, now - last) : 16
			last = now
			const phase = ((now / 1000) % 1) * len
			const eased =
				hostStyles && !indeterminate
					? parseFloat(hostStyles.getPropertyValue('--np-lp-percent'))
					: percent
			const shown = Number.isFinite(eased) ? eased : percent
			renderedAmplitude += (amplitudeFor(shown / 100) - renderedAmplitude) * Math.min(1, dt / 500)
			const wave = buildWave(width, len, renderedAmplitude, phase)
			if (indeterminate) {
				const t = now % CYCLE
				const [h1, t1, h2, t2] = RAMPS.map(([d, u]) => rampAt(t, d, u))
				host?.style.setProperty('--np-lp-h1', `${h1 * 100}%`)
				host?.style.setProperty('--np-lp-t1', `${t1 * 100}%`)
				host?.style.setProperty('--np-lp-h2', `${h2 * 100}%`)
				host?.style.setProperty('--np-lp-t2', `${t2 * 100}%`)
				trim(wavePathA, wave, t1 * width, h1 * width)
				trim(wavePathB, wave, t2 * width, h2 * width)
			} else {
				trim(wavePathA, wave, 0, (shown / 100) * width)
			}
		}
		raf = requestAnimationFrame(frame)
		return () => cancelAnimationFrame(raf)
	})

	let bufferValue = $derived(buffer ?? 0)
	let hasBuffer = $derived(bufferValue > 0)

	const clamp = (n: number) => Math.min(100, Math.max(0, n))

	let percent = $derived(indeterminate ? 0 : clamp((value / max) * 100))
	let bufferPercent = $derived(indeterminate || !hasBuffer ? 100 : clamp((bufferValue / max) * 100))
	let gapOn = $derived(percent > 0 ? 1 : 0)

	let trackStyles = $derived(
		`--_percent:${percent}%;--np-lp-percent:${percent}%;--_buffer-percent:${bufferPercent}%;--_gap-on:${gapOn}`,
	)

	let hideDots = $derived(indeterminate || !hasBuffer || bufferValue >= max || value >= max)
</script>

<div class={['np-container', wave && 'wavy']} bind:clientWidth={containerWidth}>
	<div
		{...attributes}
		style={trackStyles}
		class={[
			'progress',
			indeterminate && 'indeterminate',
			fourColor && 'four-color',
			wave && 'wavy',
		]}
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax={max}
		aria-valuenow={indeterminate ? undefined : value}
	>
		{#if track}
			<div class="dots" hidden={hideDots}></div>
			{#if indeterminate}
				<div class="np-lp-track ahead"></div>
				<div class="np-lp-track between"></div>
				<div class="np-lp-track behind"></div>
			{:else}
				<div class="inactive-track"></div>
			{/if}
		{/if}
		{#if wave}
			<svg class="np-lp-wave" aria-hidden="true">
				<path bind:this={wavePathA} class="np-lp-wave-line"></path>
				{#if indeterminate}
					<path bind:this={wavePathB} class="np-lp-wave-line"></path>
				{/if}
			</svg>
		{:else}
			<div class="bar primary-bar">
				<div class="bar-inner"></div>
			</div>
			<div class="bar secondary-bar">
				<div class="bar-inner"></div>
			</div>
		{/if}
		{#if !indeterminate}
			<div class="stop-indicator"></div>
		{/if}
	</div>
</div>

<style>
	.np-container {
		border-radius: var(--np-linear-progress-track-shape, var(--np-shape-corner-full));
		display: flex;
		position: relative;
		min-width: 80px;
		height: var(--np-linear-progress-track-height, 0.25rem);
		content-visibility: auto;
		contain: strict;
	}
	.progress,
	.dots,
	.inactive-track,
	.bar,
	.bar-inner,
	.stop-indicator {
		position: absolute;
	}

	.progress {
		inset: 0;
		border-radius: inherit;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.progress:dir(rtl) {
		transform: scaleX(-1);
	}

	.stop-indicator {
		right: 0;
		width: var(--np-linear-progress-active-indicator-height, 0.25rem);
		height: var(--np-linear-progress-active-indicator-height, 0.25rem);
		border-radius: var(--np-shape-corner-full);
		background: var(--np-linear-progress-active-indicator-color, var(--np-color-primary));
	}

	.bar {
		animation: none;
		left: 0;
		width: 100%;
		height: var(--np-linear-progress-active-indicator-height, 0.25rem);
		transform-origin: left center;
		transition: transform var(--np-motion-expressive-default-effects);
	}

	.secondary-bar {
		display: none;
	}

	.bar-inner {
		inset: 0;
		animation: none;
		background: var(--np-linear-progress-active-indicator-color, var(--np-color-primary));
	}

	.progress:not(.indeterminate) .primary-bar {
		width: var(--_percent, 0%);
		transform: none;
		transition: width var(--np-motion-expressive-default-effects);
	}

	.progress:not(.indeterminate) .bar-inner {
		border-radius: var(--np-linear-progress-track-shape, var(--np-shape-corner-full));
	}

	.inactive-track {
		background: var(--np-linear-progress-track-color, var(--np-color-secondary-container));
		inset-block: 0;
		left: min(
			calc(var(--_percent, 0%) + var(--np-linear-progress-track-gap, 0.25rem) * var(--_gap-on, 0)),
			100%
		);
		right: calc(100% - var(--_buffer-percent, 100%));
		border-radius: var(--np-linear-progress-track-shape, var(--np-shape-corner-full));
		transition:
			left var(--np-motion-expressive-default-effects),
			right var(--np-motion-expressive-default-effects);
	}

	.dots {
		inset: 0;
		animation: linear infinite 250ms;
		animation-name: buffering;
		background-color: var(--np-linear-progress-track-color, var(--np-color-secondary-container));
		background-repeat: repeat-x;
		-webkit-mask-image: url("data:image/svg+xml,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'><circle cx='1' cy='1' r='1'/></svg>");
		mask-image: url("data:image/svg+xml,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'><circle cx='1' cy='1' r='1'/></svg>");
		z-index: -1;
	}

	.dots[hidden] {
		display: none;
	}

	.indeterminate .bar {
		transition: none;
		left: 0;
		transform: none;
		animation: none;
	}

	.indeterminate .secondary-bar {
		display: block;
	}

	@property --np-lp-h1 {
		syntax: '<percentage>';
		inherits: true;
		initial-value: 0%;
	}
	@property --np-lp-t1 {
		syntax: '<percentage>';
		inherits: true;
		initial-value: 0%;
	}
	@property --np-lp-h2 {
		syntax: '<percentage>';
		inherits: true;
		initial-value: 0%;
	}
	@property --np-lp-t2 {
		syntax: '<percentage>';
		inherits: true;
		initial-value: 0%;
	}
	@property --np-lp-percent {
		syntax: '<percentage>';
		inherits: true;
		initial-value: 0%;
	}

	.progress.wavy:not(.indeterminate) {
		transition: --np-lp-percent var(--np-motion-expressive-default-effects);
	}

	.progress.indeterminate {
		animation:
			np-lp-h1 1750ms linear infinite,
			np-lp-t1 1750ms linear infinite,
			np-lp-h2 1750ms linear infinite,
			np-lp-t2 1750ms linear infinite;
	}

	.indeterminate .bar-inner {
		inset-block: 0;
		transform: none;
		border-radius: var(--np-linear-progress-track-shape, var(--np-shape-corner-full));
	}

	.indeterminate .primary-bar > .bar-inner {
		left: var(--np-lp-t1);
		right: calc(100% - var(--np-lp-h1));
	}

	.indeterminate .secondary-bar > .bar-inner {
		left: var(--np-lp-t2);
		right: calc(100% - var(--np-lp-h2));
	}

	.indeterminate.four-color .bar-inner {
		animation: four-color calc(1750ms * 4) linear infinite;
	}

	.np-lp-track {
		position: absolute;
		inset-block: 0;
		background: var(--np-linear-progress-track-color, var(--np-color-secondary-container));
		border-radius: var(--np-linear-progress-track-shape, var(--np-shape-corner-full));
	}

	.indeterminate.four-color .np-lp-track {
		animation: four-color-track calc(1750ms * 4) linear infinite;
	}

	.np-lp-track.ahead {
		left: min(calc(var(--np-lp-h1) + var(--np-linear-progress-track-gap, 0.25rem)), 100%);
		right: 0;
	}

	.np-lp-track.between {
		left: min(calc(var(--np-lp-h2) + var(--np-linear-progress-track-gap, 0.25rem)), 100%);
		right: calc(
			100% - max(calc(var(--np-lp-t1) - var(--np-linear-progress-track-gap, 0.25rem)), 0%)
		);
	}

	.np-lp-track.behind {
		left: 0;
		right: calc(
			100% - max(calc(var(--np-lp-t2) - var(--np-linear-progress-track-gap, 0.25rem)), 0%)
		);
	}

	@keyframes np-lp-h1 {
		0% {
			--np-lp-h1: 0%;
			animation-timing-function: linear;
		}
		0% {
			--np-lp-h1: 0%;
			animation-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15);
		}
		57.143% {
			--np-lp-h1: 100%;
			animation-timing-function: linear;
		}
		100% {
			--np-lp-h1: 100%;
		}
	}

	@keyframes np-lp-t1 {
		0% {
			--np-lp-t1: 0%;
			animation-timing-function: linear;
		}
		14.286% {
			--np-lp-t1: 0%;
			animation-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15);
		}
		71.429% {
			--np-lp-t1: 100%;
			animation-timing-function: linear;
		}
		100% {
			--np-lp-t1: 100%;
		}
	}

	@keyframes np-lp-h2 {
		0% {
			--np-lp-h2: 0%;
			animation-timing-function: linear;
		}
		37.143% {
			--np-lp-h2: 0%;
			animation-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15);
		}
		85.714% {
			--np-lp-h2: 100%;
			animation-timing-function: linear;
		}
		100% {
			--np-lp-h2: 100%;
		}
	}

	@keyframes np-lp-t2 {
		0% {
			--np-lp-t2: 0%;
			animation-timing-function: linear;
		}
		51.429% {
			--np-lp-t2: 0%;
			animation-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15);
		}
		100% {
			--np-lp-t2: 100%;
			animation-timing-function: linear;
		}
		100% {
			--np-lp-t2: 100%;
		}
	}

	.np-container.wavy {
		height: var(--np-linear-progress-wave-height, 0.625rem);
		border-radius: 0;
	}

	.wavy .inactive-track,
	.wavy .np-lp-track,
	.wavy .dots {
		inset-block: auto;
		top: 50%;
		height: var(--np-linear-progress-track-height, 0.25rem);
		transform: translateY(-50%);
	}

	.wavy .stop-indicator {
		top: 50%;
		transform: translateY(-50%);
	}

	.np-lp-wave {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.np-lp-wave-line {
		fill: none;
		stroke: var(--np-linear-progress-active-indicator-color, var(--np-color-primary));
		stroke-width: var(--np-linear-progress-active-indicator-height, 0.25rem);
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.progress.wavy.indeterminate {
		animation: none;
	}

	.wavy.four-color .np-lp-wave-line {
		animation: four-color-stroke calc(1750ms * 4) linear infinite;
	}

	@keyframes four-color-stroke {
		0%,
		15% {
			stroke: var(--np-color-primary);
		}
		25%,
		40% {
			stroke: var(--np-color-primary-container);
		}
		50%,
		65% {
			stroke: var(--np-color-tertiary);
		}
		75%,
		90% {
			stroke: var(--np-color-tertiary-container);
		}
		100% {
			stroke: var(--np-color-primary);
		}
	}

	@keyframes buffering {
		0% {
			transform: translateX(calc(calc(var(--np-linear-progress-track-height, 0.25rem) / 2) * 5));
		}
	}

	@keyframes four-color {
		0% {
			background: var(--np-color-primary);
		}

		15% {
			background: var(--np-color-primary);
		}
		25% {
			background: var(--np-color-primary-container);
		}
		40% {
			background: var(--np-color-primary-container);
		}

		50% {
			background: var(--np-color-tertiary);
		}
		65% {
			background: var(--np-color-tertiary);
		}
		75% {
			background: var(--np-color-tertiary-container);
		}
		90% {
			background: var(--np-color-tertiary-container);
		}
		100% {
			background: var(--np-color-primary);
		}
	}

	@keyframes four-color-track {
		0% {
			background: var(--np-color-primary-container);
		}

		15% {
			background: var(--np-color-primary-container);
		}
		25% {
			background: var(--np-color-primary);
		}
		40% {
			background: var(--np-color-primary);
		}

		50% {
			background: var(--np-color-tertiary-container);
		}
		65% {
			background: var(--np-color-tertiary-container);
		}
		75% {
			background: var(--np-color-tertiary);
		}
		90% {
			background: var(--np-color-tertiary);
		}
		100% {
			background: var(--np-color-primary-container);
		}
	}

	@media (forced-colors: active) {
		.np-container {
			outline: 1px solid CanvasText;
		}

		.bar-inner,
		.dots {
			background-color: CanvasText;
		}
	}
</style>
