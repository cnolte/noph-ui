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
	let innerHeight = $state(0)
	let innerWidth = $state(0)
	const distanceToBorder = 8

	let maxHeight = $derived(
		(anchorRect.top > innerHeight - anchorRect.bottom
			? anchorRect.top
			: innerHeight - anchorRect.bottom) - distanceToBorder,
	)

	let calculateLeftPos = $derived.by(() => {
		const left = anchorRect.x + anchorRect.width / 2 - clientWidth / 2
		if (left < distanceToBorder) {
			return distanceToBorder
		}
		if (distanceToBorder + left + clientWidth > innerWidth) {
			return innerWidth - clientWidth - distanceToBorder
		}
		return left
	})
	let calculateTopPos = $derived.by(() => {
		const top = anchorRect.y + window.scrollY + anchorRect.height + 2
		if (top + clientHeight > innerHeight) {
			return anchorRect.y + window.scrollY - clientHeight - 2
		}
		return top
	})
	const refreshValues = () => {
		anchorRect = anchor.getBoundingClientRect()
	}

	anchor.addEventListener('click', () => {
		refreshValues()
	})
</script>

<svelte:window bind:innerHeight bind:innerWidth onresize={refreshValues} onscroll={refreshValues} />

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
		background-color: var(--np-menu-background-color, var(--np-background-color));
		margin: 0 0;
		overflow: auto;
		left: 0;
		border-radius: 1rem;
		padding: 1rem 0;
		box-shadow: var(--np-elevation-2);
		transition:
			opacity 0.3s,
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete;
		opacity: 0;
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
