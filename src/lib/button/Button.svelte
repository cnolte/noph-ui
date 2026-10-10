<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import { pressMorph } from '#lib/press.svelte.js'
	import CircularProgress from '#lib/progress/CircularProgress.svelte'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import Tooltip from '#lib/tooltip/Tooltip.svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import { getButtonGroupContext } from './groupContext.js'
	import type { ButtonProps } from './types.js'

	let {
		variant = 'outlined',
		children,
		start,
		end,
		title,
		element = $bindable(),
		disabled = false,
		loading = false,
		loadingAriaLabel,
		size: sizeProp,
		shape: shapeProp,
		toggle = false,
		selected = $bindable(false),
		...attributes
	}: ButtonProps = $props()

	const uid = $props.id()

	let isLink = $derived(attributes.href != null && !disabled && !loading)

	let tooltipId = $derived(title && !disabled && !loading ? uid : undefined)
	// A visible label names the button, the tooltip only describes it. Without one, the tooltip
	// text is the name, and describing the button with it again would read it twice.
	let tooltipNames = $derived(!!tooltipId && !children && !attributes['aria-label'])

	// Inside a ButtonGroup, the group sets the size and shape its buttons leave open, and with
	// `selection` it decides what is selected.
	const group = getButtonGroupContext()
	let size = $derived(sizeProp ?? group?.size ?? 's')
	let shape = $derived(shapeProp ?? group?.shape ?? 'round')
	let groupValue = $derived(
		group?.selection && attributes.value != null ? String(attributes.value) : undefined,
	)
	let isToggle = $derived(toggle || groupValue !== undefined)
	let isSelected = $derived(groupValue !== undefined ? group!.isSelected(groupValue) : selected)
	// A selected toggle swaps its resting shape: round turns square, square turns round.
	let shapeClass = $derived(
		isSelected ? (shape === 'square' ? 'round' : 'square') : loading ? 'square' : shape,
	)

	const morph = pressMorph()

	const handlePress = () => {
		if (disabled || loading) return
		morph.press()
	}
</script>

{#snippet content()}
	{#if !disabled && !loading}
		<Ripple forElement={element} />
		<span class="np-touch"></span>
	{/if}
	{#if loading}
		<div class="circular-progress">
			<CircularProgress aria-label={loadingAriaLabel} indeterminate track={false} />
		</div>
	{/if}
	{#if start}
		<div class="button-icon">
			{@render start()}
		</div>
	{/if}
	{#if children}
		<div class="children-wrapper">
			{@render children()}
		</div>
	{/if}
	{#if end}
		<div class="button-icon">
			{@render end()}
		</div>
	{/if}
{/snippet}

{#if isLink}
	<a
		{...attributes}
		onclick={(event) => {
			if (!isToggle) {
				handlePress()
			}
			attributes.onclick?.(event)
		}}
		aria-describedby={(!tooltipNames && tooltipId) || attributes['aria-describedby']}
		interestfor={tooltipId ?? attributes['interestfor']}
		aria-label={attributes['aria-label'] ?? (tooltipNames ? title : undefined)}
		bind:this={element}
		class={[
			'np-button',
			size,
			shapeClass,
			isToggle && 'toggle',
			isSelected && 'selected',
			'enabled',
			variant,
			morph.pressed && 'pressed',
			attributes.class,
		]}
	>
		{@render content()}
	</a>
{:else}
	<button
		{...attributes as HTMLButtonAttributes}
		aria-describedby={(!tooltipNames && tooltipId) || attributes['aria-describedby']}
		interestfor={tooltipId ?? attributes['interestfor']}
		aria-label={attributes['aria-label'] ?? (tooltipNames ? title : undefined)}
		disabled={disabled || loading}
		aria-pressed={isToggle ? isSelected : undefined}
		aria-busy={loading}
		type={(attributes['type'] as 'button' | 'submit' | 'reset' | 'button') ?? undefined}
		bind:this={element}
		onclick={(event) => {
			if (groupValue !== undefined) {
				group!.toggle(groupValue)
			} else if (toggle) {
				selected = !selected
			} else {
				handlePress()
			}
			attributes.onclick?.(event)
		}}
		class={[
			'np-button',
			size,
			shapeClass,
			isToggle && 'toggle',
			isSelected && 'selected',
			loading && 'np-loading',
			disabled || loading ? `${variant}-disabled disabled` : `${variant} enabled`,
			morph.pressed && 'pressed',
			attributes.class,
		]}
	>
		{@render content()}
	</button>
{/if}

{#if tooltipId}
	<Tooltip id={tooltipId}>{title}</Tooltip>
{/if}

<style>
	/* The label is never truncated or wrapped, the button grows to fit it instead. */
	.children-wrapper {
		min-width: 0;
		overflow: var(--_button-label-overflow, visible);
		text-wrap: nowrap;
	}
	.circular-progress {
		--np-circular-progress-color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
		position: absolute;
		top: 50%;
		inset-inline-start: 50%;
		transform: translate(-50%, -50%);
	}
	.np-loading .button-icon,
	.np-loading .children-wrapper {
		opacity: 0;
	}
	.np-button {
		/* State layers take the content color of each variant and state. */
		--np-ripple-hover-color: currentColor;
		--np-ripple-pressed-color: currentColor;
		box-sizing: border-box;
		font: inherit;
		background-color: transparent;
		border-width: 0;
		-webkit-tap-highlight-color: transparent;
		position: relative;
		cursor: pointer;
		display: inline-flex;
		user-select: none;
		align-items: center;
		/* Icon and label stay grouped and centered, also in a stretched button. */
		justify-content: center;
		text-align: center;
		min-width: var(--_button-min-width, max-content);
		font-weight: 500;
		text-decoration: none;
		--np-icon-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
		transition:
			background-color var(--np-motion-expressive-default-effects),
			box-shadow var(--np-motion-expressive-default-effects);
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-button {
			transition:
				background-color var(--np-motion-expressive-default-effects),
				border-radius var(--np-motion-expressive-default-effects),
				box-shadow var(--np-motion-expressive-default-effects);
		}
	}
	.round {
		border-radius: var(--_round-radius);
	}
	.xs {
		font-size: 0.875rem;
		height: 2rem;
		padding-inline: var(--np-button-padding, 0.75rem);
		gap: var(--np-button-gap, 0.25rem);
		--_icon-size: var(--np-button-icon-size, 1.25rem);
		--np-circular-progress-size: 1.75rem;
		--_round-radius: 1rem;
		--_pressed-radius: 0.5rem;
	}
	.xs.square {
		border-radius: var(--np-button-shape, 0.75rem);
	}
	.s {
		font-size: 0.875rem;
		height: 2.5rem;
		padding-inline: var(--np-button-padding, 1rem);
		gap: var(--np-button-gap, 0.5rem);
		--_icon-size: var(--np-button-icon-size, 1.25rem);
		--np-circular-progress-size: 2rem;
		--_round-radius: 1.25rem;
		--_pressed-radius: 0.5rem;
	}
	.s.square {
		border-radius: var(--np-button-shape, 0.75rem);
	}
	.m {
		font-size: 1rem;
		height: 3.5rem;
		padding-inline: var(--np-button-padding, 1.5rem);
		gap: var(--np-button-gap, 0.5rem);
		--_icon-size: var(--np-button-icon-size, 1.5rem);
		--np-circular-progress-size: 3rem;
		--_round-radius: 1.75rem;
		--_pressed-radius: 0.75rem;
	}
	.m.square {
		border-radius: var(--np-button-shape, 1rem);
	}
	.l {
		font-size: 1.5rem;
		height: 6rem;
		padding-inline: var(--np-button-padding, 3rem);
		gap: var(--np-button-gap, 0.75rem);
		--_icon-size: var(--np-button-icon-size, 2rem);
		--np-circular-progress-size: 5rem;
		--_round-radius: 3rem;
		--_pressed-radius: 1rem;
	}
	.l.square {
		border-radius: var(--np-button-shape, 1.75rem);
	}
	.xl {
		font-size: 2rem;
		height: 8.5rem;
		padding-inline: var(--np-button-padding, 4rem);
		gap: var(--np-button-gap, 1rem);
		--_icon-size: var(--np-button-icon-size, 2.5rem);
		--np-circular-progress-size: 7rem;
		--_round-radius: 4.25rem;
		--_pressed-radius: 1rem;
	}
	.xl.square {
		border-radius: var(--np-button-shape, 1.75rem);
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-button:is(:active, .pressed) {
			border-radius: var(--_pressed-radius);
		}
	}
	.toggle {
		--np-icon-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}
	.selected {
		--np-icon-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}
	.disabled {
		pointer-events: none;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}
	.filled-disabled,
	.tonal-disabled,
	.elevated-disabled {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
	}
	.outlined-disabled {
		--_outlined-border-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
	}
	.enabled:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: 2px;
	}
	.enabled:focus-visible :global(.np-ripple-surface)::before {
		opacity: var(--np-ripple-focus-opacity, 0.1);
	}
	/* Extra small and small buttons keep a 48px tall target around them. */
	.np-touch {
		position: absolute;
		inset-inline: 0;
		top: 50%;
		translate: 0 -50%;
		height: max(3rem, 100%);
	}
	@media (prefers-reduced-motion: no-preference) {
		.enabled:focus-visible {
			animation: focusAnimation var(--np-motion-expressive-slow-effects) forwards;
		}
	}
	.text {
		color: var(--np-text-button-label-text-color, var(--np-color-primary));
	}
	.filled {
		color: var(--np-filled-button-label-text-color, var(--np-color-on-primary));
		background-color: var(--np-filled-button-container-color, var(--np-color-primary));
	}
	.filled.toggle {
		background-color: var(--np-color-surface-container);
		color: var(--np-color-on-surface-variant);
	}
	.filled.selected {
		background-color: var(--np-color-primary);
		color: var(--np-color-on-primary);
	}
	@media (hover: hover) {
		.filled:hover {
			box-shadow: var(
				--np-elevation-1,
				0 1px 2px 0 rgb(0 0 0 / 0.6),
				0 0px 0px -1px rgb(0 0 0 / 0.6)
			);
		}
	}
	.filled:active {
		box-shadow: none;
	}

	.tonal {
		color: var(--np-tonal-button-label-text-color, var(--np-color-on-secondary-container));
		background-color: var(--np-tonal-button-container-color, var(--np-color-secondary-container));
	}
	.tonal.selected {
		background-color: var(--np-color-secondary);
		color: var(--np-color-on-secondary);
	}

	@media (hover: hover) {
		.tonal:hover {
			box-shadow: var(
				--np-elevation-1,
				0 1px 2px 0 rgb(0 0 0 / 0.6),
				0 0px 0px -1px rgb(0 0 0 / 0.6)
			);
		}
	}
	.tonal:active {
		box-shadow: none;
	}

	.elevated {
		color: var(--np-elevated-button-label-text-color, var(--np-color-primary));
		background-color: var(
			--np-elevated-button-container-color,
			var(--np-color-surface-container-low)
		);
		box-shadow: var(--np-elevation-1);
	}
	.elevated.selected {
		background-color: var(--np-color-primary);
		color: var(--np-color-on-primary);
	}

	@media (hover: hover) {
		.elevated:hover {
			box-shadow: var(--np-elevation-2);
		}
	}
	.elevated:active {
		box-shadow: var(--np-elevation-1);
	}
	.outlined {
		background-color: var(--np-outlined-button-container-color, transparent);
		--_outlined-border-color: var(
			--np-outlined-button-outline-color,
			var(--np-color-outline-variant)
		);
		color: var(--np-outlined-button-label-text-color, var(--np-color-on-surface-variant));
	}

	.outlined:not(.selected)::after,
	.outlined-disabled::after {
		content: '';
		position: absolute;
		inset: 0;
		border: 1px solid var(--_outlined-border-color);
		border-radius: inherit;
		pointer-events: none;
	}

	.outlined.selected {
		background-color: var(--np-color-inverse-surface);
		color: var(--np-color-inverse-on-surface);
	}
	.button-icon {
		display: inline-flex;
		align-items: center;
		pointer-events: none;
	}

	:global(.np-button .button-icon) {
		--_icon-color: var(--np-button-icon-color, inherit);
	}

	:global(.np-button .button-icon svg) {
		fill: currentColor;
		display: block;
		width: var(--_icon-size);
		height: var(--_icon-size);
	}

	@media (forced-colors: active) {
		.np-button {
			border: 1px solid CanvasText;
		}
	}
</style>
