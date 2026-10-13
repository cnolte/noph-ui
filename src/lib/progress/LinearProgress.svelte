<script lang="ts">
	import './four-color.css'
	import { reducedMotion } from '#lib/media.js'
	import type { LinearProgressProps } from './types.js'

	let {
		value = 0,
		max = 1,
		indeterminate = false,
		fourColor = false,
		buffer = 0,
		wavy = false,
		track = true,
		stopIndicator = true,
		element = $bindable(),
		class: className,
		style,
		...attributes
	}: LinearProgressProps = $props()

	const WAVE_AMPLITUDE = 3
	const DETERMINATE_WAVELENGTH = 40
	const INDETERMINATE_WAVELENGTH = 20

	let wave = $derived(wavy && !reducedMotion.current)

	let wavelength = $derived(indeterminate ? INDETERMINATE_WAVELENGTH : DETERMINATE_WAVELENGTH)
	const amplitudeFor = (fraction: number) =>
		!wave ? 0 : indeterminate || (fraction > 0.1 && fraction < 0.95) ? 1 : 0

	const WAVE_STEPS = 12
	let containerWidth = $state(0)
	let containerHeight = $state(0)
	let wavePathA = $state<SVGPathElement>()
	let wavePathB = $state<SVGPathElement>()
	let renderedAmplitude = 0

	const buildWave = (width: number, height: number, len: number, amp: number, phase: number) => {
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

	// `dot` keeps a determinate indicator visible as a dot at low values, where the round caps
	// alone are wider than the progress.
	const trim = (
		path: SVGPathElement | undefined,
		wave: Wave,
		x0: number,
		x1: number,
		cap: number,
		dot: boolean,
	) => {
		if (!path) return
		const from = x0 + cap
		let to = x1 - cap
		if (to <= from) {
			if (!dot || x1 <= x0) {
				path.style.visibility = 'hidden'
				return
			}
			to = from + 0.01
		}
		path.style.visibility = ''
		const a = lengthAt(wave, from)
		const b = lengthAt(wave, to)
		path.setAttribute('d', wave.d)
		path.style.strokeDasharray = `${b - a} ${wave.total}`
		path.style.strokeDashoffset = `${-a}`
	}

	$effect(() => {
		if (!wave || !containerWidth || !containerHeight) return
		const len = wavelength
		const width = containerWidth
		const height = containerHeight
		const cap = wavePathA ? parseFloat(getComputedStyle(wavePathA).strokeWidth) / 2 || 2 : 2
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
			const wave = buildWave(width, height, len, renderedAmplitude, phase)
			if (indeterminate) {
				// The wave follows the heads and tails the CSS animation moves.
				const [h1, t1, h2, t2] = ['h1', 't1', 'h2', 't2'].map(
					(name) => parseFloat(hostStyles?.getPropertyValue(`--np-lp-${name}`) ?? '') / 100 || 0,
				)
				trim(wavePathA, wave, t1 * width, h1 * width, cap, false)
				trim(wavePathB, wave, t2 * width, h2 * width, cap, false)
			} else {
				trim(wavePathA, wave, 0, (shown / 100) * width, cap, true)
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

<div
	bind:this={element}
	class={['np-container', wave && 'wavy', className]}
	{style}
	bind:clientWidth={containerWidth}
	bind:clientHeight={containerHeight}
>
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
		{#if !indeterminate && stopIndicator}
			<div class="stop-indicator"></div>
		{/if}
	</div>
</div>

<style>
	.np-container {
		border-radius: var(--np-linear-progress-track-shape, var(--np-shape-corner-full));
		display: flex;
		position: relative;
		min-width: 40px;
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

	/* A 4dp dot, centred in the round end of a thicker track. */
	.stop-indicator {
		right: max(0px, (var(--np-linear-progress-track-height, 0.25rem) - 0.25rem) / 2);
		width: 0.25rem;
		height: 0.25rem;
		border-radius: var(--np-shape-corner-full);
		background: var(--np-linear-progress-active-indicator-color, var(--np-color-primary));
	}

	.bar {
		left: 0;
		width: 100%;
		height: var(--np-linear-progress-active-indicator-height, 0.25rem);
	}

	.secondary-bar {
		display: none;
	}

	.bar-inner {
		inset: 0;
		background: var(--np-linear-progress-active-indicator-color, var(--np-color-primary));
	}

	/* At low values the active indicator is a dot as wide as it is thick. */
	.progress:not(.indeterminate) .primary-bar {
		width: max(
			var(--_percent, 0%),
			var(--np-linear-progress-active-indicator-height, 0.25rem) * var(--_gap-on, 0)
		);
		transition: width var(--np-motion-expressive-default-effects);
	}

	.progress:not(.indeterminate) .bar-inner {
		border-radius: var(--np-linear-progress-track-shape, var(--np-shape-corner-full));
	}

	.inactive-track {
		background: var(--np-linear-progress-track-color, var(--np-color-secondary-container));
		inset-block: 0;
		left: min(
			calc(
				max(
						var(--_percent, 0%),
						var(--np-linear-progress-active-indicator-height, 0.25rem) * var(--_gap-on, 0)
					) +
					var(--np-linear-progress-track-gap, 0.25rem) * var(--_gap-on, 0)
			),
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
		mask-image: url("data:image/svg+xml,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'><circle cx='1' cy='1' r='1'/></svg>");
		z-index: -1;
	}

	.dots[hidden] {
		display: none;
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

	.indeterminate.four-color :is(.bar-inner, .np-lp-track),
	.wavy.four-color .np-lp-wave-line {
		animation: np-four-color calc(1750ms * 4) linear infinite;
	}

	.indeterminate.four-color .bar-inner {
		--np-four-color: var(--np-linear-progress-active-indicator-color, var(--np-color-primary));
		background: var(--np-four-color);
	}

	.np-lp-track {
		position: absolute;
		inset-block: 0;
		background: var(--np-linear-progress-track-color, var(--np-color-secondary-container));
		border-radius: var(--np-linear-progress-track-shape, var(--np-shape-corner-full));
	}

	.indeterminate.four-color .np-lp-track {
		--np-four-color-track: var(
			--np-linear-progress-track-color,
			var(--np-color-secondary-container)
		);
		background: var(--np-four-color-track);
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
		}
	}

	.np-container.wavy {
		height: var(
			--np-linear-progress-wave-height,
			calc(var(--np-linear-progress-active-indicator-height, 0.25rem) + 0.375rem)
		);
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

	.wavy.four-color .np-lp-wave-line {
		--np-four-color: var(--np-linear-progress-active-indicator-color, var(--np-color-primary));
		stroke: var(--np-four-color);
	}

	@keyframes buffering {
		0% {
			transform: translateX(calc(calc(var(--np-linear-progress-track-height, 0.25rem) / 2) * 5));
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
