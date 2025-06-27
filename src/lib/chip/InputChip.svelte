<script lang="ts">
	import IconButton from '$lib/button/IconButton.svelte'
	import CloseIcon from '$lib/icons/CloseIcon.svelte'
	import Ripple from '$lib/ripple/Ripple.svelte'
	import { onMount } from 'svelte'
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
		...attributes
	}: InputChipProps = $props()

	let chipLabel: HTMLDivElement | undefined = $state()
	let visible = $state(false)

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					visible = true
					observer.disconnect()
				}
			})
		})

		if (element) {
			observer.observe(element)
		}

		return () => {
			observer.disconnect()
		}
	})
</script>

<div
	{...attributes}
	bind:this={element}
	tabindex={disabled ? -1 : 0}
	aria-disabled={disabled}
	role="button"
	class={[
		'np-input-chip',
		icon ? 'np-input-chip-icon' : '',
		disabled ? 'np-input-chip-disabled' : '',
		selected ? 'np-input-chip-selected' : '',
		attributes.class,
	]}
>
	{#if visible}
		<div bind:this={chipLabel} class={['np-input-chip-label']}>
			{#if icon}
				<div class="np-chip-icon">
					{@render icon()}
				</div>
			{/if}
			<div class="np-chip-label">{label || value}</div>
			<input type="hidden" {value} {name} {disabled} />
		</div>
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
	{:else}
		<div class="np-skeleton">
			{label}
			<input type="hidden" {value} {name} {disabled} />
		</div>
	{/if}
</div>

<style>
	.np-skeleton {
		height: 2rem;
		line-height: 1.25rem;
		font-size: 0.875rem;
		font-weight: 500;
		opacity: 0;
		display: flex;
		align-items: center;
		padding-left: 1rem;
		padding-right: 2rem;
	}
	.np-input-chip {
		position: relative;
		display: inline-flex;
		align-items: center;
		user-select: none;
		border-radius: var(--np-input-chip-container-shape, var(--np-shape-corner-small));
		--np-icon-button-icon-color: var(--np-color-on-surface-variant);
		--np-icon-size: 1.125rem;
		padding-right: 2px;
		min-width: 0;
	}
	.np-input-chip-label input {
		opacity: 0;
		position: absolute;
		pointer-events: none;
	}
	.np-input-chip-label {
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
	.np-input-chip-icon .np-input-chip-label {
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
	.np-input-chip::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
		border-width: 1px;
		border-style: solid;
		border-color: var(--np-input-chip-outline-color, var(--np-color-outline-variant));
	}
	.np-input-chip-selected::before {
		border-width: 0;
		background-color: var(--np-color-secondary-container);
	}
	.np-input-chip-selected {
		--np-icon-button-icon-color: var(--np-color-on-secondary-container);
	}
	.np-input-chip-selected .np-input-chip-label {
		color: var(--np-color-on-secondary-container);
	}
	.np-input-chip:focus-visible {
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

	.np-input-chip-disabled .np-input-chip-label {
		cursor: default;
		color: var(--np-color-on-surface);
		opacity: 0.38;
	}
	.np-input-chip-disabled.np-input-chip-selected::before {
		opacity: 0.12;
	}
	.np-input-chip-disabled:not(.np-input-chip-selected).np-input-chip::after {
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
	.np-input-chip-disabled::before {
		opacity: 0.12;
	}
	.np-input-chip-selected.np-input-chip-disabled::before {
		background-color: var(--np-color-on-surface);
	}
</style>
