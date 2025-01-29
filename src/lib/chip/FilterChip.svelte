<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import CheckIcon from '$lib/icons/CheckIcon.svelte'
	import CloseIcon from '$lib/icons/CloseIcon.svelte'
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { FilterChipProps } from './types.ts'

	let {
		selected = $bindable(false),
		removable = false,
		elevated = false,
		disabled = false,
		label = '',
		icon,
		element = $bindable(),
		ariaLabelRemove = 'Remove',
		remove,
		select,
		deselect,
		...attributes
	}: FilterChipProps = $props()

	let chipBtn: HTMLButtonElement | undefined = $state()
</script>

<div
	{...attributes}
	bind:this={element}
	class={[
		'np-filter-chip',
		elevated ? 'np-filter-chip-elevated' : 'np-filter-chip-default',
		icon || selected ? 'np-filter-chip-icon' : '',
		selected ? 'np-filter-chip-selected' : '',
		removable ? 'np-filter-chip-removable' : '',
		disabled ? 'np-filter-chip-disabled' : '',
		attributes.class,
	]}
>
	<button
		bind:this={chipBtn}
		class="np-filter-chip-btn"
		{disabled}
		onclick={() => {
			if (element === undefined) return
			if (selected) {
				deselect?.(element)
			} else {
				select?.(element)
			}
			selected = !selected
		}}
	>
		{#if icon && !selected}
			<div class="np-chip-icon">
				{@render icon()}
			</div>
		{/if}
		{#if selected}
			<CheckIcon width={18} height={18} />
		{/if}
		<div class="np-chip-label">{label}</div>
	</button>
	{#if !disabled}
		<Ripple forElement={chipBtn} />
	{/if}
	{#if removable}
		<IconButton
			{disabled}
			--np-icon-button-container-height="1.75rem"
			--np-icon-button-container-width="1.75rem"
			--np-icon-button-icon-size="1.125rem"
			aria-label={ariaLabelRemove}
			onclick={() => {
				if (element === undefined) {
					return
				}
				remove?.(element)
			}}
		>
			<CloseIcon />
		</IconButton>
	{/if}
</div>

<style>
	.np-filter-chip {
		position: relative;
		display: inline-flex;
		align-items: center;
		user-select: none;
		border-radius: var(--np-filter-chip-container-shape, var(--np-shape-corner-small));
		--np-icon-button-icon-color: var(--np-color-on-surface-variant);
		--np-icon-size: 1.125rem;
	}
	.np-filter-chip-btn {
		box-sizing: border-box;
		font-family: inherit;
		background-color: transparent;
		border-width: 0;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		padding: 0;
		height: 2rem;
		color: var(--np-color-on-surface-variant);
		fill: currentColor;
		gap: 0.5rem;
		z-index: 1;
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.np-chip-icon {
		color: var(--np-color-primary);
		display: flex;
	}
	.np-filter-chip-icon .np-filter-chip-btn {
		padding-left: 0.5rem;
	}
	.np-filter-chip-removable {
		padding-right: 2px;
	}
	.np-filter-chip-removable .np-filter-chip-btn {
		padding-right: 2px;
	}
	.np-chip-label {
		line-height: 1.25rem;
		font-size: 0.875rem;
		font-weight: 500;
	}
	.np-filter-chip::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
		background-color: var(--np-color-surface-container-low);
	}
	.np-filter-chip-default::before {
		border-width: 1px;
		border-style: solid;
		border-color: var(--np-filter-chip-outline-color, var(--np-color-outline-variant));
	}
	.np-filter-chip-selected::before {
		border-width: 0;
		background-color: var(--np-color-secondary-container);
	}
	.np-filter-chip-elevated {
		border-width: 0;
		box-shadow: var(--np-elevation-1);
	}
	.np-filter-chip-selected {
		--np-icon-button-icon-color: var(--np-color-on-secondary-container);
	}
	.np-filter-chip-selected .np-filter-chip-btn {
		color: var(--np-color-on-secondary-container);
	}
	.np-filter-chip-btn:focus-visible {
		outline-width: 0;
	}
	.np-filter-chip:has(.np-filter-chip-btn:focus-visible) {
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

	.np-filter-chip-disabled .np-filter-chip-btn {
		cursor: default;
		color: var(--np-color-on-surface);
		opacity: 0.38;
	}
	.np-filter-chip-disabled.np-filter-chip-elevated {
		box-shadow: none;
	}
	.np-filter-chip-disabled.np-filter-chip-selected::before {
		opacity: 0.12;
	}
	:not(.np-filter-chip-selected).np-filter-chip-disabled.np-filter-chip-default::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
		border-width: 1px;
		border-style: solid;
		border-color: var(--np-color-on-surface);
		opacity: 0.12;
	}
	.np-filter-chip-disabled::before {
		background-color: var(--np-color-on-surface);
		opacity: 0.12;
		border-width: 0;
	}
</style>
