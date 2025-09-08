<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity'
	import type { TooltipProps } from './types.ts'
	import { onMount } from 'svelte'

	let {
		children,
		element = $bindable(),
		id,
		keepTooltipOnClick = false,
		...attributes
	}: TooltipProps = $props()

	const anchorNameFallback = $props.id()

	let touch = new MediaQuery('(pointer: coarse) and (hover: none)', false)
	let anchor = $state<HTMLElement>()

	const isTouch = (event: PointerEvent) => {
		return event.pointerType === 'touch'
	}

	const onPointerenter = (event: PointerEvent) => {
		if (!isTouch(event)) {
			element?.showPopover()
		}
	}

	const onPointerleave = (event: PointerEvent) => {
		if (!isTouch(event)) {
			element?.hidePopover()
		}
	}

	const onPointerup = (event: PointerEvent) => {
		if (!isTouch(event)) {
			element?.hidePopover()
		}
	}
	onMount(() => {
		return () => {
			if (anchor) {
				anchor.style.removeProperty('anchor-name')
				anchor.removeEventListener('pointerenter', onPointerenter)
				anchor.removeEventListener('pointerleave', onPointerleave)
				anchor.removeEventListener('pointerup', onPointerup)
			}
		}
	})
</script>

{#if !touch.current}
	<div
		{...attributes}
		{@attach (element) => {
			if (id && 'positionArea' in document.documentElement.style) {
				anchor = (document.querySelector(`[aria-describedby="${id}"]`) as HTMLElement) ?? undefined

				if ('anchorName' in document.documentElement.style) {
					const anchorName = anchor.style.getPropertyValue('anchor-name')
					const generatedId = anchorName || `--${anchorNameFallback}`
					element.style.setProperty('position-anchor', generatedId)
					if (!anchorName) {
						anchor.style.setProperty('anchor-name', generatedId)
					}
				}
				anchor.addEventListener('pointerenter', onPointerenter)
				anchor.addEventListener('pointerleave', onPointerleave)
				if (!keepTooltipOnClick) {
					anchor.addEventListener('pointerup', onPointerup)
				}
			}
		}}
		{id}
		class={['np-tooltip', attributes.class]}
		role="tooltip"
		aria-live="polite"
		popover="manual"
		bind:this={element}
	>
		{#if children}{@render children()}{/if}
	</div>
{/if}

<style>
	.np-tooltip[popover] {
		width: max-content;
		margin: 4px 0;
		inset: auto;
		background: var(--np-color-inverse-surface);
		color: var(--np-color-inverse-on-surface);
		padding: 0.25rem 0.5rem;
		border: none;
		border-radius: 0.25rem;
		line-height: 1rem;
		font-size: 0.75rem;
		opacity: 0;
		z-index: 1000;
		transition:
			display 0.3s allow-discrete,
			opacity 0.3s ease;
		justify-self: var(--np-tooltip-justify-self, anchor-center);
		position-area: var(--np-tooltip-position-area, top);
		position-try: normal flip-block;
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
