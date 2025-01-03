<script lang="ts">
	import type { TooltipProps } from './types.ts'

	let { children, element = $bindable(), id, ...attributes }: TooltipProps = $props()
	let clientWidth = $state(0)
	let clientHeight = $state(0)
	let innerHeight = $state(0)
	let innerWidth = $state(0)
	let anchor: HTMLElement | undefined = $state()
	let anchorRect: DOMRect | undefined = $state()

	const distanceToBorder = 8

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
	let setAnchor = (document: Document) => {
		anchor = (document.querySelector(`[aria-describedby="${id}"]`) as HTMLElement) ?? undefined
	}

	$effect(() => {
		if (anchor) {
			anchor.addEventListener('pointerenter', () => {
				anchorRect = anchor?.getBoundingClientRect() ?? undefined
				element?.showPopover()
			})
			anchor.addEventListener('pointerleave', () => {
				element?.hidePopover()
			})
		}
	})
</script>

<svelte:document use:setAnchor />
<svelte:window bind:innerHeight bind:innerWidth />

<div
	{...attributes}
	{id}
	class={['np-tooltip', attributes.class]}
	style="top:{calculateTopPos}px;left:{calculateLeftPos}px;{attributes.style}"
	role="tooltip"
	popover="manual"
	bind:this={element}
	bind:clientWidth
	bind:clientHeight
>
	{#if children}{@render children()}{/if}
</div>

<style>
	.np-tooltip {
		width: max-content;
		margin: 0;
		background: var(--np-color-inverse-surface);
		color: var(--np-color-inverse-on-surface);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		line-height: 1rem;
		font-size: 0.75rem;
		opacity: 0;
		transition:
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete,
			opacity 0.3s ease;
	}
	.np-tooltip:popover-open {
		opacity: 1;
		animation: scaleIn 0.3s ease;
	}

	@keyframes scaleIn {
		from {
			scale: 0;
		}
		to {
			scale: 1;
		}
	}
</style>
