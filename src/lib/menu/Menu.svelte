<script lang="ts">
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
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
		anchor,
		coverAnchor = true,
		ontoggle,
		...attributes
	}: MenuProps = $props()

	let contentHeight = $state(0)
	let innerHeight = $state(0)

	export const showPopover = () => {
		element?.showPopover()
	}

	export const hidePopover = () => {
		element?.hidePopover()
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
		}
	}
	$effect(refreshValues)
</script>

<svelte:window bind:innerHeight onresize={refreshValues} />
<div
	role="menu"
	{...attributes}
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
		{@render children()}
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
		animation: fadeIn var(--np-motion-expressive-default-effects);
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
