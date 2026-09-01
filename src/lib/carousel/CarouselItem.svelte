<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import { pressMorph } from '#lib/press.svelte.js'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import { minVisibleFraction } from './carouselStrategy.ts'
	import { getCarouselContext } from './context.js'
	import type { CarouselItemElement, CarouselItemProps } from './types.ts'

	let {
		type,
		label,
		image,
		aspectRatio,
		disabled = false,
		children,
		element = $bindable(),
		onpointerdown,
		style,
		...attributes
	}: CarouselItemProps = $props()

	const carouselContext = getCarouselContext()
	const press = pressMorph()

	const total = $derived(carouselContext.items.length)
	const position = $derived(element ? carouselContext.position(element) : 0)

	const itemStyle = $derived(
		[
			`--_visible:${minVisibleFraction(aspectRatio)}`,
			aspectRatio != null && `--_aspect:${aspectRatio}`,
			style,
		]
			.filter(Boolean)
			.join(';'),
	)

	const accessibleName = $derived(
		attributes['aria-label'] ??
			(type !== 'text' && label && position > 0
				? carouselContext.itemLabel(label, position, total)
				: undefined),
	)

	const labelHidden = $derived(accessibleName !== undefined)

	const handlePointerdown = (
		event: PointerEvent & { currentTarget: EventTarget & CarouselItemElement },
	) => {
		onpointerdown?.(event)
		if (!disabled && type !== 'text') press.press()
	}
</script>

{#snippet content()}
	{#if image}
		<div class="np-carousel-item-image" style="background-image: url({image})"></div>
	{/if}
	{#if children}
		{@render children()}
	{/if}
	{#if label}
		<span class="np-carousel-item-label" aria-hidden={labelHidden || undefined}>{label}</span>
	{/if}
	{#if !disabled && type !== 'text'}
		<Ripple />
	{/if}
{/snippet}

{#if type === 'text'}
	<div
		{...attributes}
		bind:this={element}
		aria-disabled={disabled}
		style={itemStyle}
		class={[
			'np-carousel-item',
			'np-carousel-item-plain',
			aspectRatio != null && 'np-carousel-item-aspect',
			disabled && 'np-carousel-item-disabled',
			attributes.class,
		]}
	>
		{@render content()}
	</div>
{:else if type === 'button'}
	<button
		{...attributes}
		bind:this={element}
		type="button"
		{disabled}
		aria-disabled={disabled}
		aria-label={accessibleName}
		onpointerdown={handlePointerdown}
		style={itemStyle}
		class={[
			'np-carousel-item',
			press.pressed && 'np-carousel-item-pressed',
			aspectRatio != null && 'np-carousel-item-aspect',
			disabled && 'np-carousel-item-disabled',
			attributes.class,
		]}
	>
		{@render content()}
	</button>
{:else if type === 'link'}
	<a
		{...attributes}
		bind:this={element}
		role="link"
		aria-disabled={disabled}
		aria-label={accessibleName}
		tabindex={disabled ? -1 : undefined}
		onpointerdown={handlePointerdown}
		style={itemStyle}
		class={[
			'np-carousel-item',
			press.pressed && 'np-carousel-item-pressed',
			aspectRatio != null && 'np-carousel-item-aspect',
			disabled && 'np-carousel-item-disabled',
			attributes.class,
		]}
	>
		{@render content()}
	</a>
{/if}

<style>
	.np-carousel-item {
		position: relative;
		box-sizing: border-box;
		flex: none;
		display: block;
		margin: 0;
		padding: 0;
		border: none;
		font: inherit;
		color: var(--np-color-on-surface);
		text-align: start;
		text-decoration: none;
		overflow: clip;
		cursor: pointer;
		scroll-snap-stop: var(--np-carousel-snap-stop, normal);
		-webkit-tap-highlight-color: transparent;
		inline-size: var(--np-carousel-item-width, 12.5rem);
		block-size: var(--np-carousel-item-height, auto);
		align-self: stretch;
		border-radius: var(--np-carousel-item-container-shape, var(--np-shape-corner-extra-large));
		box-shadow: var(--np-carousel-item-elevation, none);
		background-color: var(--np-carousel-item-container-color, transparent);
		--np-ripple-hover-color: var(--np-carousel-item-state-layer-color, var(--np-color-on-surface));
		--np-ripple-pressed-color: var(
			--np-carousel-item-state-layer-color,
			var(--np-color-on-surface)
		);
	}

	.np-carousel-item-aspect {
		aspect-ratio: var(--_aspect);
		inline-size: auto;
		block-size: var(--np-carousel-item-height, 12.5rem);
		align-self: center;
		flex: none;
	}

	.np-carousel-item-plain {
		cursor: unset;
	}

	.np-carousel-item::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
		outline-style: solid;
		outline-width: var(--np-carousel-item-outline-width, 0);
		outline-color: var(--np-carousel-item-outline-color, var(--np-color-outline));
		outline-offset: calc(-1 * var(--np-carousel-item-outline-width, 0px));
	}

	.np-carousel-item-image {
		position: absolute;
		inset: 0;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.np-carousel-item-image,
	.np-carousel-item > :global(img),
	.np-carousel-item > :global(picture),
	.np-carousel-item > :global(video) {
		translate: var(--np-carousel-parallax, 0);
	}

	.np-carousel-item > :global(img),
	.np-carousel-item > :global(picture) {
		display: block;
		inline-size: 100%;
		block-size: 100%;
		object-fit: cover;
	}

	.np-carousel-item-label {
		position: absolute;
		inset-inline: var(--np-carousel-clip, 0px);
		inset-block-end: 0;
		display: block;
		padding: 1rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		pointer-events: none;
		color: var(
			--np-carousel-item-label-text-color,
			light-dark(var(--np-color-surface), var(--np-color-on-surface))
		);
		background-image: linear-gradient(
			to top,
			var(
				--np-carousel-item-label-scrim-color,
				color-mix(in srgb, var(--np-color-scrim) 60%, transparent)
			),
			transparent
		);
	}

	@media (hover: hover) {
		.np-carousel-item:is(button, a):not(.np-carousel-item-disabled):hover {
			box-shadow: var(--np-carousel-item-hover-elevation, var(--np-elevation-1));
		}
	}

	.np-carousel-item:focus-visible {
		outline: none;
		box-shadow: var(--np-carousel-item-elevation, none);
	}

	.np-carousel-item:focus-visible::after {
		outline-width: 3px;
		outline-color: var(--np-color-secondary);
		outline-offset: -3px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-carousel-item:focus-visible::after {
			animation: focusAnimationInset var(--np-motion-expressive-slow-effects) forwards;
		}
	}

	.np-carousel-item:focus-visible :global(.np-ripple-surface)::before {
		opacity: var(--np-ripple-focus-opacity, 0.1);
	}

	.np-carousel-item:is(:active, .np-carousel-item-pressed) {
		box-shadow: var(--np-carousel-item-elevation, none);
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-carousel-item {
			transition: border-radius var(--np-motion-expressive-fast-effects);
		}

		.np-carousel-item:is(button, a):is(:active, .np-carousel-item-pressed) {
			border-radius: var(--np-carousel-item-pressed-container-shape, var(--np-shape-corner-medium));
		}
	}

	.np-carousel-item-disabled {
		opacity: 0.38;
		cursor: unset;
		pointer-events: none;
		box-shadow: none;
	}

	.np-carousel-item-disabled::after {
		outline-color: color-mix(in srgb, var(--np-color-outline) 12%, transparent);
	}

	@media (forced-colors: active) {
		.np-carousel-item::after {
			outline-width: 1px;
			outline-color: CanvasText;
		}

		.np-carousel-item-disabled::after {
			outline-color: GrayText;
		}

		.np-carousel-item-label {
			background-image: none;
			background-color: Canvas;
			color: CanvasText;
		}
	}
</style>
