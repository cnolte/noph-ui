<script lang="ts">
	import Ripple from '$lib/ripple/Ripple.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import type { IconButtonProps } from './types.ts'
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
		MouseEventHandler,
	} from 'svelte/elements'

	let {
		variant = 'text',
		toggle = false,
		children,
		title,
		element = $bindable(),
		disabled,
		selected = false,
		selectedIcon,
		keepTooltipOnClick,
		onclick,
		...attributes
	}: IconButtonProps = $props()

	let tooltipId = $state(title ? crypto.randomUUID() : '')
	let selectedState = $state(!toggle || selected)
	let touchEl: HTMLSpanElement | undefined = $state()

	const isButton = (obj: unknown): obj is HTMLButtonAttributes => {
		return (obj as HTMLAnchorAttributes).href === undefined
	}
	const isLink = (obj: unknown): obj is HTMLAnchorAttributes => {
		return (obj as HTMLAnchorAttributes).href !== undefined
	}
</script>

{#snippet content()}
	{#if !disabled}
		<Ripple forElement={touchEl} />
		<span class="np-touch" bind:this={touchEl}></span>
	{/if}
	{#if selectedIcon && selectedState}
		{@render selectedIcon()}
	{:else if children}
		{@render children()}
	{/if}
{/snippet}

{#if isButton(attributes) || disabled}
	<button
		aria-describedby={title ? tooltipId : attributes['aria-describedby']}
		aria-label={title || attributes['aria-label']}
		aria-pressed={selectedState}
		{...attributes as HTMLButtonAttributes}
		{disabled}
		bind:this={element}
		onclick={(event) => {
			if (toggle) {
				selectedState = !selectedState
			}
			;(onclick as MouseEventHandler<HTMLButtonElement>)?.(event)
		}}
		class={[
			'np-icon-button',
			disabled ? `${variant}-disabled disabled` : `${variant} enabled`,
			toggle && 'toggle',
			selectedState && ((variant !== 'outlined' && variant !== 'text') || toggle) && 'selected',
			attributes.class,
		]}
	>
		{@render content()}
	</button>
{:else if isLink(attributes)}
	<a
		{...attributes}
		aria-describedby={title ? tooltipId : undefined}
		aria-label={title}
		bind:this={element}
		class={[
			'np-icon-button',
			variant,
			'enabled',
			selectedState && ((variant !== 'outlined' && variant !== 'text') || toggle) && 'selected',
			attributes.class,
		]}
	>
		{@render content()}
	</a>
{/if}

{#if title}
	<Tooltip {keepTooltipOnClick} id={tooltipId}>{title}</Tooltip>
{/if}

<style>
	.np-icon-button {
		font-family: inherit;
		box-sizing: border-box;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		background-color: transparent;
		border-width: 0;
		position: relative;
		cursor: pointer;
		display: flex;
		padding: 0;
		user-select: none;
		text-decoration: none;
		align-items: center;
		justify-content: center;
	}

	:global(.np-icon-button svg) {
		width: var(--_icon-size, 1.5rem);
		height: var(--_icon-size, 1.5rem);
		fill: currentColor;
		display: block;
	}
	.disabled {
		pointer-events: none;
		color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
	}
	.filled-disabled,
	.tonal-disabled {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
	}
	.text-disabled {
		border-radius: var(--np-icon-button-container-shape, var(--np-shape-corner-full));
		height: var(--np-icon-button-container-height, 2.5rem);
		width: var(--np-icon-button-container-width, 2.5rem);
		--_icon-size: var(--np-icon-button-icon-size);
	}
	.filled-disabled {
		border-radius: var(--np-filled-icon-button-container-shape, var(--np-shape-corner-full));
		height: var(--np-filled-icon-button-container-height, 2.5rem);
		width: var(--np-filled-icon-button-container-width, 2.5rem);
		--_icon-size: var(--np-filled-icon-button-icon-size);
	}
	.tonal-disabled {
		border-radius: var(--np-tonal-icon-button-container-shape, var(--np-shape-corner-full));
		height: var(--np-tonal-icon-button-container-height, 2.5rem);
		width: var(--np-tonal-icon-button-container-width, 2.5rem);
		--_icon-size: var(--np-tonal-icon-button-icon-size);
	}

	.outlined-disabled {
		border: 1px solid;
		border-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
		border-radius: var(--np-outlined-icon-button-container-shape, var(--np-shape-corner-full));
		height: var(--np-outlined-icon-button-container-height, 2.5rem);
		width: var(--np-outlined-icon-button-container-width, 2.5rem);
		--_icon-size: var(--np-outlined-icon-button-icon-size);
	}
	.enabled {
		transition: background-color 0.3s ease;
	}
	.enabled:focus-visible {
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
	.text {
		--np-ripple-hover-color: var(--np-icon-button-icon-color, var(--np-color-on-surface-variant));
		--np-ripple-pressed-color: var(--np-icon-button-icon-color, var(--np-color-on-surface-variant));
		color: var(--np-icon-button-icon-color, var(--np-color-on-surface-variant));
		border-radius: var(--np-icon-button-container-shape, var(--np-shape-corner-full));
		height: var(--np-icon-button-container-height, 2.5rem);
		width: var(--np-icon-button-container-width, 2.5rem);
		--_icon-size: var(--np-icon-button-icon-size);
	}
	.text.toggle {
		--np-ripple-hover-color: var(--np-color-on-surface-variant);
		--np-ripple-pressed-color: var(--np-color-on-surface-variant);
		color: var(--np-color-on-surface-variant);
	}
	.text.selected {
		--np-ripple-hover-color: var(--np-icon-button-icon-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-icon-button-icon-color, var(--np-color-primary));
		color: var(--np-icon-button-icon-color, var(--np-color-primary));
	}
	.filled {
		transition: background-color 150ms linear;
		--np-ripple-hover-color: var(--np-filled-icon-button-container-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(
			--np-filled-icon-button-container-color,
			var(--np-color-primary)
		);
		color: var(--np-filled-icon-button-container-color, var(--np-color-primary));
		background-color: var(--np-color-surface-container-highest);
		border-radius: var(--np-filled-icon-button-container-shape, var(--np-shape-corner-full));
		height: var(--np-filled-icon-button-container-height, 2.5rem);
		width: var(--np-filled-icon-button-container-width, 2.5rem);
		--_icon-size: var(--np-filled-icon-button-icon-size);
	}
	.filled.selected {
		--np-ripple-hover-opacity: 0.12;
		--np-ripple-hover-color: var(--np-color-surface);
		--np-ripple-pressed-color: var(--np-color-surface);
		color: var(--np-filled-icon-button-icon-color, var(--np-color-on-primary));
		background-color: var(--np-filled-icon-button-container-color, var(--np-color-primary));
	}

	.tonal {
		transition: background-color 150ms linear;
		border-radius: var(--np-tonal-icon-button-container-shape, var(--np-shape-corner-full));
		--np-ripple-hover-color: var(--np-color-on-surface-variant);
		--np-ripple-pressed-color: var(--np-color-on-surface-variant);
		color: var(--np-color-on-surface-variant);
		background-color: var(--np-color-surface-container-highest);
		height: var(--np-tonal-icon-button-container-height, 2.5rem);
		width: var(--np-tonal-icon-button-container-width, 2.5rem);
		--_icon-size: var(--np-tonal-icon-button-icon-size);
	}
	.tonal.selected {
		--np-ripple-hover-color: var(--np-tonal-icon-button-icon-color, var(--np-color-primary));
		--np-ripple-pressed-color: var(--np-tonal-icon-button-icon-color, var(--np-color-primary));
		color: var(--np-tonal-icon-button-icon-color, var(--np-color-on-secondary-container));
		background-color: var(
			--np-tonal-icon-button-container-color,
			var(--np-color-secondary-container)
		);
	}

	.outlined {
		border: 1px solid;
		border-style: solid;
		border-width: var(--np-outlined-icon-button-outline-width, 1px);
		--np-ripple-hover-color: var(--np-color-on-surface-variant);
		--np-ripple-pressed-color: var(--np-color-on-surface-variant);
		color: var(--np-color-on-surface-variant);
		border-color: var(--np-outlined-icon-button-outline-color, var(--np-color-outline));
		border-radius: var(--np-outlined-icon-button-container-shape, var(--np-shape-corner-full));
		height: var(--np-outlined-icon-button-container-height, 2.5rem);
		width: var(--np-outlined-icon-button-container-width, 2.5rem);
		--_icon-size: var(--np-outlined-icon-button-icon-size);
	}
	.outlined.selected {
		border: none;
		--np-ripple-hover-color: var(--np-color-on-surface-variant);
		--np-ripple-pressed-color: var(--np-color-on-surface-variant);
		color: var(--np-color-inverse-on-surface);
		background-color: var(--np-color-inverse-surface);
	}
	.np-touch {
		position: absolute;
		height: max(48px, 100%);
		width: max(48px, 100%);
	}
</style>
