<script lang="ts">
	import { onMount } from 'svelte'
	import type { TooltipProps } from './types.ts'
	import { MediaQuery } from 'svelte/reactivity'

	let {
		children,
		open = $bindable(),
		element = $bindable(),
		id,
		...attributes
	}: TooltipProps = $props()
	let clientWidth = $state(0)
	let clientHeight = $state(0)
	let innerHeight = $state(0)
	let anchor: HTMLElement | undefined = $state()
	const uid = $props.id()

	let isTouch = new MediaQuery('(hover: none) and (pointer: coarse)', false)

	const refreshValues = () => {
		if (element && anchor && open && !('positionArea' in document.documentElement.style)) {
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
	let attachAnchor = (el: HTMLDivElement) => {
		anchor = (document.querySelector(`[aria-describedby="${id}"]`) as HTMLElement) ?? undefined
		if (!anchor) return
		if ('anchorName' in document.documentElement.style) {
			const anchorName = anchor.style.getPropertyValue('anchor-name')
			const generatedId = anchorName || `--${uid}`
			el.style.setProperty('position-anchor', generatedId)
			if (!anchorName) {
				anchor.style.setProperty('anchor-name', generatedId)
			}
		}
		anchor.addEventListener('mouseenter', showPopover)
		anchor.addEventListener('mouseleave', onLeave)
		anchor.addEventListener('focus', onAnchorFocus)
		anchor.addEventListener('blur', hidePopover)
	}

	const onAnchorFocus = (e: FocusEvent) => {
		const target = e.currentTarget as HTMLElement
		if (target.matches(':focus-visible')) {
			showPopover()
		}
	}

	const showPopover = () => {
		element?.showPopover()
	}

	const hidePopover = () => {
		element?.hidePopover()
	}

	const onLeave = () => {
		hidePopover()
		// TODO Use delay as soons as popover="hint" is supported in all browsers
		// setTimeout(() => {
		// 	hidePopover()
		// }, 500)
	}

	onMount(() => {
		return () => {
			if (anchor) {
				anchor.removeEventListener('mouseenter', showPopover)
				anchor.removeEventListener('mouseleave', onLeave)
				anchor.removeEventListener('focus', onAnchorFocus)
				anchor.removeEventListener('blur', hidePopover)
			}
		}
	})
</script>

<svelte:window bind:innerHeight />

{#if !isTouch.current}
	<div
		{...attributes}
		{id}
		{@attach attachAnchor}
		class={['np-tooltip', attributes.class]}
		role="tooltip"
		popover="hint"
		bind:this={element}
		bind:clientWidth
		bind:clientHeight
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
		margin: 4px 0;
		background: var(--np-color-inverse-surface);
		color: var(--np-color-inverse-on-surface);
		padding: 0.25rem 0.5rem;
		border: none;
		border-radius: 0.25rem;
		line-height: 1rem;
		font-size: 0.75rem;
		opacity: 0;
		transition:
			display 0.3s allow-discrete,
			overlay 0.2s allow-discrete,
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
