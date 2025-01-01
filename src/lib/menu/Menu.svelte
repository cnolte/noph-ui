<script lang="ts">
	import { generateUUIDv4 } from '$lib/utils.js'
	import type { MenuProps } from './types.ts'

	let {
		anchor,
		children,
		element = $bindable(),
		showPopover = $bindable(),
		hidePopover = $bindable(),
		position = 'bottom',
		...attributes
	}: MenuProps = $props()

	let clientWidth = $state(0)
	let clientHeight = $state(0)
	let innerHeight = $state(0)
	let innerWidth = $state(0)
	let scrollY = $state(0)
	let scrollX = $state(0)
	let anchorId = anchor?.style.getPropertyValue('anchor-name')

	showPopover = () => {
		element?.showPopover()
	}

	hidePopover = () => {
		element?.hidePopover()
	}

	const refreshValues = () => {
		if (element && anchor && !('anchorName' in document.documentElement.style)) {
			const anchorRect = anchor.getBoundingClientRect()
			if (anchorRect.bottom + clientHeight > innerHeight && anchorRect.top - clientHeight > 0) {
				element.style.top = `${anchorRect.top - clientHeight - 2}px`
			} else {
				element.style.top = `${anchorRect.bottom + 2}px`
			}
			const left = anchorRect.left + anchorRect.width / 2 - clientWidth / 2
			if (left > innerWidth - clientWidth) {
				element.style.left = `${innerWidth - clientWidth - 8}px`
			} else if (left < 8) {
				element.style.left = '8px'
			} else {
				element.style.left = `${anchorRect.left + anchorRect.width / 2 - clientWidth / 2}px`
			}
		}
	}
	$effect(refreshValues)

	$effect(() => {
		if (anchor && element) {
			if (!('anchorName' in document.documentElement.style)) {
				anchor.addEventListener('click', () => {
					refreshValues()
				})
				window.addEventListener(
					'scroll',
					() => {
						refreshValues()
					},
					{ passive: true },
				)
			} else if (!anchorId) {
				const generatedId = `--${generateUUIDv4()}`
				element.style.setProperty('position-anchor', generatedId)
				anchor.style.setProperty('anchor-name', generatedId)
			}
		}
	})
</script>

<svelte:window
	bind:scrollX
	bind:scrollY
	bind:innerHeight
	bind:innerWidth
	onresize={refreshValues}
/>

<div
	{...attributes}
	bind:this={element}
	bind:clientWidth
	bind:clientHeight
	popover="auto"
	class={[position, 'np-menu', attributes.class]}
	role="menu"
>
	{@render children()}
</div>

<style>
	.np-menu[popover] {
		color: var(--np-menu-text-color, var(--np-color-on-surface));
		background-color: var(--np-menu-container-color, var(--np-color-surface-container));
		overflow: auto;
		border: none;
		border-radius: var(--np-menu-container-shape, var(--np-shape-corner-extra-small));
		padding: 0.5rem 0;
		box-shadow: var(--np-elevation-2);
		margin: 0;
		margin-bottom: 2px;
		margin-top: 2px;
		transition:
			display 0.2s allow-discrete,
			opacity 0.2s linear;
		opacity: 0;
		z-index: 1;
	}
	.bottom-left.np-menu[popover] {
		top: anchor(bottom);
		left: anchor(left);
		justify-self: anchor-center;
		position-try-fallbacks: --menu-top-left;
	}

	.bottom.np-menu[popover] {
		top: anchor(bottom);
		position-try-fallbacks: --menu-top;
		justify-self: anchor-center;
	}

	.np-menu:popover-open {
		opacity: 1;
	}
	@starting-style {
		.np-menu:popover-open {
			opacity: 0;
		}
	}
	@position-try --menu-top {
		inset: auto;
		bottom: anchor(top);
	}
	@position-try --menu-top-left {
		inset: auto;
		bottom: anchor(top);
		left: anchor(left);
	}
</style>
