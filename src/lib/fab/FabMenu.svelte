<script lang="ts">
	import { reducedMotion } from '#lib/media.js'
	import CloseIcon from '#lib/icons/CloseIcon.svelte'
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import { popoverController, syncOpenEffect } from '#lib/popover.svelte.js'
	import { PRESS_DURATION } from '#lib/press.svelte.js'
	import { onMount } from 'svelte'
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
	const anchorName = `--np-fab-menu-${uid}`

	let menuElement: HTMLDivElement | undefined = $state()

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

	.np-fab-menu-list:popover-open {
		display: flex;
	}

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
