<script lang="ts">
	import CircularProgress from '$lib/progress/CircularProgress.svelte'
	import Ripple from '$lib/ripple/Ripple.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import { onMount } from 'svelte'
	import type { HTMLButtonAttributes, MouseEventHandler } from 'svelte/elements'
	import type { ButtonProps } from './types.ts'

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
		size = 's',
		shape = 'round',
		toggle = false,
		selected = $bindable(false),
		...attributes
	}: ButtonProps = $props()

	const uid = $props.id()

	let pressed = $state(false)
	let pressedTimeout: ReturnType<typeof setTimeout>

	const handlePress = () => {
		if (disabled || loading) return
		pressed = true
		pressedTimeout = setTimeout(() => {
			pressed = false
		}, 100)
	}

	onMount(() => {
		return () => {
			clearTimeout(pressedTimeout)
		}
	})
</script>

{#snippet content()}
	{#if !disabled && !loading}
		<Ripple forElement={element} />
	{/if}
	{#if loading}
		<div class="circular-progress">
			<CircularProgress aria-label={loadingAriaLabel} indeterminate />
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

{#if 'href' in attributes && !disabled && !loading}
	<a
		{...attributes}
		onclick={(event) => {
			if (!toggle) {
				handlePress()
			}
			attributes.onclick?.(event)
		}}
		aria-describedby={title ? uid : attributes['aria-describedby']}
		aria-label={title || attributes['aria-label']}
		bind:this={element}
		class={[
			'np-button',
			size,
			selected ? 'square' : shape,
			toggle && 'toggle',
			'enabled',
			variant,
			pressed && 'pressed',
			attributes.class,
		]}
	>
		{@render content()}
	</a>
{:else}
	<button
		{...attributes as HTMLButtonAttributes}
		aria-describedby={title ? uid : attributes['aria-describedby']}
		aria-label={title || attributes['aria-label']}
		disabled={disabled || loading}
		aria-pressed={toggle ? selected : undefined}
		aria-busy={loading}
		type={(attributes['type'] as 'button' | 'submit' | 'reset' | 'button') ?? undefined}
		bind:this={element}
		onclick={(event) => {
			if (toggle) {
				selected = !selected
			} else {
				handlePress()
			}
			// prettier-ignore
			;(attributes.onclick as MouseEventHandler<HTMLButtonElement>)?.(event)
		}}
		class={[
			'np-button',
			size,
			selected || loading ? 'square' : shape,
			toggle && 'toggle',
			selected && 'selected',
			loading && 'np-loading',
			disabled || loading ? `${variant}-disabled disabled` : `${variant} enabled`,
			pressed && 'pressed',
			attributes.class,
		]}
	>
		{@render content()}
	</button>
{/if}

{#if title && !disabled && !loading}
	<Tooltip id={uid}>{title}</Tooltip>
{/if}

<style>
	.children-wrapper {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
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
		text-align: start;
		overflow: hidden;
		font-weight: 500;
		text-decoration: none;
		--np-icon-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
		transition:
			background-color 150ms linear,
			border-radius 100ms linear,
			box-shadow 150ms linear;
	}
	.xs {
		font-size: 0.875rem;
		height: 2rem;
		padding-inline: var(--np-button-padding, 0.75rem);
		gap: var(--np-button-gap, 0.25rem);
		--_icon-size: var(--np-button-icon-size, 1.25rem);
		--np-circular-progress-size: 1.75rem;
	}
	.xs.round {
		border-radius: 1rem;
	}
	.xs.square {
		border-radius: var(--np-button-shape, 0.75rem);
	}
	.xs:active,
	.xs.pressed {
		border-radius: 0.5rem;
	}
	.s {
		font-size: 0.875rem;
		height: 2.5rem;
		padding-inline: var(--np-button-padding, 1rem);
		gap: var(--np-button-gap, 0.5rem);
		--_icon-size: var(--np-button-icon-size, 1.25rem);
		--np-circular-progress-size: 2rem;
	}
	.s.round {
		border-radius: 1.25rem;
	}
	.s.square {
		border-radius: var(--np-button-shape, 0.75rem);
	}
	.s:active,
	.s.pressed {
		border-radius: 0.5rem;
	}
	.m {
		font-size: 1rem;
		height: 3.5rem;
		padding-inline: var(--np-button-padding, 1.5rem);
		gap: var(--np-button-gap, 0.5rem);
		--_icon-size: var(--np-button-icon-size, 1.5rem);
		--np-circular-progress-size: 3rem;
	}
	.m.round {
		border-radius: 1.75rem;
	}
	.m.square {
		border-radius: var(--np-button-shape, 1rem);
	}
	.m:active,
	.m.pressed {
		border-radius: 0.75rem;
	}
	.l {
		font-size: 1.5rem;
		height: 6rem;
		padding-inline: var(--np-button-padding, 3rem);
		gap: var(--np-button-gap, 0.75rem);
		--_icon-size: var(--np-button-icon-size, 2rem);
		--np-circular-progress-size: 5rem;
	}
	.l.round {
		border-radius: 3rem;
	}
	.l.square {
		border-radius: var(--np-button-shape, 1.75rem);
	}
	.l:active,
	.l.pressed {
		border-radius: 1rem;
	}
	.xl {
		font-size: 2rem;
		height: 8.5rem;
		padding-inline: var(--np-button-padding, 4rem);
		gap: var(--np-button-gap, 1rem);
		--_icon-size: var(--np-button-icon-size, 2.5rem);
		--np-circular-progress-size: 7rem;
	}
	.xl.round {
		border-radius: 4.25rem;
	}
	.xl.square {
		border-radius: var(--np-button-shape, 1.75rem);
	}
	.xl:active,
	.xl.pressed {
		border-radius: 1rem;
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
		/* Variant outline now rendered via pseudo-element; keep token for color */
		--_outlined-border-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
	}
	.enabled:focus-visible {
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
	.text {
		--np-ripple-hover-color: var(--np-text-button-label-text-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-text-button-label-text-color, var(--np-color-primary));
		color: var(--np-text-button-label-text-color, var(--np-color-primary));
	}
	.filled {
		--np-ripple-hover-opacity: 0.12;
		--np-ripple-hover-color: var(--np-color-surface);
		--np-ripple-pressed-color: var(--np-color-surface);
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
		--np-ripple-hover-color: var(--np-tonal-button-label-text-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-tonal-button-label-text-color, var(--np-color-primary));
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
		--np-ripple-hover-color: var(--np-elevated-button-label-text-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-elevated-button-label-text-color, var(--np-color-primary));
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
		--np-ripple-hover-color: var(--np-outlined-button-label-text-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-outlined-button-label-text-color, var(--np-color-primary));
		color: var(--np-outlined-button-label-text-color, var(--np-color-primary));
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
	}
	:global(.np-button .button-icon svg) {
		width: calc((var(--button-height) - 0.375rem) / 2);
		height: calc((var(--button-height) - 0.375rem) / 2);
	}

	@media (forced-colors: active) {
		.np-button {
			border: 1px solid CanvasText;
		}
	}
</style>
