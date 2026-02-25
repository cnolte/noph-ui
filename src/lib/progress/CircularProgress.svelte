<script lang="ts">
	import type { CircularProgressProps } from './types.ts'

	let {
		value = 0,
		max = 1,
		indeterminate = false,
		fourColor = false,
		...attributes
	}: CircularProgressProps = $props()
</script>

<div class="np-container">
	<div
		{...attributes}
		class={['progress', indeterminate && 'indeterminate', fourColor && 'four-color']}
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax={max}
		aria-valuenow={indeterminate ? undefined : value}
	>
		{#if indeterminate}
			<div class="spinner">
				<div class="left">
					<div class="circle"></div>
				</div>
				<div class="right">
					<div class="circle"></div>
				</div>
			</div>
		{:else}
			<svg viewBox="0 0 4800 4800">
				<circle class="track" pathLength="100"></circle>
				<circle class="active-track" pathLength="100" stroke-dashoffset={(1 - value / max) * 100}
				></circle>
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
	.progress,
	.spinner,
	.left,
	.right,
	.circle,
	svg,
	.track,
	.active-track {
		position: absolute;
		inset: 0;
	}

	svg {
		transform: rotate(-90deg);
	}
	circle {
		cx: 50%;
		cy: 50%;
		r: calc(50% * (1 - var(--np-circular-progress-active-indicator-width, 8.3333) / 100));
		stroke-width: calc(var(--np-circular-progress-active-indicator-width, 8.3333) * 1%);
		stroke-dasharray: 100;
		fill: transparent;
	}

	.active-track {
		transition: stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);
		stroke: var(--np-circular-progress-color, var(--np-color-primary));
	}

	.track {
		stroke: transparent;
	}

	.progress.indeterminate {
		animation: linear infinite linear-rotate;
		animation-duration: calc(1333ms * 360 / 306);
	}

	.spinner {
		animation: infinite both rotate-arc;
		animation-duration: calc(4 * 1333ms);
		animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	.left {
		overflow: hidden;
		inset: 0 50% 0 0;
	}

	.right {
		overflow: hidden;
		inset: 0 0 0 50%;
	}

	.circle {
		box-sizing: border-box;
		border-radius: 50%;
		border: solid
			calc(
				calc(var(--np-circular-progress-active-indicator-width, 8.3333) / 100) *
					calc(var(--np-circular-progress-size, 3rem) - 2 * 0.25rem)
			);
		border-color: var(--np-circular-progress-color, var(--np-color-primary))
			var(--np-circular-progress-color, var(--np-color-primary)) transparent transparent;
		animation: expand-arc;
		animation-iteration-count: infinite;
		animation-fill-mode: both;
		animation-duration: 1333ms, calc(4 * 1333ms);
		animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	.four-color .circle {
		animation-name: expand-arc, four-color;
	}

	.left .circle {
		rotate: 135deg;
		inset: 0 -100% 0 0;
	}
	.right .circle {
		rotate: 100deg;
		inset: 0 0 0 -100%;
		animation-delay: calc(-0.5 * 1333ms), 0ms;
	}

	@media (forced-colors: active) {
		.active-track {
			stroke: CanvasText;
		}

		.circle {
			border-color: CanvasText CanvasText Canvas Canvas;
		}
	}
	@keyframes expand-arc {
		0% {
			transform: rotate(265deg);
		}
		50% {
			transform: rotate(130deg);
		}
		100% {
			transform: rotate(265deg);
		}
	}
	@keyframes rotate-arc {
		12.5% {
			transform: rotate(135deg);
		}
		25% {
			transform: rotate(270deg);
		}
		37.5% {
			transform: rotate(405deg);
		}
		50% {
			transform: rotate(540deg);
		}
		62.5% {
			transform: rotate(675deg);
		}
		75% {
			transform: rotate(810deg);
		}
		87.5% {
			transform: rotate(945deg);
		}
		100% {
			transform: rotate(1080deg);
		}
	}
	@keyframes linear-rotate {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes four-color {
		0% {
			border-top-color: var(--np-color-primary);
			border-right-color: var(--np-color-primary);
		}
		15% {
			border-top-color: var(--np-color-primary);
			border-right-color: var(--np-color-primary);
		}
		25% {
			border-top-color: var(--np-color-primary-container);
			border-right-color: var(--np-color-primary-container);
		}
		40% {
			border-top-color: var(--np-color-primary-container);
			border-right-color: var(--np-color-primary-container);
		}
		50% {
			border-top-color: var(--np-color-tertiary);
			border-right-color: var(--np-color-tertiary);
		}
		65% {
			border-top-color: var(--np-color-tertiary);
			border-right-color: var(--np-color-tertiary);
		}
		75% {
			border-top-color: var(--np-color-tertiary-container);
			border-right-color: var(--np-color-tertiary-container);
		}
		90% {
			border-top-color: var(--np-color-tertiary-container);
			border-right-color: var(--np-color-tertiary-container);
		}
		100% {
			border-top-color: var(--np-color-primary);
			border-right-color: var(--np-color-primary);
		}
	}
</style>
