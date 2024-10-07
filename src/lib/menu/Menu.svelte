<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface MenuProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet
		anchor: HTMLElement | undefined
	}

	let { anchor, children, ...attributes }: MenuProps = $props()

	let clientWidth = $state(0)
	let clientHeight = $state(0)
	let innerHeight = $state(0)
	let innerWidth = $state(0)
	let scrollY = $state(0)
	let scrollX = $state(0)
	let popoverElement: HTMLDivElement | undefined = $state()

	/*let maxHeight = $derived(
		(anchorRect.top > innerHeight - anchorRect.bottom
			? anchorRect.top
			: innerHeight - anchorRect.bottom) - distanceToBorder,
	)

	let calculateLeftPos = $derived.by(() => {
		const left = anchorRect.left + anchorRect.width / 2 - clientWidth / 2
		if (left < distanceToBorder) {
			return distanceToBorder
		}
		if (distanceToBorder + left + clientWidth > innerWidth) {
			return innerWidth - clientWidth - distanceToBorder
		}
		return left
	})
	let calculateTopPos = $derived.by(() => {
		const top = anchorRect.bottom + 2
		if (top + clientHeight > innerHeight) {
			return anchorRect.top - clientHeight - 2
		}
		return top
	})*/
	const refreshValues = () => {
		if (!('anchorName' in document.documentElement.style) && popoverElement && anchor) {
			const anchorRect = anchor.getBoundingClientRect()
			if (anchorRect.bottom + clientHeight > innerHeight) {
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
		if (!('anchorName' in document.documentElement.style) && anchor) {
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
	role="menu"
>
	{@render children()}
</div>

<style>
	div[popover] {
		color: var(--np-menu-color, var(--np-color-on-surface));
		background-color: var(--np-menu-background-color, var(--np-color-surface-container));
		overflow: auto;
		border-radius: 1rem;
		padding: 1rem 0;
		box-shadow: var(--np-elevation-2);
		margin: 0;
		margin-right: 2rem;
		transition:
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete,
			opacity 0.3s ease-out;
		opacity: 0;
		position-area: bottom;
		position-try: normal flip-block;
		z-index: 1;
	}
	div:popover-open {
		opacity: 1;
	}
	@starting-style {
		div[popover] {
			opacity: 0;
		}
	}
</style>
