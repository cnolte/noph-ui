<script lang="ts">
	import CircularProgress from '$lib/progress/CircularProgress.svelte'
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
		loading = false,
		loadingAriaLabel,
		selected = $bindable(false),
		selectedIcon,
		keepTooltipOnClick,
		width = 'default',
		size = 's',
		shape = 'round',
		onclick,
		...attributes
	}: IconButtonProps = $props()

	const uid = $props.id()
	let touchEl: HTMLSpanElement | undefined = $state()

	const isButton = (obj: unknown): obj is HTMLButtonAttributes => {
		return (obj as HTMLAnchorAttributes).href === undefined
	}
	const isLink = (obj: unknown): obj is HTMLAnchorAttributes => {
		return (obj as HTMLAnchorAttributes).href !== undefined
	}
</script>

{#snippet content()}
	{#if !disabled && !loading}
		<Ripple forElement={touchEl} />
		<span class="np-touch" bind:this={touchEl}></span>
	{/if}
	{#if loading}
		<div class="circular-progress">
			<CircularProgress aria-label={loadingAriaLabel} indeterminate />
		</div>
	{/if}
	{#if selectedIcon && selected}
		{@render selectedIcon()}
	{:else if children}
		{@render children()}
	{/if}
{/snippet}

{#if isButton(attributes) || disabled || loading}
	<button
		aria-describedby={title ? uid : attributes['aria-describedby']}
		aria-label={title || attributes['aria-label']}
		aria-pressed={selected}
		{...attributes as HTMLButtonAttributes}
		disabled={disabled || loading}
		bind:this={element}
		onclick={(event) => {
			if (toggle) {
				selected = !selected
			}
			;(onclick as MouseEventHandler<HTMLButtonElement>)?.(event)
		}}
		class={[
			'np-icon-button',
			size,
			width,
			selected || loading ? 'square' : shape,
			disabled || loading ? `${variant}-disabled disabled` : `${variant} enabled`,
			toggle && 'toggle',
			selected ? 'selected' : '',
			attributes.class,
		]}
	>
		{@render content()}
	</button>
{:else if isLink(attributes)}
	<a
		{...attributes}
		aria-describedby={title ? uid : undefined}
		aria-label={title}
		bind:this={element}
		class={[
			'np-icon-button',
			size,
			width,
			variant,
			selected || loading ? 'square' : shape,
			'enabled',
			toggle && 'toggle',
			selected ? 'selected' : '',
			attributes.class,
		]}
	>
		{@render content()}
	</a>
{/if}

{#if title}
	<Tooltip {keepTooltipOnClick} id={uid}>{title}</Tooltip>
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
		--np-icon-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
		transition:
			background-color 150ms linear,
			border-radius 150ms ease-in-out;
	}

	:global(.np-icon-button svg) {
		fill: currentColor;
	}

	.xs {
		--_icon-size: var(--np-icon-button-icon-size, 1.25rem);
		height: 2rem;
		width: 2rem;
		--np-circular-progress-size: 1.75rem;
	}
	.xs.round {
		border-radius: 1rem;
	}
	.xs.square {
		border-radius: var(--np-icon-button-shape, 0.75rem);
	}
	.xs:active {
		border-radius: 0.5rem;
	}
	.xs.narrow {
		width: 1.75rem;
	}
	.xs.wide {
		width: 2.5rem;
	}
	.s {
		--_icon-size: var(--np-icon-button-icon-size, 1.5rem);
		height: 2.5rem;
		width: 2.5rem;
		--np-circular-progress-size: 2rem;
	}
	.s.round {
		border-radius: 1.25rem;
	}
	.s.square {
		border-radius: var(--np-button-shape, 0.75rem);
	}
	.s.narrow {
		width: 2rem;
	}
	.s.wide {
		width: 3.25rem;
	}
	.s:active {
		border-radius: 0.5rem;
	}
	.m {
		--_icon-size: var(--np-icon-button-icon-size, 1.5rem);
		height: 3.5rem;
		width: 3.5rem;
		--np-circular-progress-size: 3rem;
	}
	.m.round {
		border-radius: 1.75rem;
	}
	.m.square {
		border-radius: var(--np-button-shape, 1rem);
	}
	.m.narrow {
		width: 3rem;
	}
	.m.wide {
		width: 4.5rem;
	}
	.m:active {
		border-radius: 0.75rem;
	}
	.l {
		--_icon-size: var(--np-icon-button-icon-size, 2rem);
		height: 6rem;
		width: 6rem;
		--np-circular-progress-size: 5rem;
	}
	.l.round {
		border-radius: 3rem;
	}
	.l.square {
		border-radius: var(--np-button-shape, 1.75rem);
	}
	.l.narrow {
		width: 4rem;
	}
	.l.wide {
		width: 8rem;
	}
	.l:active {
		border-radius: 1rem;
	}
	.xl {
		--_icon-size: var(--np-icon-button-icon-size, 2.5rem);
		height: 8.5rem;
		width: 8.5rem;
		--np-circular-progress-size: 7rem;
	}
	.xl.round {
		border-radius: 4.25rem;
	}
	.xl.square {
		border-radius: var(--np-button-shape, 1.75rem);
	}
	.xl.narrow {
		width: 6.5rem;
	}
	.xl.wide {
		width: 11.5rem;
	}
	.xl:active {
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
	.tonal-disabled {
		background-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
	}

	.outlined-disabled {
		outline-style: solid;
		outline-color: color-mix(in srgb, var(--np-color-on-surface) 12%, transparent);
		outline-width: 1px;
		outline-offset: -1px;
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
		--np-ripple-hover-color: var(--np-icon-button-icon-color, var(--np-color-on-surface-variant));
		--np-ripple-pressed-color: var(--np-icon-button-icon-color, var(--np-color-on-surface-variant));
		color: var(--np-icon-button-icon-color, var(--np-color-on-surface-variant));
	}
	.text.selected {
		--np-ripple-hover-color: var(--np-color-primary);
		--np-ripple-pressed-color: var(--np-color-primary);
		color: var(--np-color-primary);
	}
	.filled {
		--np-ripple-hover-color: var(--np-filled-icon-button-icon-color, var(--np-color-on-primary));
		--np-ripple-pressed-color: var(--np-filled-icon-button-icon-color, var(--np-color-on-primary));
		color: var(--np-filled-icon-button-icon-color, var(--np-color-on-primary));
		background-color: var(--np-filled-icon-button-container-color, var(--np-color-primary));
	}
	.filled.toggle {
		--np-ripple-hover-color: var(--np-color-on-surface-variant);
		--np-ripple-pressed-color: var(--np-color-on-surface-variant);
		color: var(--np-color-on-surface-variant);
		background-color: var(--np-color-surface-container);
	}
	.filled.selected {
		--np-ripple-hover-color: var(--np-color-on-primary);
		--np-ripple-pressed-color: var(--np-color-on-primary);
		color: var(--np-color-on-primary);
		background-color: var(--np-color-primary);
	}

	.tonal {
		--np-ripple-hover-color: var(
			--np-tonal-icon-button-icon-color,
			var(--np-color-on-secondary-container)
		);
		--np-ripple-pressed-color: var(
			--np-tonal-icon-button-icon-color,
			var(--np-color-on-secondary-container)
		);
		color: var(--np-tonal-icon-button-icon-color, var(--np-color-on-secondary-container));
		background-color: var(
			--np-tonal-icon-button-container-color,
			var(--np-color-secondary-container)
		);
	}
	.tonal.toggle {
		--np-ripple-hover-color: var(--np-color-on-secondary-container);
		--np-ripple-pressed-color: var(--np-color-on-secondary-container);
		color: var(--np-color-on-secondary-container);
		background-color: var(--np-color-secondary-container);
	}
	.tonal.selected {
		--np-ripple-hover-color: var(--np-color-on-secondary);
		--np-ripple-pressed-color: var(--np-color-on-secondary);
		color: var(--np-color-on-secondary);
		background-color: var(--np-color-secondary);
	}

	.outlined {
		outline-style: solid;
		outline-color: var(--np-outlined-icon-button-outline-color, var(--np-color-outline-variant));
		outline-width: 1px;
		outline-offset: -1px;
		--np-ripple-hover-color: var(--np-color-on-surface-variant);
		--np-ripple-pressed-color: var(--np-color-on-surface-variant);
		color: var(--np-color-on-surface-variant);
	}
	.outlined.selected {
		outline-style: none;
		--np-ripple-hover-color: var(--np-color-on-surface-variant);
		--np-ripple-pressed-color: var(--np-color-on-surface-variant);
		color: var(--np-color-inverse-on-surface);
		background-color: var(--np-color-inverse-surface);
	}
	.np-touch {
		position: absolute;
		height: max(calc(var(--_button-height, 40px) + 8px), 100%);
		width: max(calc(var(--_button-width, 40px) + 8px), 100%);
	}

	.circular-progress {
		--np-circular-progress-color: color-mix(in srgb, var(--np-color-on-surface) 38%, transparent);
		position: absolute;
	}
</style>
