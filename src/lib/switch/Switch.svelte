<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { SwitchProps } from './types.ts'

	let {
		selected = $bindable(false),
		disabled = false,
		element = $bindable(),
		inputElement = $bindable(),
		icons,
		onkeyup,
		...attributes
	}: SwitchProps = $props()
</script>

<div
	bind:this={element}
	class={['np-switch', selected && 'np-selected', disabled && 'np-disabled', attributes.class]}
>
	<div class="np-track"></div>
	<div class={['np-handle', icons === 'both' && 'both-icons']}>
		{#if icons}
			{#if selected}
				<svg class="np-switch-icon" viewBox="0 0 24 24">
					<path
						d="M20 6L9 17l-5-5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{:else if icons === 'both'}
				<svg class="np-switch-icon" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
					/>
				</svg>
			{/if}
		{/if}
	</div>
	{#if !disabled}
		<div class="np-state-layer">
			<Ripple forElement={inputElement} />
		</div>
	{/if}
	<input
		{...attributes}
		onkeyup={(e) => {
			if (e.key === 'Enter' && !disabled) {
				e.preventDefault()
				selected = !selected
			}
			onkeyup?.(e)
		}}
		type="checkbox"
		role="switch"
		bind:this={inputElement}
		bind:checked={selected}
		{disabled}
	/>
</div>

<style>
	.np-switch {
		position: relative;
		width: 3.25rem;
		height: 2rem;
		padding: 0.25rem;
		cursor: pointer;
		border-radius: var(--np-shape-corner-full);
		-webkit-tap-highlight-color: transparent;
	}
	.np-track {
		position: absolute;
		width: 3.25rem;
		height: 2rem;
		background-color: var(
			--np-comp-switch-unselected-track-color,
			var(--np-color-surface-container-highest)
		);
		border-radius: var(--np-shape-corner-full);
		transition:
			background-color 0.2s,
			outline-color 0.2s;
		outline-width: 0.125rem;
		outline-color: var(--np-comp-switch-unselected-track-outline-color, var(--np-color-outline));
		outline-style: solid;
		outline-offset: -0.125rem;
	}

	.np-handle {
		position: absolute;
		color: var(--np-color-surface-container-highest);
		width: 1rem;
		height: 1rem;
		margin: 0.5rem;
		transition:
			transform 0.2s,
			background-color 0.2s;
		background-color: var(--np-comp-switch-unselected-handle-color, var(--np-color-outline));
		border-radius: var(--np-comp-switch-handle-shape, var(--np-shape-corner-full));
	}

	.np-handle.both-icons {
		transform: scale(1.5);
	}

	.np-state-layer {
		position: relative;
		width: var(--np-comp-switch-state-layer-size, 2.5rem);
		height: var(--np-comp-switch-state-layer-size, 2.5rem);
		margin-block-start: -0.25rem;
		margin-inline-start: -0.25rem;
		transition: transform 0.2s;
		border-radius: var(--np-comp-switch-state-layer-shape, var(--np-shape-corner-full));
	}

	.np-selected .np-state-layer {
		transform: translateX(1.25rem);
	}

	.np-switch input {
		border-radius: var(--np-shape-corner-full);
		opacity: 0;
		position: absolute;
		cursor: inherit;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
	}

	.np-switch-icon {
		transform: scale(0.6666667);
	}

	.np-switch:not(.np-disabled):has(input:not(:checked):active) .np-handle {
		transform: scale(1.75);
	}

	.np-switch:not(.np-disabled):has(input:checked:active) .np-handle {
		transform: translateX(1.25rem) scale(1.75);
	}

	.np-selected .np-handle {
		transform: translateX(1.25rem) scale(1.5);
		color: var(--np-color-primary);
		background-color: var(--np-comp-switch-selected-handle-color, var(--np-color-on-primary));
	}

	.np-disabled .np-handle {
		opacity: var(--np-comp-switch-disabled-unselected-handle-opacity, 0.38);
	}

	.np-selected.np-disabled .np-handle {
		opacity: var(--np-comp-switch-disabled-selected-handle-opacity, 1);
		background-color: var(--np-comp-switch-selected-handle-color, var(--np-color-surface));
	}

	.np-selected .np-track {
		background-color: var(--np-comp-switch-selected-track-color, var(--np-color-primary));
		outline-color: transparent;
	}

	.np-disabled .np-track {
		opacity: var(--np-comp-switch-disabled-track-opacity, 0.12);
		background-color: var(
			--np-comp-switch-disabled-unselected-track-color,
			var(--np-color-surface-container-highest)
		);
	}

	.np-selected.np-disabled .np-track {
		background-color: var(
			--np-comp-switch-disabled-selected-track-color,
			var(--np-color-on-surface)
		);
	}

	.np-disabled {
		cursor: default;
	}

	.np-switch:has(input:focus-visible) {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: -2px;
		animation: focusAnimation 0.3s ease forwards;
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
