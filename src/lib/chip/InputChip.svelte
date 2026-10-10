<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import IconButton from '#lib/button/IconButton.svelte'
	import CloseIcon from '#lib/icons/CloseIcon.svelte'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { InputChipProps } from './types.js'

	let {
		selected = $bindable(),
		disabled = false,
		label = '',
		icon,
		avatar,
		variant = 'outlined',
		element = $bindable(),
		actionElement = $bindable(),
		removeAriaLabel,
		onclick,
		onremove,
		name,
		value,
		issues,
		...attributes
	}: InputChipProps = $props()

	let hasError = $derived(!!issues?.length)
	let content = $derived(label || `${value ?? ''}`)
	// With nothing to do but remove, the chip is one focusable element: its remove button.
	let hasAction = $derived(!!onclick)
	let removeElement: HTMLElement | undefined = $state()

	// Backspace and Delete remove the focused chip. Focus moves on to a neighbour first, so it is
	// not lost when the chip leaves the page.
	const removeWithKey = (event: KeyboardEvent) => {
		if (disabled || (event.key !== 'Backspace' && event.key !== 'Delete')) return
		event.preventDefault()
		const set = element?.closest('.np-chip-set')
		if (set && element) {
			const chips = [
				...set.querySelectorAll<HTMLElement>('.np-input-chip:not(.np-input-chip-disabled)'),
			]
			const index = chips.indexOf(element)
			const neighbour = chips[index + 1] ?? chips[index - 1]
			neighbour?.querySelector<HTMLElement>('button')?.focus()
		}
		removeElement?.click()
	}
</script>

<div
	{...attributes}
	bind:this={element}
	aria-disabled={disabled}
	onkeydown={(event) => {
		attributes.onkeydown?.(event)
		if (!event.defaultPrevented) removeWithKey(event)
	}}
	class={[
		'np-input-chip',
		variant === 'elevated' && 'np-input-chip-elevated',
		hasAction && 'np-input-chip-action',
		avatar ? 'np-input-chip-avatar' : icon ? 'np-input-chip-icon' : '',
		disabled ? 'np-input-chip-disabled' : '',
		selected ? 'np-input-chip-selected' : '',
		hasError && !disabled && 'np-chip-error',
		attributes.class,
	]}
>
	{#snippet chipContent()}
		{#if avatar}
			<div class="np-chip-avatar" aria-hidden="true">
				{@render avatar()}
			</div>
		{:else if icon}
			<div class="np-chip-icon" aria-hidden="true">
				{@render icon()}
			</div>
		{/if}
		<div class="np-chip-label">{content}</div>
	{/snippet}
	{#if hasAction}
		<button
			bind:this={actionElement}
			type="button"
			class="np-input-chip-label"
			aria-pressed={selected === undefined ? undefined : selected}
			{disabled}
			{onclick}
		>
			{@render chipContent()}
			<span class="np-touch"></span>
		</button>
		{#if !disabled}
			<Ripple forElement={actionElement} />
		{/if}
	{:else}
		<div class="np-input-chip-label">
			{@render chipContent()}
		</div>
	{/if}
	<input type="hidden" {value} {name} {disabled} />
	<IconButton
		{disabled}
		type="button"
		size="xs"
		--np-icon-button-icon-size="1.125rem"
		aria-label={removeAriaLabel ?? `Remove ${content}`}
		bind:element={removeElement}
		onclick={onremove}
	>
		<CloseIcon />
	</IconButton>
</div>

<style>
	.np-input-chip {
		box-sizing: border-box;
		position: relative;
		display: inline-flex;
		align-items: center;
		user-select: none;
		border-radius: var(--np-input-chip-container-shape, var(--np-shape-corner-small));
		--np-icon-button-icon-color: var(--np-color-on-surface-variant);
		--np-icon-size: 1.125rem;
		--np-ripple-pressed-opacity: 0.1;
		--_state-color: var(--np-color-on-surface-variant);
		padding-inline-end: 1px;
	}
	/* With an action besides remove, both keep a 48px target side by side. */
	.np-input-chip-action {
		min-width: 5.5rem;
	}
	.np-chip-error {
		--np-input-chip-outline-color: var(--np-color-error);
		--np-icon-button-icon-color: var(--np-color-error);
		--np-ripple-hover-color: var(--np-color-error);
		--np-ripple-pressed-color: var(--np-color-error);
		color: var(--np-color-error);
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
		position: relative;
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
	div.np-input-chip-label {
		cursor: default;
	}
	.np-input-chip-icon .np-input-chip-label {
		padding-inline-start: 0.5rem;
	}
	.np-input-chip-avatar .np-input-chip-label {
		padding-inline-start: 0.25rem;
	}
	/* A leading image is larger than an icon, with rounded corners. */
	.np-chip-avatar {
		display: flex;
		flex: none;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 0.75rem;
		overflow: hidden;
	}
	.np-chip-avatar > :global(*) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.np-touch {
		position: absolute;
		inset-inline: 0;
		top: 50%;
		translate: 0 -50%;
		height: 3rem;
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
	.np-input-chip-elevated {
		box-shadow: var(--np-elevation-1);
	}
	.np-input-chip-elevated:not(.np-input-chip-selected)::before {
		outline-color: transparent;
		background-color: var(--np-color-surface-container-low);
	}
	.np-input-chip-elevated.np-input-chip-disabled {
		box-shadow: none;
	}
	.np-input-chip-selected {
		--np-icon-button-icon-color: var(--np-color-on-secondary-container);
		--_state-color: var(--np-color-on-secondary-container);
	}
	.np-input-chip-selected .np-input-chip-label {
		color: var(--np-color-on-secondary-container);
	}
	/* The whole chip shows focus, with its ring and a 10% state layer: when its body is focused, or its
	   remove button when that is all the chip has. A remove button next to a body shows its own. */
	.np-input-chip:is(
		:has(> .np-input-chip-label:focus-visible),
		:not(.np-input-chip-action):has(:global(:focus-visible))
	) {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: 2px;
		&::before {
			--_state-layer: color-mix(in srgb, var(--_state-color) 10%, transparent);
			background-image: linear-gradient(var(--_state-layer), var(--_state-layer));
		}
		@media (prefers-reduced-motion: no-preference) {
			animation: focusAnimation var(--np-motion-expressive-slow-effects) forwards;
		}
	}
	.np-input-chip:not(.np-input-chip-action) {
		--np-ripple-focus-opacity: 0;
	}
	.np-input-chip:not(.np-input-chip-action) :global(.np-icon-button:focus-visible) {
		outline: none;
		animation: none;
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
