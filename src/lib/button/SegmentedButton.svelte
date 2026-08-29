<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import CheckIcon from '#lib/icons/CheckIcon.svelte'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { SegmentedButtonProps } from './types.ts'

	let {
		name,
		options,
		multiSelect = false,
		element = $bindable(),
		group = $bindable(),
		issues,
		...attributes
	}: SegmentedButtonProps = $props()

	let hasError = $derived(!!issues?.length)
</script>

<div
	{...attributes}
	class={['np-segmented-buttons', hasError && 'np-error', attributes.class]}
	bind:this={element}
	style="{attributes.style};grid-template-columns: repeat({options.length}, minmax(max-content, 1fr));"
>
	{#each options as option, i (i)}
		{@const optionLabel = option.label ?? `${name}-${i}`}
		<label class={['np-segmented-button', option.icon && 'width-icon']}>
			<div class="check-icon-wrapper">
				<div class="check-icon">
					<CheckIcon />
				</div>
			</div>
			{#if option.icon}
				<div class="alternate-icon-wrapper">
					<div class="alternate-icon">
						{@render option.icon()}
					</div>
				</div>
			{/if}
			{#if option.labelIcon}
				<div class="np-segmented-button-icon-label">
					{@render option.labelIcon()}
				</div>
			{:else}
				{option.label}
			{/if}
			{#if !option.disabled}
				<Ripple />
			{/if}
			{#if group !== undefined}
				{#if multiSelect}
					<input
						type="checkbox"
						onclick={option.onclick}
						bind:group
						{name}
						aria-label={optionLabel}
						value={optionLabel}
						disabled={option.disabled}
						checked={option.selected}
					/>
				{:else}
					<input
						type="radio"
						onclick={option.onclick}
						bind:group
						{name}
						aria-label={optionLabel}
						value={optionLabel}
						disabled={option.disabled}
						checked={option.selected}
					/>
				{/if}
			{:else}
				<input
					type={multiSelect ? 'checkbox' : 'radio'}
					onclick={option.onclick}
					{name}
					aria-label={optionLabel}
					value={optionLabel}
					disabled={option.disabled}
					checked={option.selected}
				/>
			{/if}
		</label>
	{/each}
</div>

<style>
	.np-segmented-buttons {
		--np-ripple-hover-color: var(--np-color-primary);
		--np-ripple-pressed-color: var(--np-color-primary);
		display: grid;
		color: var(--np-color-on-surface);
		border: 1px solid var(--np-color-outline);
		border-radius: var(--np-shape-corner-full);
		overflow-x: auto;
	}

	.np-segmented-buttons.np-error {
		--np-ripple-hover-color: var(--np-color-error);
		--np-ripple-pressed-color: var(--np-color-error);
		border-color: var(--np-color-error);
		color: var(--np-color-error);
	}

	.np-error .np-segmented-button {
		border-inline-end-color: var(--np-color-error);
	}

	.np-segmented-button {
		flex: 1;
		padding: 0.5rem 1.75rem;
		text-align: center;
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 500;
		-webkit-tap-highlight-color: transparent;
		white-space: nowrap;
		user-select: none;
		display: flex;
		justify-content: center;
		align-items: center;
		border-inline-end: 1px solid var(--np-color-outline);
		position: relative;
		transition: color var(--np-motion-expressive-fast-effects);
	}
	.np-segmented-button-icon-label {
		display: inline-flex;
	}

	:global(.np-segmented-button-icon-label svg) {
		fill: currentColor;
		width: 1.5rem;
		height: 1.5rem;
		display: block;
	}

	.np-segmented-button:has(input:disabled) {
		cursor: unset;
		opacity: 0.38;
	}

	.np-segmented-button:last-child {
		border-inline-end: none;
	}

	.np-segmented-button input {
		opacity: 0;
		position: absolute;
		pointer-events: none;
	}
	.np-segmented-button::after {
		content: ' ';
		position: absolute;
		inset: 0;
		z-index: -1;
		opacity: 0;
		transition: opacity var(--np-motion-expressive-fast-effects);
		background-color: var(--np-color-secondary-container);
	}
	.width-icon,
	.np-segmented-button:has(input:checked) {
		padding: 0.5rem 0.75rem;
	}
	.np-segmented-button:has(input:checked) {
		color: var(--np-color-on-secondary-container);
	}
	.np-segmented-button:has(input:checked)::after {
		opacity: 1;
	}
	.check-icon {
		display: flex;
		width: 0;
		overflow: hidden;
		fill: currentColor;
	}
	:global(.check-icon svg) {
		display: block;
	}
	.check-icon-wrapper {
		width: 0;
		overflow: hidden;
	}
	.alternate-icon {
		display: flex;
		width: 1.5rem;
		overflow: hidden;
		fill: currentColor;
	}
	:global(.alternate-icon svg) {
		display: block;
		width: 1.5rem;
		height: 1.5rem;
	}
	.alternate-icon-wrapper {
		width: 2rem;
		overflow: hidden;
		transition: opacity var(--np-motion-expressive-fast-effects);
	}
	.np-segmented-button:has(input:checked) :global(.alternate-icon-wrapper) {
		width: 0;
	}
	.np-segmented-button:has(input:checked) :global(.alternate-icon-wrapper .alternate-icon) {
		width: 0rem;
		opacity: 0;
	}
	.np-segmented-button:has(input:checked) :global(.check-icon-wrapper) {
		width: 2rem;
	}
	.np-segmented-button:has(input:checked) :global(.check-icon-wrapper .check-icon) {
		width: 1.5rem;
	}

	.np-segmented-button:has(input:focus-visible) :global(.np-ripple-surface)::before {
		opacity: var(--np-ripple-focus-opacity, 0.1);
	}

	.np-segmented-button:has(input:focus-visible) {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: -3px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-segmented-button {
			transition: all var(--np-motion-expressive-fast-effects);
		}
		.check-icon {
			transition: width var(--np-motion-expressive-slow-effects);
		}
		.check-icon-wrapper {
			transition: width var(--np-motion-expressive-fast-effects);
		}
		.alternate-icon {
			transition: width var(--np-motion-expressive-slow-effects);
		}
		.alternate-icon-wrapper {
			transition:
				width var(--np-motion-expressive-fast-effects),
				opacity var(--np-motion-expressive-fast-effects);
		}
		.np-segmented-button:has(input:focus-visible) {
			animation: focusAnimationInset var(--np-motion-expressive-slow-effects) forwards;
		}
	}
</style>
