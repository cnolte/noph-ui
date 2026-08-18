<script module lang="ts">
	import { SCALE, SHAPES, VIEWBOX, outlinePath } from './shapes.ts'
	import type { LoadingIndicatorProps } from './types.ts'

	const MORPH_DURATION = 650
	const QUARTER_TURN = 90
	const TURN_SAMPLE_INTERVAL = 25
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

	const MORPH_CYCLE = SHAPES.length * MORPH_DURATION
	const FRAMES = [...SHAPES, SHAPES[0]].map((shape) => outlinePath(shape, shape, 0, SCALE))
	const MORPH_VALUES = FRAMES.join(';')
	const MORPH_KEY_TIMES = FRAMES.map((_, index) => (index / SHAPES.length).toFixed(4)).join(';')
	const MORPH_KEY_SPLINES = SHAPES.map(() => '0.24 1 0.24 1').join(';')

	const TURN_CYCLE = 4 * MORPH_DURATION
	const TURN_SAMPLES = Array.from(
		{ length: TURN_CYCLE / TURN_SAMPLE_INTERVAL + 1 },
		(_, index) => index * TURN_SAMPLE_INTERVAL,
	)
	const turnAngle = (elapsed: number) =>
		(Math.floor(elapsed / MORPH_DURATION) + springValue((elapsed % MORPH_DURATION) / 1000)) *
		QUARTER_TURN
	const TURN_VALUES = TURN_SAMPLES.map(
		(elapsed) => `${turnAngle(elapsed).toFixed(2)} ${CENTER} ${CENTER}`,
	).join(';')
	const TURN_KEY_TIMES = TURN_SAMPLES.map((elapsed) => (elapsed / TURN_CYCLE).toFixed(4)).join(';')
</script>

<script lang="ts">
	let { contained = false, ...attributes }: LoadingIndicatorProps = $props()
</script>

<div {...attributes} class={['np-loading-indicator', contained && 'contained']} role="progressbar">
	<svg viewBox="0 0 {VIEWBOX} {VIEWBOX}" aria-hidden="true">
		<path class="indicator" d={FRAMES[0]}>
			<animate
				attributeName="d"
				values={MORPH_VALUES}
				keyTimes={MORPH_KEY_TIMES}
				keySplines={MORPH_KEY_SPLINES}
				calcMode="spline"
				dur="{MORPH_CYCLE}ms"
				repeatCount="indefinite"
			/>
			<animateTransform
				attributeName="transform"
				type="rotate"
				values={TURN_VALUES}
				keyTimes={TURN_KEY_TIMES}
				dur="{TURN_CYCLE}ms"
				repeatCount="indefinite"
			/>
		</path>
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
		transform-origin: 50% 50%;
		animation: li-global-rotation 4666ms linear infinite;
	}

	@keyframes li-global-rotation {
		to {
			rotate: 360deg;
		}
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
