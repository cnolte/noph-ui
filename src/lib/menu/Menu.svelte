<script lang="ts">
	import '#lib/internal/exit.css'
	import { exitAnimation, motionOf } from '#lib/animation.js'
	import { reducedMotion } from '#lib/media.js'
	import type { Attachment } from 'svelte/attachments'
	import { arrowKeyNav, rovingTabindex, typeahead } from '#lib/keyboard-nav.js'
	import { popoverController, syncOpenEffect } from '#lib/popover.svelte.js'
	import type { MenuProps } from './types.js'

	const MENU_ITEM_SELECTOR = '[role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"]'
	const attach = rovingTabindex(MENU_ITEM_SELECTOR)
	const arrowHandler = arrowKeyNav(MENU_ITEM_SELECTOR)
	const typeaheadHandler = typeahead(
		MENU_ITEM_SELECTOR,
		(item) => (item.querySelector('.np-item-headline') ?? item).textContent ?? '',
	)

	let {
		children,
		element = $bindable(),
		open = $bindable(),
		style,
		popover = 'auto',
		role = 'menu',
		anchor,
		coverAnchor = true,
		ontoggle,
		...attributes
	}: MenuProps = $props()

	let contentHeight = $state(0)
	let innerHeight = $state(0)

	const controller = popoverController(() => element)

	// Opens with a fade and a scale from the anchor, started just before the menu shows. Driven by
	// script rather than @starting-style, which Safari does not apply again when a popover reopens.
	const openAnimation: Attachment<HTMLElement> = (menu) => {
		const onBeforeToggle = (event: Event) => {
			if ((event as ToggleEvent).newState !== 'open' || reducedMotion.current) return
			menu.animate(
				[{ opacity: 0 }, { opacity: 1 }],
				motionOf(menu, '--np-motion-expressive-fast-effects'),
			)
			menu.animate(
				[{ scale: 0.8 }, { scale: 1 }],
				motionOf(menu, '--np-motion-expressive-fast-spatial'),
			)
		}
		menu.addEventListener('beforetoggle', onBeforeToggle)
		return () => menu.removeEventListener('beforetoggle', onBeforeToggle)
	}

	export const show = () => controller.show()
	export const close = () => controller.close()

	syncOpenEffect(
		() => element,
		() => open,
		show,
		close,
	)

	const calculateTransformOrigin = (anchorRect: DOMRect, menuRect: DOMRect) => {
		const pivot = (anchorStart: number, anchorEnd: number, menuStart: number, menuEnd: number) => {
			if (menuStart >= anchorEnd) return 0
			if (menuEnd <= anchorStart) return 1
			if (menuEnd === menuStart) return 0
			const intersectionCenter =
				(Math.max(anchorStart, menuStart) + Math.min(anchorEnd, menuEnd)) / 2
			return (intersectionCenter - menuStart) / (menuEnd - menuStart)
		}
		const x = pivot(anchorRect.left, anchorRect.right, menuRect.left, menuRect.right)
		const y = pivot(anchorRect.top, anchorRect.bottom, menuRect.top, menuRect.bottom)
		return `${x * 100}% ${y * 100}%`
	}

	const refreshValues = () => {
		if (element && anchor && open) {
			const anchorRect = anchor.getBoundingClientRect()
			const styles = getComputedStyle(element)
			const margin = (parseFloat(styles.marginTop) || 0) + (parseFloat(styles.marginBottom) || 0)
			const wanted = Math.max(contentHeight, element.scrollHeight)
			const room = Math.max(innerHeight - margin, 0)
			const below = Math.max(innerHeight - anchorRect.bottom - margin, 0)
			const above = Math.max(anchorRect.top - margin, 0)
			const overAnchor = coverAnchor && wanted > below && wanted > above && wanted <= room
			element.style.maxHeight = `${Math.floor(overAnchor ? room : Math.max(below, above))}px`
			element.style.transformOrigin = calculateTransformOrigin(
				anchorRect,
				element.getBoundingClientRect(),
			)
		}
	}
	$effect(refreshValues)
</script>

<svelte:window bind:innerHeight onresize={refreshValues} />
<div
	{...attributes}
	{role}
	bind:this={element}
	{@attach exitAnimation}
	{@attach openAnimation}
	ontoggle={(event) => {
		let { newState } = event
		open = newState === 'open'
		if (open && role === 'menu') {
			element?.querySelector<HTMLElement>(MENU_ITEM_SELECTOR)?.focus()
		}
		ontoggle?.(event)
	}}
	{popover}
	class={['np-menu-container', !coverAnchor && 'np-menu-no-cover', attributes.class]}
	{style}
	onkeydown={(event) => {
		attributes.onkeydown?.(event)
		if (!event.defaultPrevented) arrowHandler(event)
		if (!event.defaultPrevented) typeaheadHandler(event)
		// Links only follow Enter, a menu item follows Space as well.
		const item = event.target
		if (
			!event.defaultPrevented &&
			event.key === ' ' &&
			item instanceof HTMLAnchorElement &&
			item.matches(MENU_ITEM_SELECTOR)
		) {
			event.preventDefault()
			item.click()
		}
	}}
>
	<div {@attach attach} bind:clientHeight={contentHeight} class="np-menu" role="none">
		{@render children?.()}
	</div>
</div>

<style>
	.np-menu {
		overflow-y: auto;
		overflow-x: hidden;
		flex: 1;
		padding: 0.5rem 0;
	}
	/* Baseline menu items: 48dp high with 12dp at the sides, in action menus and listboxes alike. */
	.np-menu-container:is([role='menu'], [role='listbox']) .np-menu {
		--np-item-container-height: var(--np-menu-item-container-height, 3rem);
		--np-item-padding-inline: var(--np-menu-item-padding-inline, 0.75rem);
		--np-item-gap: var(--np-menu-item-gap, 0.75rem);
	}
	/* Select and AutoComplete match their field instead. */
	.np-menu-container[role='menu'][popover] {
		min-width: var(--np-menu-min-width, 7rem);
		max-width: var(--np-menu-max-width, 17.5rem);
	}
	:global(.np-menu .np-divider) {
		margin-block: 0.5rem;
	}
	.np-menu-container[popover] {
		color: var(--np-menu-text-color, var(--np-color-on-surface));
		background-color: var(--np-menu-container-color, var(--np-color-surface-container));
		border: none;
		border-radius: var(--np-menu-container-shape, var(--np-shape-corner-extra-small));
		padding: 0;
		box-shadow: var(--np-elevation-2);
		margin: var(--np-menu-margin, 2px);
		scrollbar-color: var(--np-color-on-surface-variant) transparent;
		scrollbar-width: thin;
		justify-self: var(--np-menu-justify-self, anchor-center);
		position-area: var(--np-menu-position-area, bottom);
		transform-origin: var(--np-menu-transform-origin, top center);
		position-try-fallbacks:
			flip-block,
			flip-inline,
			flip-block flip-inline,
			--np-menu-over-anchor,
			--np-menu-over-anchor flip-inline;
	}

	.np-menu-container.np-menu-no-cover[popover] {
		position-try-fallbacks:
			flip-block,
			flip-inline,
			flip-block flip-inline;
	}

	@position-try --np-menu-over-anchor {
		position-area: var(--np-menu-over-anchor-position-area, span-all);
		align-self: center;
	}

	@media (prefers-reduced-motion: no-preference) {
		/* Closes with a fade and a slight shrink towards the anchor, on the default effects curve,
		   which is gentler at the start than the fast one. It opens through openAnimation.
		   NativeSelect's list closes the same way. */
		.np-menu-container[popover] {
			--_exit: var(--np-motion-expressive-default-effects);
			opacity: 0;
			scale: 0.95;
			transition:
				opacity var(--_exit),
				scale var(--_exit),
				display var(--_exit) allow-discrete,
				overlay var(--_exit) allow-discrete;
		}
		.np-menu-container:popover-open {
			opacity: 1;
			scale: 1;
		}
	}
</style>
