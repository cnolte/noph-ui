<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import IconButton from '#lib/button/IconButton.svelte'
	import CheckIcon from '#lib/icons/CheckIcon.svelte'
	import CloseIcon from '#lib/icons/CloseIcon.svelte'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { FilterChipProps } from './types.ts'

	let {
		selected = $bindable(),
		removable = false,
		variant = 'outlined',
		disabled = false,
		label = '',
		icon,
		element = $bindable(),
		removeAriaLabel = 'Remove',
		onremove,
		name,
		value,
		group = $bindable(),
		defaultSelected,
		issues,
		'aria-invalid': ariaInvalid,
		...attributes
	}: FilterChipProps = $props()

	let hasError = $derived(!!issues?.length)

	let chipLabel: HTMLLabelElement | undefined = $state()

	let isChecked = $derived(
		Array.isArray(group) && value !== undefined ? group.includes(value) : selected,
	)

	const onchange = (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const next = event.currentTarget.checked
		if (Array.isArray(group) && value !== undefined) {
			group = next
				? group.includes(value)
					? group
					: [...group, value]
				: group.filter((entry) => entry !== value)
		}
		selected = next
	}
</script>

<div
	{...attributes}
	bind:this={element}
	class={[
		'np-filter-chip',
		variant === 'elevated' ? 'np-filter-chip-elevated' : 'np-filter-chip-default',
		icon ? 'np-filter-chip-icon' : '',
		removable ? 'np-filter-chip-removable' : '',
		disabled ? 'np-filter-chip-disabled' : '',
		hasError && !disabled && 'np-chip-error',
		attributes.class,
	]}
>
	<label bind:this={chipLabel} class="np-filter-chip-label">
		{#if icon}
			<div class="np-chip-icon">
				{@render icon()}
			</div>
		{/if}
		<div class="np-chip-icon-checked">
			<CheckIcon width={18} height={18} />
		</div>
		<div class="np-chip-label">{label}</div>
		<input
			type="checkbox"
			checked={isChecked}
			{onchange}
			{value}
			{name}
			{disabled}
			defaultChecked={defaultSelected}
			aria-invalid={hasError ? 'true' : ariaInvalid}
		/>
	</label>
	{#if !disabled}
		<Ripple forElement={chipLabel} />
	{/if}
	{#if removable}
		<IconButton
			{disabled}
			type="button"
			size="xs"
			--np-icon-button-icon-size="1.125rem"
			aria-label={removeAriaLabel}
			onclick={onremove}
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
		--np-ripple-pressed-opacity: 0.1;
		min-width: 0;
		transition: box-shadow var(--np-motion-expressive-slow-effects);
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
		-webkit-tap-highlight-color: transparent;
		color: var(--np-color-on-surface-variant);
		fill: currentColor;
		gap: 0.5rem;
		z-index: 1;
		padding-inline: 1rem;
		overflow: hidden;
	}
	.np-chip-icon-checked {
		display: flex;
		width: 0;
		min-width: 0;
		margin-inline-end: -0.5rem;
		overflow: hidden;
	}
	.np-filter-chip:has(input:checked) .np-chip-icon-checked {
		width: 18px;
		margin-inline-end: 0;
	}
	.np-filter-chip:has(input:checked) .np-chip-icon {
		display: none;
	}
	.np-chip-icon {
		color: var(--np-color-on-surface-variant);
		display: flex;
	}

	.np-filter-chip-disabled .np-chip-icon {
		color: var(--np-color-on-surface);
	}
	.np-filter-chip:has(input:checked) .np-filter-chip-label,
	.np-filter-chip-icon .np-filter-chip-label {
		padding-inline-start: 0.5rem;
	}
	.np-filter-chip-removable {
		padding-inline-end: 1px;
	}
	.np-filter-chip-removable .np-filter-chip-label {
		padding-inline-end: 1px;
	}
	.np-chip-label {
		line-height: 1.25rem;
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.006rem;
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
		transition:
			background-color 150ms linear,
			outline-color 150ms linear;
	}
	.np-filter-chip-default::before {
		outline-style: solid;
		outline-color: var(--np-filter-chip-outline-color, var(--np-color-outline-variant));
		outline-width: 1px;
		outline-offset: -1px;
	}
	.np-chip-error {
		--np-filter-chip-outline-color: var(--np-color-error);
		--np-ripple-hover-color: var(--np-color-error);
		--np-ripple-pressed-color: var(--np-color-error);
		color: var(--np-color-error);
	}
	.np-chip-error:has(input:checked)::before {
		background-color: var(--np-color-error-container);
	}
	.np-chip-error:has(input:checked) {
		color: var(--np-color-on-error-container);
	}
	.np-filter-chip:has(input:checked)::before {
		outline-color: transparent;
		background-color: var(--np-color-secondary-container);
	}
	.np-filter-chip-elevated {
		box-shadow: var(--np-elevation-1);
	}
	.np-filter-chip-elevated::before {
		background-color: var(--np-color-surface-container-low);
	}
	@media (hover: hover) {
		.np-filter-chip-elevated:not(.np-filter-chip-disabled):hover {
			box-shadow: var(--np-elevation-2);
		}
		.np-filter-chip-default:not(.np-filter-chip-disabled):has(input:checked):hover {
			box-shadow: var(--np-elevation-1);
		}
	}
	.np-filter-chip-elevated:not(.np-filter-chip-disabled):has(.np-filter-chip-label:active) {
		box-shadow: var(--np-elevation-1);
	}
	.np-filter-chip-default:not(.np-filter-chip-disabled):has(
			.np-filter-chip-label:active input:checked
		) {
		box-shadow: none;
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
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: 2px;
	}

	.np-filter-chip-disabled .np-filter-chip-label {
		cursor: default;
		color: var(--np-color-on-surface) !important;
		opacity: 0.38;
	}
	.np-filter-chip-disabled.np-filter-chip-elevated {
		box-shadow: none;
	}
	.np-filter-chip-disabled.np-filter-chip-default:has(input:not(:checked))::before {
		outline-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
		background-color: transparent;
	}

	.np-filter-chip-disabled.np-filter-chip-elevated::before,
	.np-filter-chip-disabled:has(input:checked)::before {
		outline-color: transparent;
		background-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-filter-chip-label {
			transition: padding var(--np-motion-expressive-default-effects);
		}
		.np-chip-icon-checked {
			transition:
				width var(--np-motion-expressive-default-effects),
				margin var(--np-motion-expressive-default-effects);
		}
		.np-filter-chip-icon .np-chip-icon-checked {
			transition: none;
		}
		.np-filter-chip:has(input:focus-visible) {
			animation: focusAnimation var(--np-motion-expressive-slow-effects) forwards;
		}
	}
</style>
