<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity'
	import type { CircularProgressProps } from './types.ts'

	let {
		value = 0,
		max = 1,
		indeterminate = false,
		fourColor = false,
		track = true,
		wavy = false,
		element = $bindable(),
		class: className,
		style,
		...attributes
	}: CircularProgressProps = $props()

	const WAVE_AMPLITUDE_DP = 1.6
	const WAVE_WAVELENGTH_DP = 15

	const VIEWBOX = 4800
	const DEFAULT_STROKE_PERCENT = 8.3333
	const BOX_DP = 48
	const unitsPerDp = VIEWBOX / BOX_DP
	const ampUnits = WAVE_AMPLITUDE_DP * unitsPerDp
	const ringRadius = (strokePercent: number) =>
		VIEWBOX / 2 - ((strokePercent / 100) * VIEWBOX) / 2 - ampUnits
	const ringWaveCount = (radius: number) =>
		Math.max(1, Math.round((2 * Math.PI * radius) / (WAVE_WAVELENGTH_DP * unitsPerDp)))

	const buildWavePath = (phase: number, strokePercent: number) => {
		const radius = ringRadius(strokePercent)
		const count = ringWaveCount(radius)
		const c = VIEWBOX / 2
		const steps = count * 24
		let d = ''
		for (let i = 0; i <= steps; i++) {
			const t = (i / steps) * Math.PI * 2
			const r = radius + ampUnits * Math.cos(count * t - phase)
			const x = (c + r * Math.cos(t)).toFixed(2)
			const y = (c + r * Math.sin(t)).toFixed(2)
			d += (i === 0 ? 'M' : 'L') + x + ',' + y
		}
		return d + 'Z'
	}

	let waveEl = $state<SVGPathElement>()
	const wavePath = buildWavePath(0, DEFAULT_STROKE_PERCENT)

	const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)', false)
	let wave = $derived(wavy && !reducedMotion.current)

	$effect(() => {
		if (!wave || !waveEl) return
		const path = waveEl
		const strokePercent =
			parseFloat(
				getComputedStyle(path).getPropertyValue('--np-circular-progress-active-indicator-width'),
			) || DEFAULT_STROKE_PERCENT
		let raf = 0
		const frame = (now: number) => {
			raf = requestAnimationFrame(frame)
			path.setAttribute('d', buildWavePath(((now / 1000) % 1) * Math.PI * 2, strokePercent))
		}
		raf = requestAnimationFrame(frame)
		return () => cancelAnimationFrame(raf)
	})

	const clamp = (n: number) => Math.min(100, Math.max(0, n))
	let activeLength = $derived(clamp((value / max) * 100))
	let activeStyle = $derived(`--_active:${activeLength}`)
</script>

<div bind:this={element} class={['np-container', className]} {style}>
	<div
		{...attributes}
		class={[
			'progress',
			indeterminate && 'indeterminate',
			fourColor && 'four-color',
			wave && 'wavy',
		]}
		style={activeStyle}
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax={max}
		aria-valuenow={indeterminate ? undefined : value}
	>
		{#if indeterminate}
			<svg class="spinner" viewBox="0 0 4800 4800">
				{#if track}
					<circle class="track spinner-track" pathLength="100"></circle>
				{/if}
				{#if wave}
					<path
						bind:this={waveEl}
						class="active-track spinner-arc wave"
						d={wavePath}
						pathLength="100"
					></path>
				{:else}
					<circle class="active-track spinner-arc" pathLength="100"></circle>
				{/if}
			</svg>
		{:else}
			<svg viewBox="0 0 4800 4800">
				{#if track}
					<circle class="track" pathLength="100"></circle>
				{/if}
				{#if wave}
					<path bind:this={waveEl} class="active-track wave" d={wavePath} pathLength="100"></path>
				{:else}
					<circle class="active-track" pathLength="100"></circle>
				{/if}
			</svg>
		{/if}
	</div>
</div>

<style>
	.np-container {
		all: unset;
		display: inline-flex;
		vertical-align: middle;
		width: var(--np-circular-progress-size, 3rem);
		height: var(--np-circular-progress-size, 3rem);
		position: relative;
		align-items: center;
		justify-content: center;
		contain: strict;
		content-visibility: auto;
	}

	.progress {
		flex: 1;
		align-self: stretch;
		margin: 0.25rem;
	}

	.progress.wavy {
		margin: 0;
	}
	.progress,
	.spinner,
	svg,
	.track,
	.active-track {
		position: absolute;
		inset: 0;
	}

	svg {
		transform: rotate(-90deg);
		transform-origin: 50% 50%;
	}
	circle,
	.wave {
		stroke-width: calc(var(--np-circular-progress-active-indicator-width, 8.3333) * 1%);
		stroke-dasharray: 100;
		fill: transparent;
	}

	circle {
		cx: 50%;
		cy: 50%;
		r: calc(50% * (1 - var(--np-circular-progress-active-indicator-width, 8.3333) / 100));
		transform-box: view-box;
		transform-origin: 50% 50%;
	}

	.progress {
		--_stroke: var(--np-circular-progress-active-indicator-width, 8.3333);
		--_gap: calc((0.1 + var(--_stroke) / 100) / (3.14159265 * (1 - var(--_stroke) / 100)) * 100);
	}

	.wavy .track {
		r: calc(50% * (1 - var(--_stroke) / 100 - 0.0666667));
	}

	.progress.wavy {
		--_gap: calc(
			(0.0833333 + var(--_stroke) / 100) / (3.14159265 * (1 - var(--_stroke) / 100 - 0.0666667)) *
				100
		);
	}

	.progress:not(.indeterminate) .active-track {
		stroke-dashoffset: calc((100 - var(--_active)) * 1px);
	}

	.progress:not(.indeterminate) .track {
		--_g: min(var(--_active), var(--_gap));
		stroke-dasharray: calc(max(0, 100 - var(--_active) - 2 * var(--_g)) * 1px) 100px;
		stroke-dashoffset: calc((var(--_active) + var(--_g)) * -1px);
	}

	.active-track,
	.track {
		stroke-linecap: round;
	}

	.active-track {
		transition: stroke-dashoffset var(--np-motion-expressive-slow-effects);
		stroke: var(--np-circular-progress-color, var(--np-color-primary));
	}

	.track {
		stroke: var(--np-circular-progress-track-color, var(--np-color-secondary-container));
		transition:
			stroke-dasharray var(--np-motion-expressive-slow-effects),
			stroke-dashoffset var(--np-motion-expressive-slow-effects);
	}

	.progress.indeterminate {
		animation: cp-global-rotation 6000ms linear infinite;
	}

	@keyframes cp-global-rotation {
		to {
			rotate: 1080deg;
		}
	}

	.spinner {
		animation: cp-step-rotation 6000ms linear infinite;
	}

	@keyframes cp-step-rotation {
		0% {
			rotate: 0deg;
		}
		5% {
			rotate: 90deg;
		}
		25% {
			rotate: 90deg;
		}
		30% {
			rotate: 180deg;
		}
		50% {
			rotate: 180deg;
		}
		55% {
			rotate: 270deg;
		}
		75% {
			rotate: 270deg;
		}
		80% {
			rotate: 360deg;
		}
		100% {
			rotate: 360deg;
		}
	}

	.spinner-arc {
		transition: none;
		animation: cp-arc-sweep 6000ms infinite;
	}

	@keyframes cp-arc-sweep {
		0% {
			stroke-dasharray: 10px 100px;
			animation-timing-function: linear;
		}
		50% {
			stroke-dasharray: calc((100 - 2 * var(--_gap)) * 1px) 100px;
			animation-timing-function: cubic-bezier(0.2, 0, 0, 1);
		}
		100% {
			stroke-dasharray: 10px 100px;
		}
	}

	.spinner-track {
		transition: none;
		animation: cp-track-sweep 6000ms infinite;
	}

	@keyframes cp-track-sweep {
		0% {
			stroke-dasharray: calc((90 - 2 * var(--_gap)) * 1px) 100px;
			rotate: calc((10 + var(--_gap)) * 3.6deg);
			animation-timing-function: linear;
		}
		50% {
			stroke-dasharray: 0px 100px;
			rotate: calc((100 - var(--_gap)) * 3.6deg);
			animation-timing-function: cubic-bezier(0.2, 0, 0, 1);
		}
		100% {
			stroke-dasharray: calc((90 - 2 * var(--_gap)) * 1px) 100px;
			rotate: calc((10 + var(--_gap)) * 3.6deg);
		}
	}

	.four-color .spinner-arc {
		animation-name: cp-arc-sweep, four-color;
		animation-duration: 6000ms, calc(4 * 1333ms);
	}

	.four-color .spinner-track {
		animation-name: cp-track-sweep, four-color-track;
		animation-duration: 6000ms, calc(4 * 1333ms);
	}

	@media (forced-colors: active) {
		.active-track {
			stroke: CanvasText;
		}

		.spinner-arc {
			stroke: CanvasText;
		}
	}
	@keyframes four-color {
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
	@keyframes four-color-track {
		0%,
		15% {
			stroke: var(--np-color-primary-container);
		}
		25%,
		40% {
			stroke: var(--np-color-primary);
		}
		50%,
		65% {
			stroke: var(--np-color-tertiary-container);
		}
		75%,
		90% {
			stroke: var(--np-color-tertiary);
		}
		100% {
			stroke: var(--np-color-primary-container);
		}
	}
</style>
