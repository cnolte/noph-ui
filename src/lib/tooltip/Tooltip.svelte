<script lang="ts">
	import { on } from 'svelte/events'
	import { MediaQuery } from 'svelte/reactivity'
	import type { TooltipProps } from './types.ts'

	let {
		children,
		open = $bindable(),
		element = $bindable(),
		id,
		...attributes
	}: TooltipProps = $props()
	const uid = $props.id()

	let isTouch = new MediaQuery('(hover: none) and (pointer: coarse)', false)

	let attachAnchor = (el: HTMLDivElement) => {
		const anchor =
			(document.querySelector(`[aria-describedby="${id}"]`) as HTMLElement) ?? undefined
		if (!anchor) return
		const anchorName = anchor.style.getPropertyValue('anchor-name')
		const generatedId = anchorName || `--${uid}`
		el.style.setProperty('position-anchor', generatedId)
		if (!anchorName) {
			anchor.style.setProperty('anchor-name', generatedId)
		}
		const mouseEnter = on(anchor, 'mouseenter', onAnchorEnter)
		const mouseLeave = on(anchor, 'mouseleave', onAnchorLeave)
		const focus = on(anchor, 'focus', onAnchorFocus)
		const blur = on(anchor, 'blur', onAnchorBlur)
		return () => {
			mouseEnter()
			mouseLeave()
			focus()
			blur()
		}
	}

	const onAnchorFocus = (e: FocusEvent) => {
		const target = e.currentTarget as HTMLElement
		if (target.matches(':focus-visible')) {
			showPopover()
		}
	}

	let hideTimeout: ReturnType<typeof setTimeout> | undefined
	let overAnchor = false
	let overTooltip = false

	const showPopover = () => {
		clearTimeout(hideTimeout)
		if (element && !element.matches(':popover-open')) element.showPopover()
	}

	const hidePopover = () => {
		clearTimeout(hideTimeout)
		element?.hidePopover()
	}

	const scheduleHide = () => {
		clearTimeout(hideTimeout)
		hideTimeout = setTimeout(() => {
			if (!overAnchor && !overTooltip) hidePopover()
		}, 500)
	}

	const onAnchorEnter = () => {
		overAnchor = true
		showPopover()
	}

	const onAnchorLeave = () => {
		overAnchor = false
		scheduleHide()
	}

	const onTooltipEnter = () => {
		overTooltip = true
		clearTimeout(hideTimeout)
	}

	const onTooltipLeave = () => {
		overTooltip = false
		scheduleHide()
	}

	const onAnchorBlur = () => {
		if (!overAnchor && !overTooltip) hidePopover()
	}

	const onEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && open) hidePopover()
	}

	$effect(() => {
		const off = on(document, 'keydown', onEscape)
		return () => {
			off()
			clearTimeout(hideTimeout)
		}
	})
</script>

{#if !isTouch.current}
	<div
		{...attributes}
		{id}
		{@attach attachAnchor}
		class={['np-tooltip', attributes.class]}
		role="tooltip"
		popover="hint"
		bind:this={element}
		onmouseenter={onTooltipEnter}
		onmouseleave={onTooltipLeave}
		ontoggle={(event) => {
			let { newState } = event
			open = newState === 'open'
		}}
	>
		{#if children}{@render children()}{/if}
	</div>
{/if}

<style>
	.np-tooltip[popover] {
		width: max-content;
		max-width: 12.5rem;
		word-wrap: break-word;
		overflow-wrap: break-word;
		margin: 4px 0;
		background: var(--np-color-inverse-surface);
		color: var(--np-color-inverse-on-surface);
		padding: 0.25rem 0.5rem;
		border: none;
		border-radius: 0.25rem;
		line-height: 1rem;
		font-size: 0.75rem;
		justify-self: var(--np-tooltip-justify-self, anchor-center);
		position-area: var(--np-tooltip-position-area, top);
		position-try-fallbacks: flip-block;
	}
	.np-tooltip:popover-open {
		opacity: 1;
		scale: 1;
		animation:
			fadeIn var(--np-motion-expressive-fast-effects),
			scaleIn var(--np-motion-expressive-fast-spatial);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
	}
	@keyframes scaleIn {
		from {
			scale: 0.8;
		}
	}
</style>
