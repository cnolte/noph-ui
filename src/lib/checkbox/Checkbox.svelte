<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { HTMLInputAttributes } from 'svelte/elements'

	let {
		indeterminate = $bindable(),
		checked = $bindable(),
		...attributes
	}: HTMLInputAttributes = $props()
	let selected = $derived(checked || indeterminate)
</script>

<div class="np-host">
	<div
		class:selected
		class="np-container"
		class:checked
		class:unselected={!selected}
		class:prev-checked={!checked}
		class:prev-unselected={selected}
		class:indeterminate
	>
		<label class="np-input-wrapper">
			<input
				{...attributes}
				class="np-input"
				type="checkbox"
				{indeterminate}
				bind:checked
				aria-checked={indeterminate ? 'mixed' : undefined}
				onclick={() => {
					indeterminate = false
				}}
			/>
			<Ripple />
		</label>

		<div class="np-outline"></div>
		<div class="np-background"></div>
		{#if !attributes.disabled}{/if}
		<svg class="np-icon" viewBox="0 0 18 18" aria-hidden="true">
			<rect class="mark short" />
			<rect class="mark long" />
		</svg>
	</div>
</div>

<style>
	.np-host {
		border-start-start-radius: var(--np-checkbox-container-shape, 2px);
		border-start-end-radius: var(--np-checkbox-container-shape, 2px);
		border-end-end-radius: var(--np-checkbox-container-shape, 2px);
		border-end-start-radius: var(--np-checkbox-container-shape, 2px);
		display: inline-flex;
		height: 18px;
		position: relative;
		vertical-align: top;
		width: 18px;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		cursor: pointer;
		margin: max(0px, (48px - 18px)/2);
	}
	.np-container {
		border-radius: inherit;
		display: flex;
		height: 100%;
		place-content: center;
		place-items: center;
		position: relative;
		width: 100%;
	}
	.np-input {
		height: 48px;
		margin: 0;
		opacity: 0;
		outline: none;
		width: 48px;
		cursor: inherit;
	}
	.np-input-wrapper {
		height: 48px;
		position: absolute;
		width: 48px;
		z-index: 1;
		border-radius: var(--np-shape-corner-large);
		cursor: inherit;
	}

	.np-input-wrapper:has(input:focus-visible) {
		outline-style: solid;
		outline-color: var(--np-color-primary);
		outline-width: 3px;
		outline-offset: 2px;
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
	.np-outline,
	.np-background,
	.np-icon {
		inset: 0;
		position: absolute;
	}
	.np-outline,
	.np-background {
		border-radius: inherit;
	}
	:where(:hover) .np-outline {
		border-color: var(--np-color-on-surface);
		border-width: 2px;
	}
	:where(:focus-within) .np-outline {
		border-color: var(--np-color-on-surface);
		border-width: 2px;
	}
	.np-outline {
		border-color: var(--np-checkbox-outline-color, var(--np-color-on-surface-variant));
		border-style: solid;
		border-width: 2px;
		box-sizing: border-box;
	}
	.np-background {
		background-color: var(--np-color-primary);
	}
	.np-background,
	.np-icon {
		opacity: 0;
		transition-duration: 150ms, 50ms;
		transition-property: transform, opacity;
		transition-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15), linear;
		transform: scale(0.6);
	}
	:where(.selected) :is(.np-background, .np-icon) {
		opacity: 1;
		transition-duration: 350ms, 50ms;
		transition-timing-function: cubic-bezier(0.05, 0.7, 0.1, 1), linear;
		transform: scale(1);
	}
	.np-icon {
		fill: var(--np-checkbox-selected-icon-color, var(--np-color-on-primary));
		height: 18px;
		width: 18px;
	}
	.checked .mark.short,
	.prev-checked.unselected .mark.short {
		height: 5.6568542495px;
	}
	.prev-unselected .mark {
		transition-property: none;
	}
	.checked .mark,
	.prev-checked.unselected .mark {
		transform: scaleY(-1) translate(7px, -14px) rotate(45deg);
	}
	.selected .mark {
		animation-duration: 350ms;
		animation-timing-function: cubic-bezier(0.05, 0.7, 0.1, 1);
		transition-duration: 350ms;
		transition-timing-function: cubic-bezier(0.05, 0.7, 0.1, 1);
	}
	.mark.short {
		height: 2px;
		transition-property: transform, height;
		width: 2px;
	}
	.mark {
		animation-duration: 150ms;
		animation-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15);
		transition-duration: 150ms;
		transition-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15);
	}
	.prev-unselected.checked .mark.long {
		animation-name: prev-unselected-to-checked;
	}
	.checked .mark.long,
	.prev-checked.unselected .mark.long {
		width: 11.313708499px;
	}
	.mark.long {
		height: 2px;
		transition-property: transform, width;
		width: 10px;
	}
	.indeterminate .mark {
		transform: scaleY(-1) translate(4px, -10px) rotate(0deg);
	}
	@keyframes prev-unselected-to-checked {
		from {
			width: 0;
		}
	}
</style>
