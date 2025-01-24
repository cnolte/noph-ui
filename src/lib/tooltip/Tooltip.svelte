<script lang="ts">
	import { generateUUIDv4 } from '$lib/utils.js'
	import type { TooltipProps } from './types.ts'

	let {
		children,
		element = $bindable(),
		id,
		keepTooltipOnClick = false,
		...attributes
	}: TooltipProps = $props()
	let clientWidth = $state(0)
	let clientHeight = $state(0)
	let innerHeight = $state(0)
	let anchor: HTMLElement | undefined = $state()

	const refreshValues = () => {
		if (element && anchor && !('anchorName' in document.documentElement.style)) {
			const docClientWidth = document.documentElement.clientWidth
			const anchorRect = anchor.getBoundingClientRect()
			if (anchorRect.bottom + clientHeight > innerHeight && anchorRect.top - clientHeight > 0) {
				element.style.top = `${anchorRect.top - clientHeight - 8}px`
			} else {
				element.style.top = `${anchorRect.bottom}px`
			}
			const left = anchorRect.left + anchorRect.width / 2 - clientWidth / 2
			if (left < 2) {
				element.style.left = '2px'
			} else if (left > docClientWidth - clientWidth) {
				element.style.left = `${docClientWidth - clientWidth - 2}px`
			} else {
				element.style.left = `${anchorRect.left + anchorRect.width / 2 - clientWidth / 2}px`
			}
		}
	}
	$effect(refreshValues)
	let setAnchor = (document: Document) => {
		anchor = (document.querySelector(`[aria-describedby="${id}"]`) as HTMLElement) ?? undefined
	}

	const isTouch = (event: PointerEvent) => {
		return event.pointerType === 'touch'
	}

	$effect(() => {
		if (anchor && element) {
			if ('anchorName' in document.documentElement.style) {
				const anchorName = anchor.style.getPropertyValue('anchor-name')
				const generatedId = anchorName || `--${generateUUIDv4()}`
				element.style.setProperty('position-anchor', generatedId)
				if (!anchorName) {
					anchor.style.setProperty('anchor-name', generatedId)
				}
			}
			anchor.addEventListener('pointerenter', (event: PointerEvent) => {
				if (!isTouch(event)) {
					element?.showPopover()
				}
			})
			anchor.addEventListener('pointerleave', (event: PointerEvent) => {
				if (!isTouch(event)) {
					element?.hidePopover()
				}
			})
			if (!keepTooltipOnClick) {
				anchor.addEventListener('pointerup', (event: PointerEvent) => {
					if (!isTouch(event)) {
						element?.hidePopover()
					}
				})
			}
		}
	})
</script>

<svelte:document use:setAnchor />
<svelte:window bind:innerHeight />

<div
	{...attributes}
	{id}
	class={['np-tooltip', attributes.class]}
	role="tooltip"
	popover="manual"
	bind:this={element}
	bind:clientWidth
	bind:clientHeight
>
	{#if children}{@render children()}{/if}
</div>

<style>
	.np-tooltip[popover] {
		width: max-content;
		margin: 4px 0;
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
		position-try-fallbacks: --np-tooltip-position-fallback;
	}
	.np-tooltip:popover-open {
		opacity: 1;
		animation: scaleIn 0.3s ease;
	}
	@position-try --np-tooltip-position-fallback {
		position-area: var(--np-tooltip-position-area-fallback, bottom);
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
