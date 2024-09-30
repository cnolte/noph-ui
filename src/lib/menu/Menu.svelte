<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface MenuProps extends HTMLAttributes<HTMLDivElement> {
		children: Snippet
		anchor: HTMLElement
	}

	let { anchor, children, ...attributes }: MenuProps = $props()

	let anchorRect = $state(anchor.getBoundingClientRect())
	let clientWidth = $state(0)
	let clientHeight = $state(0)
	let screenHeight = $state(window.innerHeight)
	let screenWidth = $state(window.innerWidth)
	const distanceToBorder = 8

	let maxHeight = $derived(
		(anchorRect.top > screenHeight - anchorRect.bottom
			? anchorRect.top
			: screenHeight - anchorRect.bottom) - distanceToBorder,
	)

	let calculateLeftPos = $derived.by(() => {
		const left = anchorRect.x + anchorRect.width / 2 - clientWidth / 2
		if (left < 0) {
			return 0
		}
		if (left + clientWidth > screenWidth) {
			return screenWidth - clientWidth
		}
		return left
	})
	let calculateTopPos = $derived.by(() => {
		const top = anchorRect.y + anchorRect.height + 2
		if (top + clientHeight > screenHeight) {
			return anchorRect.y - clientHeight - 2
		}
		return top
	})
	const resizeWindow = () => {
		screenHeight = window.innerHeight
		screenWidth = window.innerWidth
		anchorRect = anchor.getBoundingClientRect()
	}
</script>

<svelte:window onresize={resizeWindow} />

<div
	bind:clientWidth
	bind:clientHeight
	{...attributes}
	popover="auto"
	id={anchor.getAttribute('popovertarget')}
	style="max-height:{maxHeight}px;top:{calculateTopPos}px;left:{calculateLeftPos}px;"
>
	{@render children()}
</div>

<style>
	div[popover] {
		position: absolute;
		background-color: var(--np-paper-background-color);
		margin: 0 0;
		overflow: auto;
		left: 0;
		border-radius: 1rem;
		padding: 1rem 0;
		box-shadow: var(--np-elevation-2);
		transition:
			opacity 0.2s ease-in-out,
			overlay 0.2s ease-in-out allow-discrete;
		opacity: 0;
	}
	div:popover-open {
		opacity: 1;
	}
	@starting-style {
		:popover-open {
			opacity: 0;
		}
	}
</style>
