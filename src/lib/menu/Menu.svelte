<script lang="ts">
	import { onMount } from 'svelte'
	import type { MenuProps } from './types.ts'

	let {
		children,
		element = $bindable(),
		showPopover = $bindable(),
		hidePopover = $bindable(),
		open = $bindable(),
		quick = false,
		style,
		popover = 'auto',
		anchor,
		...attributes
	}: MenuProps = $props()

	let clientWidth = $state(0)
	let clientHeight = $state(0)
	let innerHeight = $state(0)

	showPopover = () => {
		element?.showPopover()
	}

	hidePopover = () => {
		element?.hidePopover()
	}
	const refreshValues = () => {
		if (element && anchor && open) {
			const anchorRect = anchor.getBoundingClientRect()
			let maxHeight: number
			if (innerHeight - anchorRect.bottom > anchorRect.top) {
				maxHeight = innerHeight - anchorRect.bottom
			} else {
				maxHeight = anchorRect.top
			}
			element.style.maxHeight =
				maxHeight > innerHeight - anchorRect.height
					? `${innerHeight - anchorRect.height - 4}px`
					: `${maxHeight - 4}px`
			if (!('positionArea' in document.documentElement.style)) {
				const docClientWidth = document.documentElement.clientWidth
				if (anchorRect.bottom + clientHeight > innerHeight && anchorRect.top - clientHeight > 0) {
					element.style.top = `${anchorRect.top - clientHeight - 2}px`
				} else {
					element.style.top = `${anchorRect.bottom + 2}px`
				}
				const left = anchorRect.left + anchorRect.width / 2 - clientWidth / 2
				if (left < 2) {
					element.style.left = '2px'
				} else if (left > docClientWidth - clientWidth) {
					element.style.left = `${docClientWidth - clientWidth - 4}px`
				} else {
					element.style.left = `${anchorRect.left + anchorRect.width / 2 - clientWidth / 2}px`
				}
			}
		}
	}
	$effect(refreshValues)

	const getScrollableParent = (start: HTMLElement) => {
		let el: HTMLElement | null = start
		while (el) {
			const style = getComputedStyle(el)
			const overflowY = style.overflowY
			const overflowX = style.overflowX
			const isScrollableY =
				(overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight
			const isScrollableX =
				(overflowX === 'auto' || overflowX === 'scroll') && el.scrollWidth > el.clientWidth

			if (isScrollableY || isScrollableX) {
				return el
			}

			el = el.parentElement
		}
		return window
	}

	const onScroll = () => {
		refreshValues()
	}

	const attachScrollableParent = (el: HTMLDivElement) => {
		if (!('anchorName' in document.documentElement.style)) {
			getScrollableParent(el).addEventListener('scroll', onScroll, { passive: true })
		}
	}

	onMount(() => {
		return () => {
			if (element && !('anchorName' in document.documentElement.style)) {
				getScrollableParent(element).removeEventListener('scroll', onScroll)
			}
		}
	})
</script>

<svelte:window bind:innerHeight onresize={refreshValues} />
<div
	role="menu"
	{...attributes}
	{@attach attachScrollableParent}
	bind:this={element}
	bind:clientWidth
	bind:clientHeight
	ontoggle={(event) => {
		let { newState } = event
		open = newState === 'open'
		attributes.ontoggle?.(event)
	}}
	{popover}
	class={['np-menu-container', !quick && 'np-animate', attributes.class]}
	{style}
>
	<div class="np-menu">
		{@render children()}
	</div>
</div>

<style>
	.np-menu-container {
		color: var(--np-menu-text-color, var(--np-color-on-surface));
		background-color: var(--np-menu-container-color, var(--np-color-surface-container));
		border: none;
		border-radius: var(--np-menu-container-shape, var(--np-shape-corner-extra-small));
		padding: 0;
		box-shadow: var(--np-elevation-2);
		margin: var(--np-menu-margin, 2px);
		inset: auto;
		justify-self: var(--np-menu-justify-self, anchor-center);
		position-area: var(--np-menu-position-area, bottom center);
		position-try: normal flip-block;
		z-index: 1000;
	}

	.np-animate[popover]:popover-open {
		opacity: 1;
		animation: fadeIn 0.2s linear;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.np-menu {
		overflow-y: auto;
		overflow-x: hidden;
		flex: 1;
		padding: 0.5rem 0;
		scrollbar-color: var(--np-color-on-surface-variant) transparent;
		scrollbar-width: thin;
	}
	:global(.np-menu .np-divider) {
		margin-block: 0.5rem;
	}
</style>
