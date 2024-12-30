<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { CheckboxProps } from './types.ts'

	let {
		indeterminate = $bindable(),
		checked = $bindable(),
		element = $bindable(),
		style,
		...attributes
	}: CheckboxProps = $props()
</script>

<div {style} class={['np-host', attributes.class]} bind:this={element}>
	<div class="np-container">
		<label class="np-input-wrapper">
			<input
				{...attributes}
				class="np-input"
				type="checkbox"
				bind:indeterminate
				bind:checked
				aria-checked={indeterminate ? 'mixed' : undefined}
			/>
			{#if !attributes.disabled}
				<Ripple />
			{/if}
		</label>

		<div class="np-outline"></div>
		<div class="np-background"></div>
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
	.np-host:has(input:disabled) {
		cursor: default;
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
	.np-outline {
		border-color: var(--np-checkbox-outline-color, var(--np-color-on-surface-variant));
		border-style: solid;
		border-width: 2px;
		box-sizing: border-box;
	}
	:where(:hover) .np-outline {
		border-color: var(--np-color-on-surface);
		border-width: 2px;
	}
	:where(:focus-within) .np-outline {
		border-color: var(--np-color-on-surface);
		border-width: 2px;
	}
	.np-container:has(input:disabled) .np-outline {
		border-color: var(--np-color-on-surface);
		border-width: 2px;
		opacity: 0.38;
	}
	.np-container:has(input:disabled:checked) .np-outline,
	.np-container:has(input:disabled:indeterminate) .np-outline {
		visibility: hidden;
	}
	.np-background {
		background-color: var(--np-checkbox-selected-container-color, var(--np-color-primary));
	}
	.np-background,
	.np-icon {
		opacity: 0;
		transition-duration: 150ms, 50ms;
		transition-property: transform, opacity;
		transition-timing-function: cubic-bezier(0.3, 0, 0.8, 0.15), linear;
		transform: scale(0.6);
	}
	.np-container:has(input:indeterminate) .np-background,
	.np-container:has(input:checked) .np-background,
	.np-container:has(input:indeterminate) .np-icon,
	.np-container:has(input:checked) .np-icon {
		opacity: 1;
		transition-duration: 350ms, 50ms;
		transition-timing-function: cubic-bezier(0.05, 0.7, 0.1, 1), linear;
		transform: scale(1);
	}
	.np-container:has(input:disabled:checked) .np-background,
	.np-container:has(input:disabled:indeterminate) .np-background {
		background: var(--np-color-on-surface);
		opacity: 0.38;
	}
	.np-icon {
		fill: var(--np-checkbox-selected-icon-color, var(--np-color-on-primary));
		height: 18px;
		width: 18px;
	}
	.np-container:has(input:disabled) .np-icon {
		fill: var(--np-color-surface);
	}
	.np-container:has(input:checked) .mark.short,
	.np-container:has(input:not(:checked):not(:indeterminate)) .mark.short {
		height: 5.6568542495px;
	}
	.np-container:has(input:indeterminate) .mark,
	.np-container:has(input:checked) .mark {
		transition-property: none;
	}
	.np-container:has(input:checked) .mark,
	.np-container:has(input:not(:checked):not(:indeterminate)) .mark {
		transform: scaleY(-1) translate(7px, -14px) rotate(45deg);
	}
	.np-container:has(input:indeterminate) .mark,
	.np-container:has(input:checked) .mark {
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
	.np-container:has(input:checked) .mark.long {
		animation-name: prev-unselected-to-checked;
	}
	.np-container:has(input:checked) .mark.long,
	.np-container:has(input:not(:checked):not(:indeterminate)) .mark.long {
		width: 11.313708499px;
	}
	.mark.long {
		height: 2px;
		transition-property: transform, width;
		width: 10px;
	}
	.np-container:has(input:indeterminate) .mark {
		transform: scaleY(-1) translate(4px, -10px) rotate(0deg);
	}
	@keyframes prev-unselected-to-checked {
		from {
			width: 0;
		}
	}
</style>
