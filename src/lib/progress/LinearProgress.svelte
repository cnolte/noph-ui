<script lang="ts">
	import type { LinearProgressProps } from './types.ts'

	let {
		value = 0,
		max = 1,
		indeterminate = false,
		fourColor = false,
		buffer = 0,
		element = $bindable(),
		...attributes
	}: LinearProgressProps = $props()

	let progressStyles = $derived(`transform: scaleX(${(indeterminate ? 1 : value / max) * 100}%)`)

	let bufferValue = $derived(buffer ?? 0)
	let hasBuffer = $derived(bufferValue > 0)

	let dotStyles = $derived(
		`transform: scaleX(${(indeterminate || !hasBuffer ? 1 : bufferValue / max) * 100}%)`,
	)

	let hideDots = $derived(indeterminate || !hasBuffer || bufferValue >= max || value >= max)
</script>

<div class="np-container" bind:this={element}>
	<div
		{...attributes}
		class={['progress', indeterminate && 'indeterminate', fourColor && 'four-color']}
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax={max}
		aria-valuenow={indeterminate ? undefined : value}
	>
		<div class="dots" hidden={hideDots}></div>
		<div class="inactive-track" style={dotStyles}></div>
		<div class="bar primary-bar" style={progressStyles}>
			<div class="bar-inner"></div>
		</div>
		<div class="bar secondary-bar">
			<div class="bar-inner"></div>
		</div>
	</div>
</div>

<style>
	.np-container {
		border-radius: var(--np-linear-progress-track-shape, 0);
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
	.bar-inner {
		position: absolute;
	}

	.progress {
		direction: ltr;
		inset: 0;
		border-radius: inherit;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.bar {
		animation: none;
		width: 100%;
		height: var(--np-linear-progress-active-indicator-height, 0.25rem);
		transform-origin: left center;
		transition: transform 250ms cubic-bezier(0.4, 0, 0.6, 1);
	}

	.secondary-bar {
		display: none;
	}

	.bar-inner {
		inset: 0;
		animation: none;
		background: var(--np-linear-progress-active-indicator-color, var(--np-color-primary));
	}

	.inactive-track {
		background: var(--np-linear-progress-track-color, var(--np-color-surface-container-highest));
		inset: 0;
		transition: transform 250ms cubic-bezier(0.4, 0, 0.6, 1);
		transform-origin: left center;
	}

	.dots {
		inset: 0;
		animation: linear infinite 250ms;
		animation-name: buffering;
		background-color: var(
			--np-linear-progress-track-color,
			var(--np-color-surface-container-highest)
		);
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
	}

	.indeterminate .primary-bar {
		inset-inline-start: -145.167%;
	}

	.indeterminate .secondary-bar {
		inset-inline-start: -54.8889%;
		display: block;
	}

	.indeterminate .primary-bar {
		animation: linear infinite 2s;
		animation-name: primary-indeterminate-translate;
	}

	.indeterminate .primary-bar > .bar-inner {
		animation: linear infinite 2s primary-indeterminate-scale;
	}

	.indeterminate.four-color .primary-bar > .bar-inner {
		animation-name: primary-indeterminate-scale, four-color;
		animation-duration: 2s, calc(2s * 2);
	}

	.indeterminate .secondary-bar {
		animation: linear infinite 2s;
		animation-name: secondary-indeterminate-translate;
	}

	.indeterminate .secondary-bar > .bar-inner {
		animation: linear infinite 2s secondary-indeterminate-scale;
	}

	.indeterminate.four-color .secondary-bar > .bar-inner {
		animation-name: secondary-indeterminate-scale, four-color;
		animation-duration: 2s, calc(2s * 2);
	}

	:host(:dir(rtl)) {
		transform: scale(-1);
	}

	@keyframes primary-indeterminate-scale {
		0% {
			transform: scaleX(0.08);
		}

		36.65% {
			animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
			transform: scaleX(0.08);
		}

		69.15% {
			animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
			transform: scaleX(0.661479);
		}

		100% {
			transform: scaleX(0.08);
		}
	}

	@keyframes secondary-indeterminate-scale {
		0% {
			animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
			transform: scaleX(0.08);
		}

		19.15% {
			animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.00432);
			transform: scaleX(0.457104);
		}

		44.15% {
			animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
			transform: scaleX(0.72796);
		}

		100% {
			transform: scaleX(0.08);
		}
	}

	@keyframes buffering {
		0% {
			transform: translateX(calc(calc(var(--np-linear-progress-track-height, 0.25rem) / 2) * 5));
		}
	}

	@keyframes primary-indeterminate-translate {
		0% {
			transform: translateX(0px);
		}

		20% {
			animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
			transform: translateX(0px);
		}

		59.15% {
			animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
			transform: translateX(83.6714%);
		}

		100% {
			transform: translateX(200.611%);
		}
	}

	@keyframes secondary-indeterminate-translate {
		0% {
			animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
			transform: translateX(0px);
		}

		25% {
			animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
			transform: translateX(37.6519%);
		}

		48.35% {
			animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
			transform: translateX(84.3862%);
		}

		100% {
			transform: translateX(160.278%);
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
