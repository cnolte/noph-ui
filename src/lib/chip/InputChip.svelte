<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import CloseIcon from '$lib/icons/CloseIcon.svelte'
	import Ripple from '$lib/ripple/Ripple.svelte'
	import type { InputChipProps } from './types.ts'

	let {
		selected = $bindable(),
		disabled = false,
		label = '',
		icon,
		element = $bindable(),
		ariaLabelRemove = 'Remove',
		onremove,
		name,
		value,
		group = $bindable(),
		defaultSelected,
		...attributes
	}: InputChipProps = $props()

	let chipLabel: HTMLLabelElement | undefined = $state()

	$effect(() => {
		if (group && value) {
			selected = group.includes(value)
		}
	})

	$effect(() => {
		if (value && group) {
			const index = group.indexOf(value)
			if (selected) {
				if (index < 0) {
					group?.push(value)
					group = group
				}
			} else {
				if (index >= 0) {
					group.splice(index, 1)
					group = group
				}
			}
		}
	})
</script>

<div
	{...attributes}
	bind:this={element}
	class={[
		'np-filter-chip',
		icon ? 'np-filter-chip-icon' : '',
		disabled ? 'np-filter-chip-disabled' : '',
		attributes.class,
	]}
>
	<label bind:this={chipLabel} class="np-filter-chip-label">
		{#if icon}
			<div class="np-chip-icon">
				{@render icon()}
			</div>
		{/if}
		<div class="np-chip-label">{label}</div>
		<input
			type="checkbox"
			bind:checked={selected}
			onclick={(e) => e.preventDefault()}
			{value}
			{name}
			{disabled}
			defaultChecked={defaultSelected}
		/>
	</label>
	{#if !disabled}
		<Ripple forElement={chipLabel} />
	{/if}
	<IconButton
		{disabled}
		type="button"
		--np-icon-button-container-height="1.75rem"
		--np-icon-button-container-width="1.75rem"
		--np-icon-button-icon-size="1.125rem"
		aria-label={ariaLabelRemove}
		onclick={(
			event: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement
			},
		) => {
			if (element === undefined) {
				return
			}
			onremove?.(event)
		}}
	>
		<CloseIcon />
	</IconButton>
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
		padding-right: 2px;
	}
	.np-filter-chip-label input {
		opacity: 0;
		position: absolute;
		pointer-events: none;
	}
	.np-filter-chip-label {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		height: 2rem;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		color: var(--np-color-on-surface-variant);
		fill: currentColor;
		gap: 0.5rem;
		z-index: 1;
		padding-left: 1rem;
		padding-right: 2px;
		overflow: hidden;
	}
	.np-chip-icon {
		color: var(--np-color-primary);
		display: flex;
	}
	.np-filter-chip-icon .np-filter-chip-label {
		padding-left: 0.5rem;
	}
	.np-chip-label {
		line-height: 1.25rem;
		font-size: 0.875rem;
		font-weight: 500;
		padding-right: 2px;
		white-space: pre;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.np-filter-chip::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
		background-color: var(--np-color-surface-container-low);
		border-width: 1px;
		border-style: solid;
		border-color: var(--np-filter-chip-outline-color, var(--np-color-outline-variant));
	}
	.np-filter-chip:has(input:checked)::before {
		border-width: 0;
		background-color: var(--np-color-secondary-container);
	}
	.np-filter-chip:has(input:checked) {
		--np-icon-button-icon-color: var(--np-color-on-secondary-container);
	}
	.np-filter-chip:has(input:checked) .np-filter-chip-label {
		color: var(--np-color-on-secondary-container);
	}
	.np-filter-chip-label:focus-visible {
		outline-width: 0;
	}
	.np-filter-chip:has(input:focus-visible) {
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

	.np-filter-chip-disabled .np-filter-chip-label {
		cursor: default;
		color: var(--np-color-on-surface);
		opacity: 0.38;
	}
	.np-filter-chip-disabled:has(input:checked)::before {
		opacity: 0.12;
	}
	.np-filter-chip-disabled:has(input:not(:checked)).np-filter-chip::after {
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
