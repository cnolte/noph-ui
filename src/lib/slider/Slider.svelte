<script lang="ts">
	import { Spring } from 'svelte/motion'
	import type { SliderProps } from './types.ts'

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		showValue = true,
		size = 's',
		stops = false,
		endStop = true,
		vertical = false,
		inputElement = $bindable(),
		element = $bindable(),
		label,
		title,
		format = (n) => n.toFixed(0),
		...attributes
	}: SliderProps = $props()

	const uid = $props.id()

	let interacting = $state(false)
	let hovering = $state(false)

	const valueDisplayed = new Spring(value, { stiffness: 0.2, damping: 0.8 })

	$effect(() => {
		valueDisplayed.target = value
	})

	const range = $derived(max - min)
	const progress = $derived((valueDisplayed.current - min) / range)

	const stopList = $derived.by(() => {
		if (!stops && !endStop) return []
		const output: number[] = []
		const stepVal = typeof step === 'number' ? step : range / 10

		if (stops) {
			for (let i = 0; i <= range; i += stepVal) {
				const stop = i / range
				if (stop < 0 || stop > 1) return
				output.push(stop)
			}
		}

		if (endStop) {
			if (!output.some((s) => Math.abs(s - 1) < 0.001)) output.push(1)
		}
		return output
	})

	function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
		value = Number(e.currentTarget.value)
	}
</script>

<div
	class={['np-slider-container', size, vertical ? 'vertical' : 'horizontal', attributes.class]}
	class:disabled
	bind:this={element}
	style:--np-slider-progress={progress}
	onmouseenter={() => (hovering = true)}
	onmouseleave={() => (hovering = false)}
	role="group"
>
	<input
		{...attributes}
		type="range"
		{min}
		{max}
		{step}
		{disabled}
		bind:this={inputElement}
		{value}
		oninput={handleInput}
		aria-describedby={title ? uid : attributes['aria-describedby']}
		aria-label={label || title || attributes['aria-label']}
		class="np-input"
		onpointerdown={() => (interacting = true)}
		onpointerup={() => (interacting = false)}
		onpointercancel={() => (interacting = false)}
		onblur={() => (interacting = false)}
	/>

	<div class="track-layer">
		<div class="track active"></div>
		<div class="track background"></div>

		{#each stopList as stop}
			<div
				class="stop"
				class:filled={stop <= progress}
				style:left={!vertical ? `${stop * 100}%` : undefined}
				style:bottom={vertical ? `${stop * 100}%` : undefined}
			></div>
		{/each}

		<div class="handle" class:interacting>
			{#if showValue}
				<div class="value-indicator" class:visible={interacting || hovering}>
					<span class="value-text">{format(value)}</span>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	:root {
		--np-slider-handle-width: 4px;
		--np-slider-gap: 6px;
		--np-slider-layer-inset: 6px;
		--np-slider-label-height: 44px;
		--np-slider-label-width: 48px;
	}

	.np-slider-container {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		user-select: none;
		touch-action: none;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;

		--track-height: 40px;
		--handle-height: 52px;
		--track-radius: 12px;
	}

	.np-slider-container.xs {
		--track-height: 16px;
		--handle-height: 44px;
		--track-radius: 8px;
	}
	.np-slider-container.s {
		--track-height: 24px;
		--handle-height: 44px;
		--track-radius: 8px;
	}
	.np-slider-container.m {
		--track-height: 40px;
		--handle-height: 52px;
		--track-radius: 12px;
	}
	.np-slider-container.l {
		--track-height: 56px;
		--handle-height: 68px;
		--track-radius: 16px;
	}
	.np-slider-container.xl {
		--track-height: 96px;
		--handle-height: 108px;
		--track-radius: 28px;
	}

	.np-slider-container.horizontal {
		width: 100%;
		min-width: 112px;
		height: max(var(--track-height), var(--handle-height));
		flex-direction: row;
	}

	.np-slider-container.vertical {
		height: 112px;
		width: max(var(--track-height), var(--handle-height));
		flex-direction: column;
	}

	.np-input {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: inherit;
		z-index: 4;
		margin: 0;
		inset: 0;
	}

	.np-slider-container.vertical .np-input {
		writing-mode: vertical-lr;
		direction: rtl;
	}

	.track-layer {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.np-slider-container.horizontal .track-layer {
		width: 100%;
		height: 100%;
		margin-inline: var(--np-slider-layer-inset);
	}

	.np-slider-container.vertical .track-layer {
		height: 100%;
		width: 100%;
		margin-block: var(--np-slider-layer-inset);
	}

	.track {
		position: absolute;
		pointer-events: none;
		z-index: 1;
	}

	.horizontal .track {
		height: var(--track-height);
		top: 50%;
		transform: translateY(-50%);
	}

	.horizontal .track.background {
		background-color: var(--np-color-surface-container-highest);
		border-radius: 0 var(--track-radius) var(--track-radius) 0;
		left: calc(var(--np-slider-progress) * 100% + var(--np-slider-gap));
		right: calc(-1 * var(--np-slider-layer-inset));
	}

	.horizontal .track.active {
		background-color: var(--np-color-primary);
		border-radius: var(--track-radius) 0 0 var(--track-radius);
		left: calc(-1 * var(--np-slider-layer-inset));
		right: calc(100% - (var(--np-slider-progress) * 100%) + var(--np-slider-gap));
		width: auto;
	}

	.vertical .track {
		width: var(--track-height);
		left: 50%;
		transform: translateX(-50%);
	}

	.vertical .track.background {
		background-color: var(--np-color-surface-container-highest);
		border-radius: var(--track-radius) var(--track-radius) 0 0;

		bottom: calc(var(--np-slider-progress) * 100% + var(--np-slider-gap));
		top: calc(-1 * var(--np-slider-layer-inset));
	}

	.vertical .track.active {
		background-color: var(--np-color-primary);
		border-radius: 0 0 var(--track-radius) var(--track-radius);

		bottom: calc(-1 * var(--np-slider-layer-inset));
		top: calc(100% - (var(--np-slider-progress) * 100%) + var(--np-slider-gap));
		height: auto;
	}

	.handle {
		position: absolute;
		background-color: var(--np-color-primary);
		border-radius: 999px;
		z-index: 3;
		pointer-events: none;
	}

	.horizontal .handle {
		left: calc(var(--np-slider-progress) * 100%);
		width: var(--np-slider-handle-width);
		height: var(--handle-height);
		transform: translate(-50%, 0);
	}

	.horizontal .handle.interacting {
		width: 2px;
	}

	.vertical .handle {
		bottom: calc(var(--np-slider-progress) * 100%);
		width: var(--handle-height);
		height: var(--np-slider-handle-width);
		transform: translate(0, 50%);
	}

	.vertical .handle.interacting {
		height: 2px;
	}

	.np-slider-container:has(.np-input:focus-visible) .handle {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: 2px;
		animation: focusAnimation 0.3s ease forwards;
	}

	.stop {
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		z-index: 2;
		background-color: var(--np-color-on-surface-variant);
		pointer-events: none;
	}

	.horizontal .stop {
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.vertical .stop {
		left: 50%;
		transform: translate(-50%, 50%);
	}
	.stop.filled {
		background-color: var(--np-color-on-primary);
	}

	.value-indicator {
		position: absolute;
		width: var(--np-slider-label-width);
		height: var(--np-slider-label-height);
		background-color: var(--np-color-inverse-surface);
		color: var(--np-color-inverse-on-surface);
		border-radius: 999px;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition:
			opacity 0.2s cubic-bezier(0.2, 0, 0, 1),
			transform 0.2s cubic-bezier(0.2, 0, 0, 1);
		pointer-events: none;
	}

	.value-text {
		font-size: 14px;
		font-weight: 500;
	}

	.value-indicator.visible,
	.np-slider-container:has(.np-input:focus-visible) .value-indicator {
		opacity: 1;
	}

	.horizontal .value-indicator {
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%) scale(0.8);
	}
	.horizontal .value-indicator.visible,
	.horizontal:has(.np-input:focus-visible) .value-indicator {
		transform: translateX(-50%) scale(1);
	}

	.vertical .value-indicator {
		left: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%) scale(0.8);
	}
	.vertical .value-indicator.visible,
	.vertical:has(.np-input:focus-visible) .value-indicator {
		transform: translateY(-50%) scale(1);
	}

	.disabled {
		cursor: default;
	}

	.disabled .handle {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
		box-shadow: none;
	}
	.disabled .track.active {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}
	.disabled .track.background {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
	}
	.disabled .stop {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}

	@keyframes focusAnimation {
		0% {
			outline-width: 3px;
		}
		50% {
			outline-width: 6px;
		}
		100% {
			outline-width: 3px;
		}
	}
</style>
