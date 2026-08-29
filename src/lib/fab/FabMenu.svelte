<script lang="ts">
	import CloseIcon from '#lib/icons/CloseIcon.svelte'
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import { popoverController, syncOpenEffect } from '#lib/popover.svelte.js'
	import { PRESS_DURATION } from '#lib/press.svelte.js'
	import { onMount } from 'svelte'
	import { MediaQuery } from 'svelte/reactivity'
	import Fab from './Fab.svelte'
	import type { FabMenuProps } from './types.ts'

	let {
		label = 'Actions',
		icon,
		closeIcon,
		children,
		variant = 'primary-container',
		size = 's',
		placement = 'block-start',
		closeOnSelect = true,
		open = $bindable(false),
		element = $bindable(),
		...attributes
	}: FabMenuProps = $props()

	const uid = $props.id()
	const menuId = `np-fab-menu-${uid}`
	/*
	 * One anchor name per instance. A fixed name in the stylesheet is shared by every FabMenu on
	 * the page, and a duplicated anchor name resolves to the last one in tree order, so every menu
	 * would open on the last trigger.
	 */
	const anchorName = `--np-fab-menu-${uid}`

	let menuElement: HTMLDivElement | undefined = $state()
	const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)', false)

	// Declaring `role="menu"` means owing the keyboard model that goes with it: one tab stop, the
	// arrows moving between actions. The same attachments the toolbar and the bars use.
	const ITEMS = 'button, a[href], [role="menuitem"]'
	const attach = rovingTabindex(ITEMS)
	const arrowHandler = $derived(
		arrowKeyNav(ITEMS, placement.startsWith('inline') ? 'horizontal' : 'vertical'),
	)

	const controller = popoverController(() => menuElement)

	export const show = () => controller.show()

	export const close = () => {
		clearTimeout(closeTimeout)
		controller.close()
	}

	/*
	 * An item runs its own press animation on click, the corner morph a Button or a FAB does. The
	 * menu is a popover, so closing it means `display: none`, which would cut that off before a
	 * frame of it is seen. Holding the close for the length of the press lets the item finish.
	 * Matched to Button's own timer, and skipped entirely when there is no animation to wait for.
	 */
	let closeTimeout: ReturnType<typeof setTimeout>

	const closeAfterPress = () => {
		if (reducedMotion.current) {
			close()
			return
		}
		clearTimeout(closeTimeout)
		closeTimeout = setTimeout(close, PRESS_DURATION)
	}

	onMount(() => {
		return () => {
			clearTimeout(closeTimeout)
		}
	})

	syncOpenEffect(
		() => menuElement,
		() => open,
		show,
		close,
	)
</script>

<!--
	Both icons stay mounted and turn into each other. Swapping one for the other cannot animate:
	the icon arriving has no previous state to move from, so it can only appear.
-->
{#snippet triggerIcon()}
	<span class="np-fab-menu-icons" aria-hidden="true">
		<span class="np-fab-menu-icon" class:np-fab-menu-icon-away={open}>
			{#if icon}{@render icon()}{/if}
		</span>
		<span class="np-fab-menu-icon" class:np-fab-menu-icon-away={!open}>
			{#if closeIcon}{@render closeIcon()}{:else}<CloseIcon />{/if}
		</span>
	</span>
{/snippet}

<div
	{...attributes}
	bind:this={element}
	style="anchor-name: {anchorName}; {attributes.style ?? ''}"
	class={['np-fab-menu', `np-fab-menu-${placement}`, attributes.class]}
>
	<!--
		The tooltip is dropped while the menu is open, and the name given directly instead. A
		tooltip is a `hint` popover, which the browser closes when the menu's `auto` popover opens,
		and the trigger still holds interest at that point, so it would come straight back and sit
		over the open menu. There is nothing to hint at anyway once the actions are on screen.
	-->
	<Fab
		{variant}
		{size}
		{label}
		shape={open ? 'square' : 'round'}
		command="toggle-popover"
		commandfor={menuId}
		aria-haspopup="menu"
		aria-expanded={open}
		class="np-fab-menu-trigger"
		icon={triggerIcon}
	/>

	<div
		bind:this={menuElement}
		id={menuId}
		style="position-anchor: {anchorName}"
		popover="auto"
		role="menu"
		tabindex="-1"
		aria-label={label}
		class="np-fab-menu-list"
		{@attach attach}
		onkeydown={arrowHandler}
		onclick={(event) => {
			// Picking an action closes the menu. `closeOnSelect={false}` keeps it open for a menu
			// whose items toggle something instead of navigating away.
			if (!closeOnSelect) return
			const target = event.target as HTMLElement
			if (target.closest(ITEMS)) closeAfterPress()
		}}
		ontoggle={(event) => {
			open = event.newState === 'open'
		}}
	>
		{@render children?.()}
	</div>
</div>

<style>
	.np-fab-menu {
		position: relative;
		display: inline-flex;
	}

	/* One grid cell holds both icons, so they sit on top of each other rather than side by side. */
	.np-fab-menu-icons {
		display: grid;
	}
	.np-fab-menu-icon {
		grid-area: 1 / 1;
		display: flex;
	}
	.np-fab-menu-icon-away {
		opacity: 0;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-fab-menu-icon {
			transition:
				opacity var(--np-motion-expressive-fast-effects),
				rotate var(--np-motion-expressive-default-spatial);
		}
		/*
		 * Both turn the same way, so the pair reads as one icon rotating rather than two crossing
		 * over. The close icon spends its hidden time at -45deg, where an X sits square like the
		 * plus it replaces, so opening rotates the plus away and the X into place behind it.
		 */
		.np-fab-menu-icon-away {
			rotate: -45deg;
		}
	}

	.np-fab-menu-list {
		position: absolute;
		margin: 0;
		padding: 0;
		border: none;
		background: none;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.5rem;
		overflow: visible;
	}

	/*
	 * `display` only while open. Setting it on the base rule would beat the user agent's
	 * `display: none` for a closed popover, because author styles win over user agent styles
	 * whatever the specificity, leaving an invisible sheet over the page that swallows clicks.
	 */
	.np-fab-menu-list:popover-open {
		display: flex;
	}

	/* Which side the items fan out to, and which end they stack from. */
	.np-fab-menu-block-start .np-fab-menu-list {
		position-area: block-start;
		margin-block-end: 0.75rem;
		flex-direction: column-reverse;
	}
	.np-fab-menu-block-end .np-fab-menu-list {
		position-area: block-end;
		margin-block-start: 0.75rem;
	}
	.np-fab-menu-inline-start .np-fab-menu-list {
		position-area: inline-start;
		margin-inline-end: 0.75rem;
		flex-direction: row-reverse;
		align-items: center;
	}
	.np-fab-menu-inline-end .np-fab-menu-list {
		position-area: inline-end;
		margin-inline-start: 0.75rem;
		flex-direction: row;
		align-items: center;
	}

	/*
	 * The items rise into place one after another. Keyframes rather than a transition: a popover
	 * goes from `display: none` to shown in one step, and a transition has no start value to run
	 * from, so the items would simply appear. An animation runs when the element becomes displayed.
	 *
	 * The whole stagger fits one window, `--_stagger-window`, however many actions there are. That
	 * is what `sibling-count()` buys over a fixed step: eight actions land in the same time two do,
	 * each one just following the last a little sooner, rather than the menu taking four times as
	 * long to finish arriving. Item one starts at 0ms, so the action nearest the trigger moves
	 * first, and the last one starts as the window closes.
	 */
	@media (prefers-reduced-motion: no-preference) {
		.np-fab-menu-list:popover-open > :global(*) {
			--_stagger-window: 210ms;
			--_delay: calc((sibling-index() - 1) / sibling-count() * var(--_stagger-window));
			animation: np-fab-menu-item-in var(--np-motion-expressive-default-spatial) both;
			animation-delay: var(--_delay);
		}
	}

	@keyframes np-fab-menu-item-in {
		from {
			opacity: 0;
			translate: 0 0.5rem;
		}
	}
</style>
