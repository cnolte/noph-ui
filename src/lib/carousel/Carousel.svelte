<script lang="ts">
	import { arrowKeyNav } from '#lib/keyboard-nav.js'
	import { reducedMotion } from '#lib/media.js'
	import type { Attachment } from 'svelte/attachments'
	import { carouselMorph, scrollTimelines } from './carouselMorph.ts'
	import { setCarouselContext } from './context.js'
	import type { CarouselContext, CarouselItemElement, CarouselProps } from './types.ts'

	let {
		variant = 'multi-browse',
		alignment = 'start',
		orientation,
		snap,
		label,
		itemLabel = (text, position, total) => `${text}, ${position} of ${total}`,
		children,
		scroller = $bindable(),
		element = $bindable(),
		onkeydown: userKeydown,
		...attributes
	}: CarouselProps = $props()

	const uid = $props.id()
	let track = $state<HTMLDivElement>()
	let metrics = $state<HTMLDivElement>()
	let snapPoints = $state<HTMLDivElement>()
	let items = $state.raw<CarouselItemElement[]>([])

	const axis = $derived(orientation ?? (variant === 'full-screen' ? 'vertical' : 'horizontal'))
	const vertical = $derived(axis === 'vertical')
	const snapping = $derived(snap ?? variant !== 'uncontained')

	const keylined = $derived(variant === 'multi-browse' || variant === 'hero' ? variant : undefined)
	const morphing = $derived(!!keylined && scrollTimelines && !reducedMotion.current)

	const cropping = $derived(variant === 'uncontained' && !reducedMotion.current)

	const collectItems: Attachment<HTMLElement> = (node) => {
		const read = () => {
			const found = [...node.querySelectorAll<CarouselItemElement>('.np-carousel-item')]
			const same =
				found.length === items.length && found.every((item, index) => item === items[index])
			if (!same) items = found
		}
		read()
		let queued = false
		const observer = new MutationObserver(() => {
			if (queued) return
			queued = true
			queueMicrotask(() => {
				queued = false
				read()
			})
		})
		observer.observe(node, { childList: true, subtree: true })
		return () => observer.disconnect()
	}

	const morph = $derived(
		morphing && keylined
			? carouselMorph({ variant: keylined, alignment, vertical, items, track, metrics, uid })
			: undefined,
	)

	const arrowHandler = $derived(arrowKeyNav('.np-carousel-item', axis, { wrap: false }))

	const handleKeydown = (
		event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement },
	) => {
		userKeydown?.(event)
		if (!event.defaultPrevented) arrowHandler(event)
	}

	const places = $derived(new Map(items.map((item, index) => [item, index + 1])))

	const handleFocusIn = (event: FocusEvent) => {
		const item = (event.target as HTMLElement | null)?.closest<HTMLElement>('.np-carousel-item')
		if (!item) return
		const behavior = reducedMotion.current ? 'auto' : 'smooth'
		const place = places.get(item as CarouselItemElement) ?? 0
		const notch =
			place > 0 ? (snapPoints?.children[place - 1] as HTMLElement | undefined) : undefined
		if (notch) notch.scrollIntoView({ block: 'start', inline: 'start', behavior })
		else item.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior })
	}

	const carouselContext: CarouselContext = {
		get items() {
			return items
		},
		set items(next) {
			items = next
		},
		position: (item) => places.get(item) ?? 0,
		get itemLabel() {
			return itemLabel
		},
		set itemLabel(next) {
			itemLabel = next
		},
	}
	setCarouselContext(carouselContext)
</script>

<div
	{...attributes}
	bind:this={element}
	role={attributes.role ?? 'group'}
	aria-roledescription={attributes['aria-roledescription'] ?? 'carousel'}
	aria-label={label ?? attributes['aria-label']}
	class={[
		'np-carousel',
		`np-carousel-${variant}`,
		`np-carousel-${axis}`,
		snapping && 'np-carousel-snap',
		cropping && 'np-carousel-cropping',
		attributes.class,
	]}
	onkeydown={handleKeydown}
	onfocusin={handleFocusIn}
>
	{#if keylined}
		<div bind:this={metrics} class="np-carousel-metrics" aria-hidden="true">
			<span class="np-carousel-metric-item"></span>
			<span class="np-carousel-metric-small"></span>
		</div>
	{/if}
	<div bind:this={scroller} class="np-carousel-scroller" {@attach morph}>
		{#if morphing}
			<div bind:this={snapPoints} class="np-carousel-snap-points" aria-hidden="true">
				{#each items as item (item)}
					<span></span>
				{/each}
			</div>
		{/if}
		<div bind:this={track} class="np-carousel-track" {@attach collectItems}>
			{@render children?.()}
		</div>
	</div>
</div>

<style>
	.np-carousel {
		position: relative;
		container-type: inline-size;
		--_pad: 0px;
		--_gap: var(--np-carousel-item-spacing, 0.5rem);
		--_cross: var(--np-carousel-cross-padding, 0.5rem);
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-carousel {
			--_pad: var(--np-carousel-padding, 1rem);
		}
	}

	.np-carousel-scroller {
		display: flex;
		position: relative;
		overflow-anchor: none;
		scrollbar-width: var(--np-carousel-scrollbar-width, none);
	}

	.np-carousel-horizontal .np-carousel-scroller {
		overflow-x: auto;
		overflow-y: clip;
		touch-action: pan-x pinch-zoom;
		overscroll-behavior-inline: contain;
		scroll-padding-inline-start: var(--_pad);
	}

	.np-carousel-vertical .np-carousel-scroller {
		flex-direction: column;
		overflow-x: clip;
		overflow-y: auto;
		touch-action: pan-y pinch-zoom;
		block-size: var(--np-carousel-length, 100%);
		scroll-padding-block-start: var(--_pad);
	}

	.np-carousel-snap.np-carousel-horizontal .np-carousel-scroller {
		scroll-snap-type: x var(--np-carousel-snap-strictness, mandatory);
	}

	.np-carousel-snap.np-carousel-vertical .np-carousel-scroller {
		scroll-snap-type: y var(--np-carousel-snap-strictness, mandatory);
	}

	.np-carousel-track {
		display: flex;
		flex: none;
		align-items: center;
		gap: var(--_gap);
		padding-inline: var(--_pad);
		padding-block: var(--_cross);
	}

	.np-carousel-vertical .np-carousel-track {
		flex-direction: column;
		padding-block: var(--_pad);
		padding-inline: var(--_cross);
	}

	.np-carousel-vertical .np-carousel-track :global(.np-carousel-item-aspect) {
		inline-size: var(--np-carousel-item-width, 12.5rem);
		block-size: auto;
	}

	.np-carousel-full-screen {
		--np-carousel-padding: 0px;
		--_gap: 0px;
		--_cross: 0px;
		--np-carousel-item-container-shape: 0px;
		--np-carousel-snap-stop: always;
	}

	.np-carousel-full-screen .np-carousel-track {
		block-size: 100%;
	}

	.np-carousel-full-screen .np-carousel-track :global(.np-carousel-item) {
		inline-size: 100%;
		block-size: 100%;
		flex: none;
	}

	.np-carousel-full-screen.np-carousel-vertical .np-carousel-scroller {
		overscroll-behavior-block: contain;
	}

	:global(.np-carousel-morphing) .np-carousel-track {
		overflow: clip;
		overflow-clip-margin: var(--_cross);
	}

	:global(.np-carousel-morphing-inline) .np-carousel-track {
		inline-size: var(--_track);
	}

	:global(.np-carousel-morphing-block) .np-carousel-track {
		block-size: var(--_track);
	}

	:global(.np-carousel-morphing-inline) .np-carousel-track :global(.np-carousel-item) {
		flex: 0 0 var(--_item, auto);
		inline-size: var(--_item, auto);
	}

	:global(.np-carousel-morphing-block) .np-carousel-track :global(.np-carousel-item) {
		flex: 0 0 var(--_item, auto);
		block-size: var(--_item, auto);
	}
	@property --np-carousel-clip {
		syntax: '<length>';
		inherits: true;
		initial-value: 0px;
	}
	@property --_out {
		syntax: '<number>';
		inherits: false;
		initial-value: 0;
	}

	@property --_in {
		syntax: '<number>';
		inherits: false;
		initial-value: 0;
	}

	@keyframes np-carousel-edge-out {
		from {
			--_out: 0;
		}
		to {
			--_out: 1;
		}
	}

	@keyframes np-carousel-edge-in {
		from {
			--_in: 1;
		}
		to {
			--_in: 0;
		}
	}

	@supports (animation-timeline: view()) {
		.np-carousel-cropping .np-carousel-track :global(.np-carousel-item) {
			animation:
				np-carousel-edge-out linear both,
				np-carousel-edge-in linear both;
			animation-range: exit, entry;
			--_crop-start: calc((1 - var(--_visible, 0.3333)) * var(--_out) * 100%);
			--_crop-end: calc((1 - var(--_visible, 0.3333)) * var(--_in) * 100%);
			--_shift: calc(var(--_visible, 0.3333) * (var(--_out) - var(--_in)) * 100%);
		}

		.np-carousel-cropping.np-carousel-horizontal .np-carousel-track :global(.np-carousel-item) {
			animation-timeline: view(inline), view(inline);
			clip-path: inset(
				0 var(--_crop-end) 0 var(--_crop-start) round
					var(--np-carousel-item-container-shape, var(--np-shape-corner-extra-large))
			);
			--np-carousel-parallax: var(--_shift) 0;
		}

		.np-carousel-cropping.np-carousel-horizontal
			.np-carousel-track:dir(rtl)
			:global(.np-carousel-item) {
			clip-path: inset(
				0 var(--_crop-start) 0 var(--_crop-end) round
					var(--np-carousel-item-container-shape, var(--np-shape-corner-extra-large))
			);
			--_shift: calc(var(--_visible, 0.3333) * (var(--_in) - var(--_out)) * 100%);
		}

		.np-carousel-cropping.np-carousel-vertical .np-carousel-track :global(.np-carousel-item) {
			animation-timeline: view(block), view(block);
			clip-path: inset(
				var(--_crop-start) 0 var(--_crop-end) 0 round
					var(--np-carousel-item-container-shape, var(--np-shape-corner-extra-large))
			);
			--np-carousel-parallax: 0 var(--_shift);
		}

		.np-carousel-cropping .np-carousel-track :global(.np-carousel-item-label) {
			inset-inline-start: var(--_crop-start);
			inset-inline-end: var(--_crop-end);
		}
	}

	@supports (animation-timeline: scroll(nearest inline)) {
		:global(.np-carousel-morphing) .np-carousel-track :global(.np-carousel-item) {
			animation: var(--_morph, none) linear both;
		}

		:global(.np-carousel-morphing-inline) .np-carousel-track :global(.np-carousel-item) {
			animation-timeline: scroll(nearest inline);
		}

		:global(.np-carousel-morphing-block) .np-carousel-track :global(.np-carousel-item) {
			animation-timeline: scroll(nearest block);
		}
	}

	.np-carousel-snap-points > span {
		position: absolute;
		inset-block: 0;
		inline-size: 1px;
		pointer-events: none;
		visibility: hidden;
	}

	.np-carousel-horizontal .np-carousel-snap-points > span {
		inset-inline-start: calc(var(--_pad) + var(--_at, 0px));
	}

	.np-carousel-vertical .np-carousel-snap-points > span {
		inset-block-start: calc(var(--_pad) + var(--_at, 0px));
		inset-inline: 0;
		block-size: 1px;
	}

	.np-carousel-snap .np-carousel-snap-points > span {
		scroll-snap-align: start;
	}

	.np-carousel-snap .np-carousel-track :global(.np-carousel-item) {
		scroll-snap-align: start;
	}

	:global(.np-carousel-morphing) .np-carousel-track :global(.np-carousel-item) {
		scroll-snap-align: none;
	}

	.np-carousel-metrics {
		position: absolute;
		inset-block-start: 0;
		inset-inline-start: 0;
		block-size: 0;
		visibility: hidden;
		pointer-events: none;
	}

	.np-carousel-metrics > * {
		display: block;
		block-size: 0;
	}

	.np-carousel-metric-item {
		inline-size: var(--np-carousel-item-width, 12.5rem);
	}

	.np-carousel-vertical .np-carousel-metric-item {
		inline-size: auto;
		block-size: var(--np-carousel-item-height, 12.5rem);
	}

	.np-carousel-metric-small {
		inline-size: 0;
		min-inline-size: var(--np-carousel-small-item-min-width, 2.5rem);
		max-inline-size: var(--np-carousel-small-item-max-width, 3.5rem);
	}

	.np-carousel-vertical .np-carousel-metric-small {
		min-block-size: var(--np-carousel-small-item-min-width, 2.5rem);
		max-block-size: var(--np-carousel-small-item-max-width, 3.5rem);
	}
</style>
