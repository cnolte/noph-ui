<script lang="ts">
	import {
		DETERMINATE_SHAPES,
		INDETERMINATE_SHAPES,
		outlinePath,
		VIEWBOX,
	} from '#lib/loading-indicator/shapes.js'
	import type { SVGAttributes } from 'svelte/elements'

	interface MorphShapeProps extends SVGAttributes<SVGSVGElement> {
		duration?: number
		offset?: number
		scale?: number
	}

	let { duration = 28, offset = 0, scale = 0.96, ...attributes }: MorphShapeProps = $props()

	const shapes = [DETERMINATE_SHAPES[0], ...INDETERMINATE_SHAPES]
	const order = shapes.map((_, index) => shapes[(index + offset) % shapes.length])
	const frames = [...order, order[0]].map((shape) => outlinePath(shape, shape, 0, scale))
	const steps = frames.length - 1
	const keyTimes = frames.map((_, index) => (index / steps).toFixed(4)).join(';')
	const keySplines = Array.from({ length: steps }, () => '0.4 0 0.2 1').join(';')
</script>

<svg
	{...attributes}
	class={['morph', attributes.class]}
	viewBox="0 0 {VIEWBOX} {VIEWBOX}"
	aria-hidden="true"
>
	<path class="animated" d={frames[0]}>
		<animate
			attributeName="d"
			values={frames.join(';')}
			{keyTimes}
			{keySplines}
			calcMode="spline"
			dur="{duration}s"
			repeatCount="indefinite"
		/>
	</path>
	<path class="still" d={frames[0]}></path>
</svg>

<style>
	.morph {
		display: block;
		fill: currentColor;
		transform-box: view-box;
		transform-origin: center;
		animation: turn var(--morph-turn, 120s) linear infinite;
	}
	.still {
		display: none;
	}
	@keyframes turn {
		to {
			transform: rotate(360deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.morph {
			animation: none;
		}
		.animated {
			display: none;
		}
		.still {
			display: block;
		}
	}
</style>
