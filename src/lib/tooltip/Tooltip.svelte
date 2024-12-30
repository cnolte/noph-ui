<script lang="ts">
	import type { TooltipProps } from './types.ts'

	let { children, anchor, ...attributes }: TooltipProps = $props()
	let clientWidth = $state(0)
	let clientHeight = $state(0)
	let innerHeight = $state(0)
	let innerWidth = $state(0)
	let anchorRect: DOMRect | undefined = $state(anchor.getBoundingClientRect())

	const distanceToBorder = 8
	const refreshValues = () => {
		anchorRect = anchor?.getBoundingClientRect()
	}

	let calculateLeftPos = $derived.by(() => {
		if (!anchor || !anchorRect) {
			return 0
		}
		const left = anchorRect.left + anchorRect.width / 2 - clientWidth / 2
		if (left < distanceToBorder) {
			return distanceToBorder
		}
		if (innerWidth < left + clientWidth + distanceToBorder) {
			return innerWidth - clientWidth - distanceToBorder
		}
		return anchorRect.left + anchorRect.width / 2 - clientWidth / 2
	})

	let calculateTopPos = $derived.by(() => {
		if (!anchorRect) {
			return 0
		}
		const top = anchorRect.bottom + 4
		if (top + clientHeight > innerHeight) {
			return anchorRect.top - clientHeight - 4
		}
		return top
	})
	anchor.addEventListener('mouseenter', () => {
		refreshValues()
	})
</script>

<svelte:window bind:innerHeight bind:innerWidth onresize={refreshValues} onscroll={refreshValues} />

<div
	{...attributes}
	class={['tooltip', attributes.class]}
	style="top:{calculateTopPos}px;left:{calculateLeftPos}px;{attributes.style}"
	role="tooltip"
	bind:clientWidth
	bind:clientHeight
>
	{#if children}{@render children()}{/if}
</div>

<style>
	.tooltip {
		visibility: hidden;
		width: max-content;
		position: fixed;
		background: var(--np-color-inverse-surface);
		color: var(--np-color-inverse-on-surface);
		scale: 0;
		z-index: 1;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		line-height: 1rem;
		font-size: 0.75rem;
		transition: scale 0.3s ease;
	}
	@media (hover: hover) {
		:global([aria-describedby]:hover + [role='tooltip']) {
			visibility: visible;
			scale: 1;
		}
	}
</style>
