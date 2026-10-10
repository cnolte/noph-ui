<script lang="ts">
	import '#lib/internal/exit.css'
	import { exitAnimation } from '#lib/animation.js'
	import CloseIcon from '#lib/icons/CloseIcon.svelte'
	import { arrowKeyNav, focusableItems, rovingTabindex, typeahead } from '#lib/keyboard-nav.js'
	import { popoverController, syncOpenEffect } from '#lib/popover.svelte.js'
	import Fab from './Fab.svelte'
	import type { FabMenuProps } from './types.js'

	let {
		label = 'Actions',
		icon,
		closeIcon,
		children,
		variant = 'primary-container',
		size = 's',
		placement = 'block-start',
		open = $bindable(false),
		element = $bindable(),
		...attributes
	}: FabMenuProps = $props()

	const uid = $props.id()
	const menuId = `np-fab-menu-${uid}`
	const anchorName = `--np-fab-menu-${uid}`

	let menuElement: HTMLDivElement | undefined = $state()

	let colorSet = $derived(variant.replace('-container', '') as 'primary' | 'secondary' | 'tertiary')

	const ITEMS = 'button, a[href], [role="menuitem"]'
	const attach = rovingTabindex(ITEMS)
	let arrowHandler = $derived(
		arrowKeyNav(ITEMS, placement.startsWith('inline') ? 'horizontal' : 'vertical'),
	)
	const typeaheadHandler = typeahead(
		ITEMS,
		(item) => (item.querySelector('.children-wrapper') ?? item).textContent ?? '',
	)

	const controller = popoverController(() => menuElement)

	export const show = () => controller.show()

	export const close = () => controller.close()

	const openWithArrow = (event: KeyboardEvent) => {
		if (!menuElement || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return
		event.preventDefault()
		show()
		focusableItems(menuElement, ITEMS)
			.at(event.key === 'ArrowDown' ? 0 : -1)
			?.focus()
	}

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
	class={[
		'np-fab-menu',
		`np-fab-menu-${placement}`,
		`np-fab-menu-${size}`,
		`np-fab-menu-set-${colorSet}`,
		attributes.class,
	]}
>
	<Fab
		variant={open ? colorSet : variant}
		size={open ? 's' : size}
		shape={open ? 'round' : undefined}
		{label}
		command="toggle-popover"
		commandfor={menuId}
		aria-haspopup="menu"
		aria-expanded={open}
		class="np-fab-menu-trigger"
		icon={triggerIcon}
		onkeydown={openWithArrow}
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
		{@attach exitAnimation}
		onkeydown={(event) => {
			arrowHandler(event)
			if (!event.defaultPrevented) typeaheadHandler(event)
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
		width: var(--_size);
		height: var(--_size);
	}
	.np-fab-menu-s {
		--_size: 3.5rem;
	}
	.np-fab-menu-m {
		--_size: 5rem;
	}
	.np-fab-menu-l {
		--_size: 6rem;
	}
	.np-fab-menu > :global(.np-fab.np-fab-menu-trigger) {
		position: absolute;
		inset-block-start: 0;
		inset-inline-end: 0;
	}

	.np-fab-menu-set-primary {
		--np-tonal-button-container-color: var(--np-color-primary-container);
		--np-tonal-button-label-text-color: var(--np-color-on-primary-container);
	}
	.np-fab-menu-set-secondary {
		--np-tonal-button-container-color: var(--np-color-secondary-container);
		--np-tonal-button-label-text-color: var(--np-color-on-secondary-container);
	}
	.np-fab-menu-set-tertiary {
		--np-tonal-button-container-color: var(--np-color-tertiary-container);
		--np-tonal-button-label-text-color: var(--np-color-on-tertiary-container);
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
		box-sizing: border-box;
		max-height: 100%;
		margin: 0;
		padding: 0.5rem;
		border: none;
		background: none;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.25rem;
		overflow: auto;
		scrollbar-width: none;
	}

	.np-fab-menu-list:popover-open {
		display: flex;
	}
	.np-fab-menu-list {
		--np-exit-display: flex;
	}
	.np-fab-menu-list > :global(:focus-visible) {
		z-index: 1;
	}

	.np-fab-menu-block-start .np-fab-menu-list {
		position-area: block-start span-inline-start;
	}
	.np-fab-menu-block-end .np-fab-menu-list {
		position-area: block-end span-inline-start;
	}
	.np-fab-menu-inline-start .np-fab-menu-list {
		position-area: inline-start;
	}
	.np-fab-menu-inline-end .np-fab-menu-list {
		position-area: inline-end;
	}
	:is(.np-fab-menu-block-start, .np-fab-menu-block-end) .np-fab-menu-list {
		margin-inline-end: -0.5rem;
	}
	:is(.np-fab-menu-inline-start, .np-fab-menu-inline-end) .np-fab-menu-list {
		flex-direction: row;
		align-items: center;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-fab-menu-list {
			opacity: 0;
			transition:
				opacity var(--np-motion-expressive-fast-effects),
				display var(--np-motion-expressive-fast-effects) allow-discrete,
				overlay var(--np-motion-expressive-fast-effects) allow-discrete;
		}
		.np-fab-menu-list:popover-open {
			opacity: 1;
		}
		.np-fab-menu-list:popover-open > :global(*) {
			--_stagger-window: 210ms;
			--_delay: calc((sibling-index() - 1) / sibling-count() * var(--_stagger-window));
			animation: np-fab-menu-item-in var(--np-motion-expressive-default-spatial) both;
			animation-delay: var(--_delay);
		}
		.np-fab-menu-list:popover-open > :global(:focus-visible) {
			animation:
				np-fab-menu-item-in var(--np-motion-expressive-default-spatial) both,
				focusAnimation var(--np-motion-expressive-slow-effects) forwards;
			animation-delay: var(--_delay), 0s;
		}
		:is(.np-fab-menu-block-start, .np-fab-menu-inline-start)
			.np-fab-menu-list:popover-open
			> :global(*) {
			--_delay: calc(
				(sibling-count() - sibling-index()) / sibling-count() * var(--_stagger-window)
			);
		}
	}

	@keyframes np-fab-menu-item-in {
		from {
			opacity: 0;
			translate: 0 0.5rem;
		}
	}
</style>
