<script lang="ts">
	import { generateUUIDv4 } from '$lib/utils.js'
	import type { MenuProps } from './types.ts'

	let {
		anchor,
		children,
		element = $bindable(),
		showPopover = $bindable(),
		hidePopover = $bindable(),
		...attributes
	}: MenuProps = $props()

	let clientWidth = $state(0)
	let clientHeight = $state(0)
	let innerHeight = $state(0)

	showPopover = () => {
		element?.showPopover()
	}

	hidePopover = () => {
		element?.hidePopover()
	}

	const refreshValues = () => {
		if (element && anchor && !('anchorName' in document.documentElement.style)) {
			const docClientWidth = document.documentElement.clientWidth
			const anchorRect = anchor.getBoundingClientRect()
			if (anchorRect.bottom + clientHeight > innerHeight && anchorRect.top - clientHeight > 0) {
				element.style.top = `${anchorRect.top - clientHeight - 2}px`
			} else {
				element.style.top = `${anchorRect.bottom + 2}px`
			}
			const left = anchorRect.left + anchorRect.width / 2 - clientWidth / 2
			if (left < 2) {
				element.style.left = '2px'
			} else if (left > docClientWidth - clientWidth) {
				element.style.left = `${docClientWidth - clientWidth - 4}px`
			} else {
				element.style.left = `${anchorRect.left + anchorRect.width / 2 - clientWidth / 2}px`
			}
		}
	}
	$effect(refreshValues)

	$effect(() => {
		if (anchor && element) {
			element.addEventListener('toggle', (event) => {
				const { newState, currentTarget } = event as ToggleEvent & {
					currentTarget: EventTarget & HTMLDivElement
				}
				if (newState === 'open') {
					const rect = currentTarget.getBoundingClientRect()
					const viewportHeight = window.innerHeight

					if (rect.bottom > viewportHeight) {
						const maxHeight = viewportHeight - rect.top - 18
						currentTarget.style.maxHeight = `${maxHeight}px`
					}
				}
				if (newState === 'closed') {
					currentTarget.style.maxHeight = '80dvh'
				}
			})
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
			} else if (!anchor.style.getPropertyValue('anchor-name')) {
				const generatedId = `--${generateUUIDv4()}`
				element.style.setProperty('position-anchor', generatedId)
				anchor.style.setProperty('anchor-name', generatedId)
			}
		}
	})
</script>

<svelte:window bind:innerHeight onresize={refreshValues} />

<div
	{...attributes}
	bind:this={element}
	bind:clientWidth
	bind:clientHeight
	popover="auto"
	class={['np-menu', attributes.class]}
	role="menu"
>
	{@render children()}
</div>

<style>
	.np-menu[popover] {
		color: var(--np-menu-text-color, var(--np-color-on-surface));
		background-color: var(--np-menu-container-color, var(--np-color-surface-container));
		overflow-y: auto;
		border: none;
		border-radius: var(--np-menu-container-shape, var(--np-shape-corner-extra-small));
		padding: 0.5rem 0;
		box-shadow: var(--np-elevation-2);
		margin: var(--np-menu-margin, 2px);
		max-height: 80dvh;
		scrollbar-color: var(--np-color-on-surface-variant) transparent;
		scrollbar-width: thin;
		transition:
			display 0.2s allow-discrete,
			opacity 0.2s linear;
		opacity: 0;
		justify-self: var(--np-menu-justify-self, anchor-center);
		position-area: var(--np-menu-position-area, bottom center);
		position-try-fallbacks: --np-menu-position-fallback;
	}

	.np-menu:popover-open {
		opacity: 1;
		@starting-style {
			opacity: 0;
		}
	}
	@position-try --np-menu-position-fallback {
		position-area: var(--np-menu-position-area-fallback, top center);
	}
</style>
