<script lang="ts">
	import { flushSync, untrack } from 'svelte'
	import type { Attachment } from 'svelte/attachments'
	import '#lib/internal/focus-ring.css'
	import { afterExit, motionOf } from '#lib/animation.js'
	import IconButton from '#lib/button/IconButton.svelte'
	import { arrowKeyNav, focusableItems } from '#lib/keyboard-nav.js'
	import { compactWindow, reducedMotion } from '#lib/media.js'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import ArrowBackIcon from '#lib/icons/ArrowBackIcon.svelte'
	import CloseIcon from '#lib/icons/CloseIcon.svelte'
	import SearchIcon from '#lib/icons/SearchIcon.svelte'
	import type { SearchProps } from './types.js'

	let {
		value = $bindable(''),
		placeholder = '',
		expanded = $bindable(false),
		variant = 'contained',
		view: viewProp,
		leading,
		trailing,
		resultsAttributes,
		label,
		clearLabel = 'Clear search',
		backLabel = 'Close search',
		onsearch,
		resultsAnnouncement = (count) =>
			count === 0 ? 'No results' : count === 1 ? '1 result' : `${count} results`,
		inputAttributes,
		children,
		element = $bindable(),
		inputElement = $bindable(),
		...attributes
	}: SearchProps = $props()

	const uid = $props.id()
	const resultsId = `np-search-results-${uid}`

	// Without a view of its own, search fills the screen in compact windows and docks above them.
	let view = $derived(viewProp ?? (compactWindow.current ? 'full-screen' : 'docked'))

	let resultsElement: HTMLDivElement | undefined = $state()
	const RESULTS = "a[href], button, input:not([type='hidden']), select, textarea, [role='option']"
	const resultArrows = arrowKeyNav(RESULTS, 'vertical')
	const results = () => (resultsElement ? focusableItems(resultsElement, RESULTS) : [])

	// Screen readers hear how many results there are whenever they appear or change.
	let announcement = $state('')
	$effect(() => {
		if (!expanded || !resultsElement) {
			announcement = ''
			return
		}
		const node = resultsElement
		let timer: ReturnType<typeof setTimeout>
		const announce = () => {
			clearTimeout(timer)
			timer = setTimeout(() => {
				announcement = resultsAnnouncement(
					node.querySelectorAll('.np-item, [role="option"]').length,
				)
			}, 300)
		}
		announce()
		const observer = new MutationObserver(announce)
		observer.observe(node, { childList: true, subtree: true })
		return () => {
			clearTimeout(timer)
			observer.disconnect()
		}
	})

	// Closing keeps the view open while the results animate away.
	let leaving = $state(false)
	let wasExpanded = untrack(() => expanded)
	$effect(() => {
		const next = expanded
		return untrack(() => {
			if (next === wasExpanded) return
			wasExpanded = next
			if (next || reducedMotion.current) {
				leaving = false
				return
			}
			leaving = true
			return afterExit(resultsElement, () => (leaving = false))
		})
	})

	// Docked, the results grow and shrink to their new height, when they open, change or close.
	let empty = $state(true)
	const resize: Attachment<HTMLElement> = (pane) => {
		let height = pane.offsetHeight
		let animation: Animation | undefined
		const observer = new ResizeObserver(() => {
			const from = height
			height = pane.offsetHeight
			if (animation) return
			empty = height === 0
			if (from === height || view !== 'docked' || reducedMotion.current) return
			const keyframe = { minHeight: '0px', overflow: 'hidden' }
			animation = pane.animate(
				[
					{ ...keyframe, height: `${from}px` },
					{ ...keyframe, height: `${height}px` },
				],
				motionOf(pane, '--np-motion-standard-fast-spatial'),
			)
			animation.onfinish = animation.oncancel = () => (animation = undefined)
		})
		observer.observe(pane)
		return () => {
			observer.disconnect()
			animation?.cancel()
		}
	}

	let pointerFocus = false
	let focusRing = $state(false)
	let pointerInside = false

	export const show = () => {
		expanded = true
		pointerFocus = true
		flushSync()
		inputElement?.focus()
	}

	export const close = () => {
		expanded = false
		inputElement?.blur()
	}
</script>

<svelte:window
	onpointerdown={(event) => {
		pointerInside = event.target instanceof Node && element?.contains(event.target) === true
	}}
	onpointercancel={() => (pointerInside = false)}
	onclick={() => (pointerInside = false)}
/>

<div
	{...attributes}
	bind:this={element}
	class={[
		'np-search',
		`np-search-${variant}`,
		`np-search-${view}`,
		expanded && 'np-search-expanded',
		(expanded || leaving) && 'np-search-open',
		leaving && 'np-search-leaving',
		empty && 'np-search-empty',
		attributes.class,
	]}
	onkeydown={(event) => {
		pointerFocus = false
		attributes.onkeydown?.(event)
	}}
	onfocusout={(event) => {
		const next = event.relatedTarget
		if (expanded && !pointerInside && !(next instanceof Node && element?.contains(next)))
			expanded = false
		attributes.onfocusout?.(event)
	}}
>
	<div class="np-search-container">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class={['np-search-bar', focusRing && 'np-search-focus-ring']}
			onpointerdown={() => (pointerFocus = true)}
			onclick={(event) => {
				// The leading and trailing actions do their own thing, the rest of the bar opens search.
				const target = event.target as Element
				if (
					target.closest('.np-search-trailing') ||
					(leading && target.closest('.np-search-leading'))
				)
					return
				inputElement?.focus()
			}}
		>
			{#if !expanded}
				<Ripple />
			{/if}
			<span class="np-search-leading">
				{#if leading}
					{@render leading()}
				{:else if expanded}
					<IconButton
						class="np-search-swap"
						title={backLabel}
						onclick={(event) => {
							event.stopPropagation()
							expanded = false
						}}
					>
						<ArrowBackIcon />
					</IconButton>
				{:else}
					<span class="np-search-leading-icon np-search-swap"><SearchIcon /></span>
				{/if}
			</span>

			<input
				{...inputAttributes}
				bind:this={inputElement}
				bind:value
				type="search"
				class="np-search-input"
				{placeholder}
				aria-label={label ?? inputAttributes?.['aria-label'] ?? (placeholder || 'Search')}
				aria-controls={resultsId}
				autocomplete="off"
				onpointerdown={(event) => {
					pointerFocus = true
					inputAttributes?.onpointerdown?.(event)
				}}
				onfocus={(event) => {
					expanded = true
					focusRing = !pointerFocus
					pointerFocus = false
					inputAttributes?.onfocus?.(event)
				}}
				onblur={(event) => {
					focusRing = false
					inputAttributes?.onblur?.(event)
				}}
				onkeydown={(event) => {
					// A field with keys of its own, a combobox for instance, takes them first.
					inputAttributes?.onkeydown?.(event)
					if (event.defaultPrevented) return
					if (event.key === 'Enter') {
						onsearch?.(value)
						// The query stays visible but lets go of focus, which moves to the results.
						resultsElement?.focus()
					}
					if (event.key === 'ArrowDown') {
						const first = results()[0]
						if (first) {
							event.preventDefault()
							first.focus()
						}
					}
					if (event.key === 'Escape' && expanded) {
						expanded = false
						inputElement?.blur()
					}
				}}
			/>

			<span class="np-search-trailing">
				{#if value && expanded}
					<IconButton
						class="np-search-swap"
						title={clearLabel}
						onclick={() => {
							value = ''
							pointerFocus = true
							inputElement?.focus()
						}}
					>
						<CloseIcon />
					</IconButton>
				{/if}
				{#if trailing}
					{@render trailing()}
				{/if}
			</span>
		</div>

		<div
			{...resultsAttributes}
			bind:this={resultsElement}
			{@attach resize}
			id={resultsId}
			tabindex="-1"
			class={['np-search-results', resultsAttributes?.class]}
			onkeydowncapture={(event) => {
				// ↑ on the first result goes back to the field.
				if (event.key === 'ArrowUp' && document.activeElement === results()[0]) {
					event.preventDefault()
					inputElement?.focus()
				}
			}}
			onkeydown={(event) => {
				resultsAttributes?.onkeydown?.(event)
				if (!event.defaultPrevented) resultArrows(event)
				// Escape goes back to the field and closes the view, in that order, since focusing the
				// field opens it.
				if (event.key === 'Escape' && expanded) {
					inputElement?.focus()
					expanded = false
				}
			}}
		>
			{@render children?.()}
		</div>
		<span class="np-search-announcement" role="status">{announcement}</span>
	</div>
</div>

<style>
	.np-search {
		--_bar-height: 3.5rem;
		--_gap: 0.125rem;
		--_pane-margin: var(--np-search-pane-margin, 1.5rem);
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		padding-inline: var(--_pane-margin);
	}
	/* Full screen keeps the margin while the view fades out. */
	.np-search-contained.np-search-expanded,
	.np-search-contained.np-search-full-screen.np-search-open {
		--_pane-margin: var(--np-search-view-margin, 0.75rem);
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-search {
			transition: padding var(--np-motion-expressive-default-spatial);
		}
	}

	.np-search-docked {
		position: relative;
		block-size: var(--_bar-height);
		padding-inline: 0;
	}

	.np-search-container {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		gap: var(--_gap);
		min-height: 0;
		width: 100%;
		min-width: min(22.5rem, 100%);
		max-width: var(--np-search-width, 45rem);
		margin-inline: auto;
	}
	.np-search-docked .np-search-container {
		position: absolute;
		inset-block-start: 0;
		inset-inline: var(--_pane-margin);
		width: calc(100% - 2 * var(--_pane-margin));
		min-width: min(22.5rem, calc(100% - 2 * var(--_pane-margin)));
		z-index: var(--np-search-z-index, 3);
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-search-docked .np-search-container {
			transition:
				inset-inline-start var(--np-motion-expressive-default-spatial),
				inset-inline-end var(--np-motion-expressive-default-spatial),
				width var(--np-motion-expressive-default-spatial),
				min-width var(--np-motion-expressive-default-spatial);
		}

		/* Docked, the results fade in while they grow, see resize. */
		.np-search-docked.np-search-expanded .np-search-results {
			animation: fadeIn var(--np-motion-expressive-default-effects);
		}
		.np-search-full-screen.np-search-expanded {
			animation: backgroundIn var(--np-motion-expressive-fast-effects);
		}
		.np-search-full-screen.np-search-expanded .np-search-results {
			animation: fadeIn var(--np-motion-expressive-default-effects);
		}
		.np-search-leaving .np-search-results {
			animation: fadeOut var(--np-motion-expressive-fast-effects) forwards;
		}
		.np-search-full-screen.np-search-leaving {
			animation: backgroundOut var(--np-motion-expressive-fast-effects) forwards;
		}

		/* The back and search icons swap, and the clear button comes in. */
		.np-search-expanded :global(.np-search-swap),
		.np-search-leaving :global(.np-search-swap) {
			animation: swapIn var(--np-motion-expressive-fast-effects);
		}
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
	}
	@keyframes fadeOut {
		to {
			opacity: 0;
		}
	}
	@keyframes backgroundIn {
		from {
			background-color: transparent;
		}
	}
	@keyframes backgroundOut {
		to {
			background-color: transparent;
		}
	}
	@keyframes swapIn {
		from {
			opacity: 0;
			scale: 0.6;
		}
	}

	.np-search-bar {
		position: relative;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		flex: none;
		gap: 0.5rem;
		padding-inline: 0.5rem;
		height: var(--_bar-height);
		/* No rounder than the bar, so the corners animate evenly. */
		border-radius: min(var(--np-search-shape, var(--np-shape-corner-full)), var(--_bar-height) / 2);
		background-color: var(--np-search-container-color, var(--np-color-surface-container-high));
		color: var(--np-color-on-surface);
	}
	.np-search:not(.np-search-expanded) .np-search-bar {
		cursor: pointer;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-search-bar {
			transition:
				height var(--np-motion-expressive-default-spatial),
				background-color var(--np-motion-expressive-fast-effects),
				border-radius var(--np-motion-expressive-fast-effects),
				box-shadow var(--np-motion-expressive-fast-effects);
		}
	}

	.np-search-leading,
	.np-search-trailing,
	.np-search-input {
		position: relative;
	}

	.np-search-leading,
	.np-search-trailing {
		display: flex;
		align-items: center;
		flex: none;
	}
	.np-search-trailing {
		gap: 0;
	}
	.np-search-leading {
		--np-icon-button-icon-color: var(--np-color-on-surface-variant);
	}
	.np-search-trailing {
		--np-icon-button-icon-color: var(--np-color-on-surface-variant);
	}
	.np-search-leading-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		block-size: 2.5rem;
		inline-size: 2.5rem;
		fill: var(--np-color-on-surface-variant);
	}

	.np-search-input {
		flex: 1;
		min-width: 0;
		appearance: none;
		border: none;
		outline: none;
		background: none;
		font: inherit;
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: 0.03125rem;
		color: var(--np-color-on-surface);
		padding: 0;
		cursor: inherit;
	}
	.np-search-input::placeholder {
		color: var(--np-color-on-surface-variant);
		opacity: 1;
	}
	.np-search-input::-webkit-search-cancel-button {
		appearance: none;
	}

	.np-search-focus-ring {
		outline-style: solid;
		outline-color: var(--np-search-focus-indicator-color, var(--np-color-secondary));
		outline-width: 3px;
		outline-offset: 2px;
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-search-focus-ring {
			animation: focusAnimation var(--np-motion-expressive-slow-effects) forwards;
		}
	}

	.np-search-results {
		display: none;
		box-sizing: border-box;
		overflow-y: auto;
		overscroll-behavior: contain;
	}
	.np-search-results:focus {
		outline: none;
	}
	.np-search-announcement {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.np-search-open .np-search-results {
		display: block;
	}
	.np-search-leaving .np-search-results {
		pointer-events: none;
	}

	.np-search-docked.np-search-open .np-search-container {
		max-height: var(--np-search-docked-max-height, 66.6667dvh);
	}
	/* Its height is animated, see resize. */
	.np-search-docked .np-search-results {
		flex: 0 1 auto;
		min-height: 0;
		max-height: var(--np-search-results-max-height, none);
	}
	/* With results, the open view is at least 240px high, bar included. */
	.np-search-docked .np-search-results:has(:global(:is(.np-item, [role='option']))) {
		min-height: calc(var(--np-search-docked-min-height, 15rem) - var(--_bar-height) - var(--_gap));
	}
	/* Closing, the results roll up into the bar. */
	.np-search-docked.np-search-leaving .np-search-results {
		height: 0;
		min-height: 0;
	}
	.np-search-contained.np-search-docked .np-search-results {
		border-radius: var(--np-search-results-shape, var(--np-shape-corner-medium));
		background-color: var(--np-search-container-color, var(--np-color-surface-container-high));
	}

	.np-search-divided .np-search-bar {
		box-shadow: inset 0 -1px transparent;
	}
	/* Open, the bar gives way to the container and draws the divider. Docked without results, the
	   container is as round as the bar, so the bar keeps its own look. */
	.np-search-divided.np-search-expanded:not(.np-search-docked.np-search-empty) .np-search-bar {
		border-radius: 0;
		background-color: transparent;
		box-shadow: inset 0 -1px var(--np-search-divider-color, var(--np-color-outline));
	}
	.np-search-divided.np-search-docked.np-search-open {
		--_gap: 0px;
	}
	.np-search-divided.np-search-docked.np-search-open .np-search-container {
		border-radius: var(--np-search-results-shape, var(--np-shape-corner-extra-large));
		background-color: var(--np-search-container-color, var(--np-color-surface-container-high));
	}
	.np-search-divided.np-search-docked.np-search-open .np-search-results {
		border-end-start-radius: inherit;
		border-end-end-radius: inherit;
	}

	.np-search-full-screen.np-search-open {
		position: fixed;
		inset: 0;
		z-index: var(--np-search-z-index, 24);
		padding-block-start: var(--_pane-margin);
		background-color: var(--np-search-view-background-color, var(--np-color-surface-container-low));
	}
	.np-search-full-screen.np-search-leaving {
		pointer-events: none;
	}
	.np-search-full-screen.np-search-open .np-search-container {
		flex: 1;
		max-width: none;
	}
	.np-search-full-screen.np-search-open .np-search-results {
		flex: 1;
		max-height: none;
	}
	.np-search-divided.np-search-full-screen.np-search-open {
		padding: 0;
		background-color: var(--np-search-container-color, var(--np-color-surface-container-high));
	}
	.np-search-divided.np-search-full-screen.np-search-open .np-search-bar {
		height: 4.5rem;
	}

	@media (prefers-reduced-motion: no-preference) {
		@starting-style {
			.np-search-full-screen.np-search-expanded,
			.np-search-divided.np-search-full-screen.np-search-expanded {
				padding-block-start: 0;
				padding-inline: var(--np-search-pane-margin, 1.5rem);
			}
		}
	}
</style>
