<script lang="ts">
	import {
		DETERMINATE_SCALE,
		DETERMINATE_SHAPES,
		INDETERMINATE_SCALE,
		INDETERMINATE_SHAPES,
		VIEWBOX,
		outlinePath,
	} from './shapes.ts'
	import type { LoadingIndicatorProps } from './types.ts'

	let {
		value = 0,
		max = 1,
		indeterminate = false,
		contained = false,
		...attributes
	}: LoadingIndicatorProps = $props()

	const MORPH_DURATION = 650
	const ROTATION_DURATION = 4666
	const QUARTER_TURN = 90
	const CENTER = VIEWBOX / 2
	const DAMPING_RATIO = 0.6
	const NATURAL_FREQUENCY = Math.sqrt(200)
	const DAMPED_FREQUENCY = NATURAL_FREQUENCY * Math.sqrt(1 - DAMPING_RATIO * DAMPING_RATIO)
	const springValue = (seconds: number) =>
		1 -
		Math.exp(-DAMPING_RATIO * NATURAL_FREQUENCY * seconds) *
			(Math.cos(DAMPED_FREQUENCY * seconds) +
				((DAMPING_RATIO * NATURAL_FREQUENCY) / DAMPED_FREQUENCY) *
					Math.sin(DAMPED_FREQUENCY * seconds))

	const clamp = (n: number) => (n > 0 ? Math.min(n, 1) : 0)
	const rotate = (degrees: number) => `rotate(${(degrees % 360).toFixed(2)} ${CENTER} ${CENTER})`

	const initialPath = outlinePath(
		INDETERMINATE_SHAPES[0],
		INDETERMINATE_SHAPES[1],
		0,
		INDETERMINATE_SCALE,
	)

	let progress = $derived(clamp(value / max))
	let determinatePath = $derived(
		outlinePath(DETERMINATE_SHAPES[0], DETERMINATE_SHAPES[1], progress, DETERMINATE_SCALE),
	)

	let indicator = $state<SVGPathElement>()

	$effect(() => {
		if (!indicator) return
		const path = indicator
		const start = performance.now()
		let raf = 0
		const frame = (now: number) => {
			raf = requestAnimationFrame(frame)
			const elapsed = Math.max(0, now - start)
			const index = Math.floor(elapsed / MORPH_DURATION)
			const morph = springValue((elapsed % MORPH_DURATION) / 1000)
			path.setAttribute(
				'd',
				outlinePath(
					INDETERMINATE_SHAPES[index % INDETERMINATE_SHAPES.length],
					INDETERMINATE_SHAPES[(index + 1) % INDETERMINATE_SHAPES.length],
					clamp(morph),
					INDETERMINATE_SCALE,
				),
			)
			path.setAttribute(
				'transform',
				rotate((elapsed / ROTATION_DURATION) * 360 + (index + morph) * QUARTER_TURN),
			)
		}
		raf = requestAnimationFrame(frame)
		return () => cancelAnimationFrame(raf)
	})
</script>

<div
	{...attributes}
	class={['np-loading-indicator', contained && 'contained']}
	role="progressbar"
	aria-valuemin="0"
	aria-valuemax={max}
	aria-valuenow={indeterminate ? undefined : value}
>
	<svg viewBox="0 0 {VIEWBOX} {VIEWBOX}" aria-hidden="true">
		{#if indeterminate}
			<path bind:this={indicator} class="indicator" d={initialPath}></path>
		{:else}
			<path class="indicator" d={determinatePath} transform={rotate(-progress * 180)}></path>
		{/if}
	</svg>
</div>

<style>
	.np-loading-indicator {
		all: unset;
		--_color: var(--np-color-primary);
		display: inline-flex;
		vertical-align: middle;
		align-items: center;
		justify-content: center;
		inline-size: var(--np-loading-indicator-size, 3rem);
		block-size: var(--np-loading-indicator-size, 3rem);
		border-radius: var(--np-shape-corner-full);
		contain: strict;
		content-visibility: auto;
	}

	.contained {
		--_color: var(--np-color-on-primary-container);
		background-color: var(
			--np-loading-indicator-container-color,
			var(--np-color-primary-container)
		);
	}

	svg {
		display: block;
		inline-size: 100%;
		block-size: 100%;
	}

	.indicator {
		fill: var(--np-loading-indicator-color, var(--_color));
	}

	@media (forced-colors: active) {
		.indicator {
			fill: CanvasText;
		}
	}
</style>
