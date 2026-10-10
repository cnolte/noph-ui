<script lang="ts">
	import { motionOf } from '#lib/animation.js'
	import IconButton from '#lib/button/IconButton.svelte'
	import MenuIcon from '#lib/icons/MenuIcon.svelte'
	import MenuOpenIcon from '#lib/icons/MenuOpenIcon.svelte'
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import { reducedMotion } from '#lib/media.js'
	import { flushSync, tick, untrack } from 'svelte'
	import { setNavigationRailContext } from './context.js'
	import { cancel, morph, resize } from './morph.js'
	import type { NavigationRailProps } from './types.js'

	let {
		children,
		expanded = $bindable(false),
		modal = false,
		hideWhenCollapsed = false,
		menu = false,
		menuLabel = 'Menu',
		alignment = 'top',
		fab,
		element = $bindable(),
		onkeydown: userKeydown,
		...attributes
	}: NavigationRailProps = $props()

	const uid = $props.id()
	let railId = $derived(attributes.id ?? `np-navigation-rail-${uid}`)

	// `expanded` is what was asked for. The layout the items show follows it through an animation:
	// the modal rail opens collapsed and morphs to expanded, and morphs back before it closes.
	let layoutExpanded = $state(untrack(() => expanded && !modal))
	let dialogOpen = $state(false)
	let inlineHidden = $state(untrack(() => hideWhenCollapsed && (!expanded || modal)))
	let closing = $derived(dialogOpen && !expanded)
	// Where the modal rail opens: right over the collapsed rail, so it grows out of it, measured as
	// it opens. Hidden when collapsed, it has nothing to grow out of and opens from the window's edge.
	// (Measured rather than anchor positioned: Safari flickers when an anchored element in the top
	// layer changes size every frame.)
	let anchor: string | undefined = $state()
	let fromRail = $derived(anchor !== undefined)

	const measureRail = () => {
		if (inlineHidden || !element) return undefined
		const rect = element.getBoundingClientRect()
		const rtl = getComputedStyle(element).direction === 'rtl'
		const start = rtl ? document.documentElement.clientWidth - rect.right : rect.left
		return `inset-block: ${rect.top}px auto; inset-inline-start: ${start}px; block-size: ${rect.height}px`
	}

	let dialog: HTMLDialogElement | undefined = $state()
	let modalRail: HTMLElement | undefined = $state()

	setNavigationRailContext({
		get expanded() {
			return layoutExpanded
		},
	})

	const attach = rovingTabindex('.np-navigation-action')
	const arrowHandler = arrowKeyNav('.np-navigation-action')

	const handleKeydown = (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		userKeydown?.(event)
		if (!event.defaultPrevented) arrowHandler(event)
	}

	const timing = (rail: HTMLElement) => motionOf(rail, '--np-motion-standard-fast-spatial')
	// The modal sheet opens on a springier curve than its items and settles a moment after them.
	const sheetTiming = (rail: HTMLElement) =>
		motionOf(rail, '--np-motion-expressive-default-spatial')
	// A colour has no place to spring to, so it changes on an effects curve.
	const colorTiming = (rail: HTMLElement) => motionOf(rail, '--np-motion-standard-slow-effects')

	// Applied at once, not on a later frame: a frame painted between the new layout and the start
	// of its animation would flash the end state.
	const setLayout = (next: boolean) => {
		layoutExpanded = next
		flushSync()
	}

	const toggleInline = async (next: boolean) => {
		const rail = element
		if (!rail || reducedMotion.current) {
			inlineHidden = hideWhenCollapsed && !next
			layoutExpanded = next
			return
		}
		if (!hideWhenCollapsed) {
			await morph(rail, () => setLayout(next), timing(rail))
			return
		}
		if (next) {
			inlineHidden = false
			setLayout(true)
			await resize(rail, true, timing(rail))
			return
		}
		await resize(rail, false, timing(rail))
		if (!expanded) {
			inlineHidden = true
			layoutExpanded = false
			await tick()
		}
		cancel([rail])
	}

	// Opening, the modal rail grows out of the collapsed rail and takes on its own container colour;
	// closing, it shrinks back into it. Without a collapsed rail it grows from and shrinks to nothing.
	const animateModal = async (rail: HTMLElement, opening: boolean) => {
		const own = opening ? sheetTiming(rail) : timing(rail)
		if (!fromRail) {
			await resize(rail, opening, own)
			return
		}
		// morph cancels what runs on the rail, so the colour starts after it.
		const done = morph(rail, () => setLayout(opening), timing(rail), own)
		const colors = [
			getComputedStyle(element!).backgroundColor,
			getComputedStyle(rail).backgroundColor,
		]
		rail.animate(
			[{ backgroundColor: colors[opening ? 0 : 1] }, { backgroundColor: colors[opening ? 1 : 0] }],
			{ ...colorTiming(rail), fill: opening ? 'none' : 'forwards' },
		)
		await done
	}

	const openModal = async () => {
		anchor = measureRail()
		layoutExpanded = !fromRail
		dialogOpen = true
		flushSync()
		if (dialog && !dialog.open) dialog.showModal()
		if (!modalRail || reducedMotion.current) {
			layoutExpanded = true
			return
		}
		await animateModal(modalRail, true)
	}

	const closeModal = async () => {
		if (!dialogOpen) return
		if (modalRail && !reducedMotion.current) await animateModal(modalRail, false)
		if (expanded) {
			cancel([modalRail ?? null])
			return
		}
		const hadFocus = dialog?.contains(document.activeElement) ?? false
		dialog?.close()
		dialogOpen = false
		layoutExpanded = false
		// The collapsed rail's menu button was rendered anew, so focus goes back to it by hand.
		if (hadFocus) {
			await tick()
			element?.querySelector<HTMLElement>('.np-navigation-rail-menu button')?.focus()
		}
	}

	// The first run only acts on a modal rail that starts expanded; the rest is set up already.
	let shown = untrack(() => expanded && !modal)
	$effect(() => {
		const next = expanded
		if (next === shown) return
		shown = next
		// Out of the effect, so the layout can be flushed synchronously.
		queueMicrotask(() => {
			if (modal) {
				if (next) openModal()
				else closeModal()
			} else {
				toggleInline(next)
			}
		})
	})
</script>

{#snippet content(controls: string)}
	{#if menu || fab}
		<div class="np-navigation-rail-header">
			{#if menu}
				<div class="np-navigation-rail-menu">
					<IconButton
						aria-label={menuLabel}
						aria-expanded={expanded}
						aria-controls={controls}
						onclick={() => (expanded = !expanded)}
					>
						<span class="np-navigation-rail-menu-icons">
							<span class={['np-navigation-rail-menu-icon', expanded && 'np-away']}>
								<MenuIcon />
							</span>
							<span
								class={[
									'np-navigation-rail-menu-icon',
									'np-navigation-rail-menu-open-icon',
									!expanded && 'np-away',
								]}
							>
								<MenuOpenIcon />
							</span>
						</span>
					</IconButton>
				</div>
			{/if}
			{#if fab}
				<div class="np-navigation-rail-fab">{@render fab({ expanded: layoutExpanded })}</div>
			{/if}
		</div>
	{/if}
	<div class="np-navigation-rail-items">
		{@render children?.()}
	</div>
{/snippet}

<nav
	{...attributes}
	{@attach attach}
	bind:this={element}
	id={railId}
	hidden={inlineHidden}
	class={[
		'np-navigation-rail',
		layoutExpanded && !dialogOpen && 'np-navigation-rail-expanded',
		alignment === 'center' && 'np-navigation-rail-center',
		attributes.class,
	]}
	onkeydown={handleKeydown}
>
	{#if !dialogOpen}
		{@render content(railId)}
	{/if}
</nav>

{#if modal}
	<dialog
		bind:this={dialog}
		id="{railId}-modal"
		class={['np-navigation-rail-dialog', closing && 'np-closing']}
		style={anchor}
		aria-label={attributes['aria-label']}
		oncancel={(event) => {
			event.preventDefault()
			expanded = false
		}}
		onclose={() => {
			dialogOpen = false
			expanded = false
		}}
		onkeydown={handleKeydown}
		onclick={(event) => {
			// A click on the dialog itself is a click on the scrim.
			if (event.target === event.currentTarget) expanded = false
		}}
	>
		{#if dialogOpen}
			<nav
				{@attach attach}
				bind:this={modalRail}
				aria-label={attributes['aria-label']}
				class={[
					'np-navigation-rail',
					'np-navigation-rail-modal',
					layoutExpanded && 'np-navigation-rail-expanded',
					alignment === 'center' && 'np-navigation-rail-center',
				]}
			>
				{@render content(`${railId}-modal`)}
			</nav>
		{/if}
	</dialog>
{/if}

<style>
	/* Collapsed and expanded share their insets: the menu icon sits 36px in, the FAB and the
	   active indicators 20px, so switching between them only changes the width. */
	.np-navigation-rail {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		width: 6rem;
		padding-block: 2.75rem 0.5rem;
		overflow-x: hidden;
		overflow-y: auto;
		z-index: 8;
		background-color: var(--np-navigation-rail-container-color, var(--np-color-surface));
	}
	.np-navigation-rail[hidden] {
		display: none;
	}
	.np-navigation-rail-expanded {
		width: max-content;
		min-width: 13.75rem;
		max-width: 22.5rem;
	}

	.np-navigation-rail-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.25rem;
		padding-inline: 1.25rem;
		margin-block-end: 2.5rem;
	}
	.np-navigation-rail-menu {
		display: flex;
		align-items: center;
		height: 3.5rem;
		margin-inline-start: 0.5rem;
	}
	/* The menu icon turns half a circle while it swaps, as the rail morphs. */
	.np-navigation-rail-menu-icons {
		display: grid;
	}
	.np-navigation-rail-menu-icon {
		grid-area: 1 / 1;
		display: flex;
	}
	.np-navigation-rail-menu-icon.np-away {
		opacity: 0;
		rotate: 90deg;
	}
	.np-navigation-rail-menu-open-icon.np-away {
		rotate: -90deg;
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-navigation-rail-menu-icon {
			transition:
				rotate var(--np-motion-standard-fast-spatial),
				opacity var(--np-motion-standard-fast-effects);
		}
	}

	.np-navigation-rail-fab {
		display: flex;
		/* An extended FAB grows and shrinks in step with the rail. */
		--np-fab-motion-spatial: var(--np-motion-standard-fast-spatial);
		/* A FAB nested in the rail rests at elevation level 0. */
		--np-fab-elevation: none;
	}

	.np-navigation-rail-items {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.np-navigation-rail-expanded .np-navigation-rail-items {
		gap: 0;
	}
	.np-navigation-rail-center .np-navigation-rail-items {
		flex: 1;
		justify-content: center;
	}

	/* The modal rail lies over the content along the leading edge, behind a scrim. */
	.np-navigation-rail-dialog {
		position: fixed;
		inset-block: 0;
		inset-inline: 0 auto;
		width: auto;
		max-width: none;
		height: 100%;
		max-height: none;
		margin: 0;
		padding: 0;
		border: 0;
		background: none;
		color: inherit;
		overflow: visible;
	}
	.np-navigation-rail-dialog[open] {
		display: flex;
	}
	.np-navigation-rail-dialog::backdrop {
		background-color: var(--np-color-scrim);
		opacity: 0.32;
	}
	.np-navigation-rail-modal {
		height: 100%;
		background-color: var(
			--np-navigation-rail-modal-container-color,
			var(--np-color-surface-container)
		);
		border-start-end-radius: var(
			--np-navigation-rail-modal-container-shape,
			var(--np-shape-corner-large)
		);
		border-end-end-radius: var(
			--np-navigation-rail-modal-container-shape,
			var(--np-shape-corner-large)
		);
	}
	.np-navigation-rail-dialog.np-closing::backdrop {
		opacity: 0;
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-navigation-rail-dialog::backdrop {
			transition: opacity var(--np-motion-expressive-slow-effects);
			@starting-style {
				opacity: 0;
			}
		}
	}
</style>
