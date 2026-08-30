<script lang="ts">
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import { popoverController, syncOpenEffect } from '#lib/popover.svelte.js'
	import type { MenuProps } from './types.ts'

	const MENU_ITEM_SELECTOR = '[role="menuitem"]'
	const attach = rovingTabindex(MENU_ITEM_SELECTOR)
	const arrowHandler = arrowKeyNav(MENU_ITEM_SELECTOR)

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
	ontoggle={(event) => {
		let { newState } = event
		open = newState === 'open'
		ontoggle?.(event)
	}}
	{popover}
	class={['np-menu-container', !coverAnchor && 'np-menu-no-cover', attributes.class]}
	{style}
	onkeydown={(event) => {
		attributes.onkeydown?.(event)
		if (!event.defaultPrevented) arrowHandler(event)
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

	.np-menu-container:popover-open {
		opacity: 1;
		scale: 1;
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-menu-container:popover-open {
			animation:
				fadeIn var(--np-motion-expressive-fast-effects),
				scaleIn var(--np-motion-expressive-fast-spatial);
		}
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
	}
	@keyframes scaleIn {
		from {
			scale: 0.8;
		}
	}
</style>
