<script lang="ts">
	import IconButton from '#lib/button/IconButton.svelte'
	import CloseIcon from '#lib/icons/CloseIcon.svelte'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { InputChipProps } from './types.ts'

	let {
		selected = $bindable(),
		disabled = false,
		label = '',
		icon,
		element = $bindable(),
		actionElement = $bindable(),
		ariaLabelRemove = 'Remove',
		onclick,
		onremove,
		name,
		value,
		...attributes
	}: InputChipProps = $props()
</script>

<div
	{...attributes}
	bind:this={element}
	aria-disabled={disabled}
	class={[
		'np-input-chip',
		icon ? 'np-input-chip-icon' : '',
		disabled ? 'np-input-chip-disabled' : '',
		selected ? 'np-input-chip-selected' : '',
		attributes.class,
	]}
>
	<button
		bind:this={actionElement}
		type="button"
		class="np-input-chip-label"
		aria-pressed={selected === undefined ? undefined : selected}
		{disabled}
		{onclick}
	>
		{#if icon}
			<div class="np-chip-icon">
				{@render icon()}
			</div>
		{/if}
		<div class="np-chip-label">{label || value}</div>
	</button>
	<input type="hidden" {value} {name} {disabled} />
	{#if !disabled}
		<Ripple forElement={actionElement} />
	{/if}
	<IconButton
		{disabled}
		type="button"
		size="xs"
		--np-icon-button-icon-size="1.125rem"
		aria-label={ariaLabelRemove}
		onclick={onremove}
	>
		<CloseIcon />
	</IconButton>
</div>

<style>
	.np-input-chip {
		position: relative;
		display: inline-flex;
		align-items: center;
		user-select: none;
		border-radius: var(--np-input-chip-container-shape, var(--np-shape-corner-small));
		--np-icon-button-icon-color: var(--np-color-on-surface-variant);
		--np-icon-size: 1.125rem;
		--np-ripple-pressed-opacity: 0.1;
		padding-inline-end: 1px;
		min-width: 0;
	}
	.np-input-chip-label {
		appearance: none;
		background: none;
		border-width: 0;
		font: inherit;
		margin: 0;
		padding-block: 0;
		padding-inline-end: 0;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		height: 2rem;
		-webkit-tap-highlight-color: transparent;
		color: var(--np-color-on-surface-variant);
		fill: currentColor;
		gap: 0.5rem;
		z-index: 1;
		padding-inline-start: 0.75rem;
		overflow: hidden;
		min-width: 0;
	}
	.np-input-chip-label:focus-visible {
		outline: none;
	}
	.np-chip-icon {
		color: var(--np-color-on-surface-variant);
		display: flex;
	}
	.np-input-chip-selected .np-chip-icon {
		color: var(--np-color-primary);
	}
	.np-input-chip-icon .np-input-chip-label {
		padding-inline-start: 0.5rem;
	}
	.np-chip-label {
		line-height: 1.25rem;
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.006rem;
		padding-inline-end: 1px;
		white-space: pre;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.np-input-chip::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
		outline-style: solid;
		outline-color: var(--np-input-chip-outline-color, var(--np-color-outline-variant));
		outline-width: 1px;
		outline-offset: -1px;
		transition:
			background-color 150ms linear,
			outline-color 150ms linear;
	}
	.np-input-chip-selected::before {
		outline-color: transparent;
		background-color: var(--np-color-secondary-container);
	}
	.np-input-chip-selected {
		--np-icon-button-icon-color: var(--np-color-on-secondary-container);
	}
	.np-input-chip-selected .np-input-chip-label {
		color: var(--np-color-on-secondary-container);
	}
	.np-input-chip:has(:focus-visible) {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
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

	.np-input-chip-disabled .np-input-chip-label {
		cursor: default;
		color: var(--np-color-on-surface);
		opacity: 0.38;
	}
	.np-input-chip-disabled:not(.np-input-chip-selected)::before {
		outline-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
		background-color: transparent;
	}
	.np-input-chip-selected.np-input-chip-disabled::before {
		outline-color: transparent;
		background-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
	}
</style>
