<script lang="ts">
	import '#lib/internal/exit.css'
	import '#lib/internal/focus-ring.css'
	import { exitAnimation } from '#lib/animation.js'
	import { syncOpenEffect } from '#lib/popover.svelte.js'
	import type { SheetProps } from './types.js'

	let {
		open = $bindable(false),
		expanded = $bindable(false),
		modal = true,
		placement = 'bottom',
		handle = true,
		handleLabel = 'Drag handle',
		detached = false,
		headline,
		headlineLevel = 2,
		leading,
		action,
		actions,
		children,
		element = $bindable(),
		onclose,
		ontoggle,
		...attributes
	}: SheetProps = $props()

	const uid = $props.id()
	const headlineId = `np-sheet-headline-${uid}`

	let side = $derived(placement === 'start' || placement === 'end')
	let hasHandle = $derived(handle && placement === 'bottom')

	export const show = () => {
		if (!element || element.open) return
		if (modal) element.showModal()
		else element.show()
	}

	export const close = () => {
		element?.close()
	}

	syncOpenEffect(
		() => element,
		() => open,
		show,
		close,
	)

	// The two preset heights of a bottom sheet: at most half the window, and the full window less
	// its top margin, 56dp once the window is wider than 640dp and 72dp below.
	const halfHeight = () => window.innerHeight / 2
	const fullHeight = () => window.innerHeight - (window.innerWidth > 640 ? 56 : 72)
	// The height the sheet would take if nothing capped it.
	const naturalHeight = (sheet: HTMLElement) => {
		const content = sheet.querySelector<HTMLElement>('.np-sheet-content')
		const box = sheet.getBoundingClientRect().height
		return content ? box - content.clientHeight + content.scrollHeight : box
	}

	// Selecting the handle steps through the heights: half, full, and closed once there is no
	// taller height to go to.
	const step = () => {
		if (!element) return
		const roomToGrow = Math.min(naturalHeight(element), fullHeight()) > halfHeight() + 1
		if (!expanded && roomToGrow) expanded = true
		else if (expanded) expanded = false
		else close()
	}

	let drag: { y: number; height: number; time: number; moved: boolean } | undefined
	let dragged = false
	let dragging = $state(false)

	const onpointerdown = (event: PointerEvent & { currentTarget: HTMLElement }) => {
		dragged = false
		if (!element || event.button !== 0) return
		try {
			event.currentTarget.setPointerCapture(event.pointerId)
		} catch {
			// A pointer that is no longer down cannot be captured.
		}
		drag = {
			y: event.clientY,
			height: element.getBoundingClientRect().height,
			time: event.timeStamp,
			moved: false,
		}
	}

	// Pulled down, the sheet follows the pointer off screen; pulled up, it grows, up to its full
	// height.
	const onpointermove = (event: PointerEvent) => {
		if (!drag || !element) return
		const dy = event.clientY - drag.y
		if (!drag.moved && Math.abs(dy) < 4) return
		drag.moved = true
		dragging = true
		if (dy >= 0) {
			element.style.translate = `0 ${dy}px`
			element.style.maxHeight = `${drag.height}px`
		} else {
			element.style.translate = '0 0'
			element.style.maxHeight = `${Math.min(drag.height - dy, fullHeight())}px`
		}
	}

	// On release the sheet settles on the height nearest to where a flick would carry it: closed,
	// half or full.
	const onpointerup = (event: PointerEvent) => {
		if (!drag || !element) return
		const { moved, y, height, time } = drag
		drag = undefined
		if (!moved) return
		dragged = true
		const dy = event.clientY - y
		const velocity = dy / Math.max(1, event.timeStamp - time)
		const projected = height - dy - velocity * 200
		const natural = naturalHeight(element)
		const half = Math.min(natural, halfHeight())
		const full = Math.min(natural, fullHeight())
		const stops = [0, half, full]
		const target = stops.reduce((best, stop) =>
			Math.abs(stop - projected) < Math.abs(best - projected) ? stop : best,
		)
		dragging = false
		element.style.translate = ''
		element.style.maxHeight = ''
		if (target === 0) close()
		else expanded = target === full && full > half + 1
	}
</script>

<dialog
	{...attributes}
	bind:this={element}
	{@attach exitAnimation}
	tabindex="-1"
	closedby={modal ? 'any' : 'none'}
	aria-labelledby={headline ? headlineId : attributes['aria-labelledby']}
	class={[
		'np-sheet',
		`np-sheet-${placement}`,
		modal && 'np-sheet-modal np-exit-scrim',
		expanded && 'np-sheet-expanded',
		detached && side && 'np-sheet-detached',
		dragging && 'np-sheet-dragging',
		attributes.class,
	]}
	onclose={(event) => {
		open = false
		expanded = false
		onclose?.(event)
	}}
	ontoggle={(event) => {
		open = event.newState === 'open'
		if (event.newState === 'open') element?.focus()
		ontoggle?.(event)
	}}
	onclick={(event) => {
		if (modal && event.target === element) close()
	}}
>
	{#if hasHandle}
		<button
			type="button"
			class="np-sheet-handle"
			aria-label={handleLabel}
			aria-expanded={expanded}
			onclick={() => {
				if (dragged) dragged = false
				else step()
			}}
			{onpointerdown}
			{onpointermove}
			{onpointerup}
			onpointercancel={onpointerup}
		></button>
	{/if}
	{#if headline || action || leading}
		<div class="np-sheet-header">
			{#if leading}
				<div class="np-sheet-leading">{@render leading()}</div>
			{/if}
			{#if headline}
				<svelte:element this={`h${headlineLevel}`} id={headlineId} class="np-sheet-headline">
					{headline}
				</svelte:element>
			{/if}
			{#if action}
				<div class="np-sheet-action">{@render action()}</div>
			{/if}
		</div>
	{/if}
	<div class="np-sheet-content">
		{@render children?.()}
	</div>
	{#if actions}
		<div class="np-sheet-actions">{@render actions()}</div>
	{/if}
</dialog>

<style>
	.np-sheet {
		position: fixed;
		outline: none;
		z-index: var(--np-sheet-z-index, 24);
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: none;
		max-width: none;
		max-height: none;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: var(--np-sheet-container-color, var(--np-color-surface-container-low));
		color: var(--np-color-on-surface);
		box-shadow: var(--np-sheet-elevation, var(--np-elevation-1));
	}

	/* The sheet is its own surface, so its exit scrim has no inner part to tint it. */
	.np-sheet {
		--np-exit-scrim-inner: 0 0 transparent;
	}
	.np-sheet:not([open]) {
		display: none;
	}

	.np-sheet-bottom,
	.np-sheet-top {
		inset-inline: 0;
		width: 100%;
		max-height: var(--np-sheet-size, 50dvh);
	}
	/* Full width up to 640dp. On a wider window it keeps 56dp at the sides and, raised, 56dp at
	   the top; below, 72dp at the top. */
	.np-sheet-bottom {
		--_top-margin: 4.5rem;
		max-width: var(--np-sheet-max-width, 40rem);
		margin-inline: auto;
		inset-block-end: 0;
		inset-block-start: auto;
		border-start-start-radius: var(--np-sheet-shape, var(--np-shape-corner-extra-large));
		border-start-end-radius: var(--np-sheet-shape, var(--np-shape-corner-extra-large));
	}
	.np-sheet-bottom.np-sheet-expanded {
		max-height: calc(100dvh - var(--_top-margin));
	}
	@media (width > 640px) {
		.np-sheet-bottom {
			--_top-margin: 3.5rem;
			max-width: min(var(--np-sheet-max-width, 40rem), calc(100% - 7rem));
		}
	}
	.np-sheet-top {
		inset-block-start: 0;
		inset-block-end: auto;
		border-end-start-radius: var(--np-sheet-shape, var(--np-shape-corner-extra-large));
		border-end-end-radius: var(--np-sheet-shape, var(--np-shape-corner-extra-large));
	}

	.np-sheet-start,
	.np-sheet-end {
		inset-block: 0;
		height: 100dvh;
		width: var(--np-sheet-size, 20rem);
		max-width: 100%;
	}
	.np-sheet-start {
		inset-inline-start: 0;
		inset-inline-end: auto;
		border-start-end-radius: var(--np-sheet-shape, var(--np-shape-corner-large));
		border-end-end-radius: var(--np-sheet-shape, var(--np-shape-corner-large));
	}
	.np-sheet-end {
		inset-inline-end: 0;
		inset-inline-start: auto;
		border-start-start-radius: var(--np-sheet-shape, var(--np-shape-corner-large));
		border-end-start-radius: var(--np-sheet-shape, var(--np-shape-corner-large));
	}
	/* A standard side sheet is part of the layout: the content beside it makes room. */
	.np-sheet-start:not(.np-sheet-modal),
	.np-sheet-end:not(.np-sheet-modal) {
		position: relative;
		inset: auto;
		z-index: auto;
		height: auto;
		align-self: stretch;
		box-shadow: none;
		background-color: var(--np-sheet-container-color, var(--np-color-surface));
		border-radius: var(--np-sheet-shape, 0);
	}
	.np-sheet-start:not(.np-sheet-modal) > *,
	.np-sheet-end:not(.np-sheet-modal) > * {
		box-sizing: border-box;
		min-width: var(--np-sheet-size, 20rem);
	}
	.np-sheet-detached {
		inset-block: 1rem;
		height: calc(100dvh - 2rem);
		max-width: calc(100% - 2rem);
		border-radius: var(--np-sheet-shape, var(--np-shape-corner-large));
	}
	.np-sheet-detached.np-sheet-start {
		inset-inline-start: 1rem;
	}
	.np-sheet-detached.np-sheet-end {
		inset-inline-end: 1rem;
	}

	/* A 48dp target around the 32 by 4dp handle, which can be selected or dragged. */
	.np-sheet-handle {
		flex: none;
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		margin: 0 auto;
		padding: 0;
		border: 0;
		border-radius: var(--np-shape-corner-full);
		background: none;
		cursor: grab;
		touch-action: none;
		-webkit-tap-highlight-color: transparent;
	}
	.np-sheet-handle::before {
		content: '';
		width: 2rem;
		height: 0.25rem;
		border-radius: var(--np-shape-corner-full);
		background-color: var(--np-sheet-handle-color, var(--np-color-on-surface-variant));
	}
	.np-sheet-dragging .np-sheet-handle {
		cursor: grabbing;
	}
	.np-sheet-handle:focus-visible {
		outline: 3px solid var(--np-color-secondary);
		outline-offset: -3px;
	}

	.np-sheet-header {
		flex: none;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem 0;
	}
	.np-sheet-headline {
		flex: 1;
		margin: 0;
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 400;
	}
	.np-sheet-start .np-sheet-headline,
	.np-sheet-end .np-sheet-headline {
		color: var(--np-color-on-surface-variant);
	}
	.np-sheet-leading,
	.np-sheet-action {
		flex: none;
		display: flex;
	}
	.np-sheet-header:has(.np-sheet-leading) {
		padding-inline-start: 0.5rem;
	}

	.np-sheet-content {
		flex: 1;
		min-height: 0;
		overflow-x: hidden;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: 1rem 1.5rem 1.5rem;
	}

	.np-sheet-actions {
		flex: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 1.5rem 1.5rem;
	}

	.np-sheet-modal::backdrop {
		background-color: var(--np-color-scrim);
		opacity: 0.32;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-sheet {
			transition:
				translate var(--np-motion-expressive-default-spatial),
				max-height var(--np-motion-expressive-default-spatial),
				display var(--np-motion-expressive-default-spatial) allow-discrete,
				overlay var(--np-motion-expressive-default-spatial) allow-discrete;
		}
		/* While dragged, the sheet sticks to the pointer. */
		.np-sheet.np-sheet-dragging {
			transition: none;
		}
		/* A standard side sheet opens by making room, not by sliding over the content. */
		.np-sheet-start:not(.np-sheet-modal),
		.np-sheet-end:not(.np-sheet-modal) {
			width: 0;
			translate: none;
			transition:
				width var(--np-motion-expressive-default-spatial),
				display var(--np-motion-expressive-default-spatial) allow-discrete;
		}
		.np-sheet-start:not(.np-sheet-modal)[open],
		.np-sheet-end:not(.np-sheet-modal)[open] {
			width: var(--np-sheet-size, 20rem);
			@starting-style {
				width: 0;
			}
		}
		.np-sheet::backdrop {
			transition:
				opacity var(--np-motion-expressive-fast-effects),
				display var(--np-motion-expressive-fast-effects) allow-discrete,
				overlay var(--np-motion-expressive-fast-effects) allow-discrete;
		}

		.np-sheet-bottom {
			translate: 0 100%;
		}
		.np-sheet-top {
			translate: 0 -100%;
		}
		.np-sheet-start {
			translate: -100% 0;
		}
		.np-sheet-end {
			translate: 100% 0;
		}
		.np-sheet[open] {
			translate: 0 0;
		}
		@starting-style {
			.np-sheet-bottom[open] {
				translate: 0 100%;
			}
			.np-sheet-top[open] {
				translate: 0 -100%;
			}
			.np-sheet-start[open] {
				translate: -100% 0;
			}
			.np-sheet-end[open] {
				translate: 100% 0;
			}
		}

		.np-sheet-modal::backdrop {
			opacity: 0;
		}
		.np-sheet-modal[open]::backdrop {
			opacity: 0.32;
			@starting-style {
				opacity: 0;
			}
		}
	}
</style>
