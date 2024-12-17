<script lang="ts">
	import { generateUUIDv4 } from '$lib/utils.js'
	import type { MenuProps } from './types.ts'

	let { anchor, children, ...attributes }: MenuProps = $props()

	let clientWidth = $state(0)
	let clientHeight = $state(0)
	let innerHeight = $state(0)
	let innerWidth = $state(0)
	let scrollY = $state(0)
	let scrollX = $state(0)
	let popoverElement: HTMLDivElement | undefined = $state()
	let anchorId = anchor?.style.getPropertyValue('anchor-name')
	const refreshValues = () => {
		if (popoverElement && anchor && !('anchorName' in document.documentElement.style)) {
			const anchorRect = anchor.getBoundingClientRect()
			if (anchorRect.bottom + clientHeight > innerHeight && anchorRect.top - clientHeight > 0) {
				popoverElement.style.top = `${anchorRect.top - clientHeight - 2}px`
			} else {
				popoverElement.style.top = `${anchorRect.bottom + 2}px`
			}
			const left = anchorRect.left + anchorRect.width / 2 - clientWidth / 2
			if (left > innerWidth - clientWidth) {
				popoverElement.style.left = `${innerWidth - clientWidth - 8}px`
			} else if (left < 8) {
				popoverElement.style.left = '8px'
			} else {
				popoverElement.style.left = `${anchorRect.left + anchorRect.width / 2 - clientWidth / 2}px`
			}
		}
	}
	$effect(refreshValues)

	$effect(() => {
		if (anchor && popoverElement) {
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
				popoverElement.style.setProperty('position-anchor', generatedId)
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
	bind:this={popoverElement}
	bind:clientWidth
	bind:clientHeight
	{...attributes}
	popover="auto"
	class="np-menu {attributes.class}"
	role="menu"
>
	{@render children()}
</div>

<style>
	.np-menu[popover] {
		background-color: var(--np-menu-container-color, var(--np-color-surface-container));
		overflow: auto;
		border: none;
		border-radius: var(--np-menu-container-shape, var(--np-shape-corner-extra-small));
		padding: 0.5rem 0;
		box-shadow: var(--np-elevation-2);
		margin: 0;
		margin-bottom: 2px;
		margin-top: 2px;
		top: anchor(bottom);
		position-try-fallbacks: --menu-top;
		justify-self: anchor-center;
		transition:
			display 0.2s allow-discrete,
			opacity 0.2s linear;
		opacity: 0;
		z-index: 1;
	}
	.np-menu:popover-open {
		opacity: 1;
		@starting-style {
			opacity: 0;
		}
	}
	@position-try --menu-top {
		inset: auto;
		bottom: anchor(top);
	}
</style>
