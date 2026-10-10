<script lang="ts">
	import '#lib/internal/exit.css'
	import { exitAnimation } from '#lib/animation.js'
	import { arrowKeyNav, focusableItems, rovingTabindex } from '#lib/keyboard-nav.js'
	import { syncOpenEffect } from '#lib/popover.svelte.js'
	import type { NavigationDrawerProps } from './types.js'

	let {
		modal = false,
		backdrop = true,
		open = $bindable(),
		headline,
		element = $bindable(),
		direction,
		children,
		onkeydown: userKeydown,
		ontoggle,
		...attributes
	}: NavigationDrawerProps = $props()

	const uid = $props.id()
	const ITEMS = '.np-navigation-drawer-item'
	const attach = rovingTabindex(ITEMS)
	const arrowHandler = arrowKeyNav(ITEMS)

	const handleKeydown = (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		userKeydown?.(event)
		if (!event.defaultPrevented) arrowHandler(event)
	}

	const asDialog = () => (element instanceof HTMLDialogElement ? element : undefined)

	export const show = () => {
		const dialog = asDialog()
		if (dialog && !dialog.open) dialog.showModal()
	}

	export const close = () => {
		asDialog()?.close()
	}

	syncOpenEffect(
		() => (modal ? element : undefined),
		() => open,
		show,
		close,
	)

	// The headline names the navigation unless the drawer is named otherwise.
	let headlineId = $derived(headline ? `${uid}-headline` : undefined)
	let labelledBy = $derived(
		attributes['aria-labelledby'] ?? (attributes['aria-label'] ? undefined : headlineId),
	)
</script>

{#snippet content()}
	<div class="np-navigation-drawer">
		{#if headline}
			<div id={headlineId} class="np-navigation-drawer-headline">{headline}</div>
		{/if}
		{@render children?.()}
	</div>
{/snippet}

{#if modal}
	<dialog
		{...attributes}
		{@attach attach}
		bind:this={element}
		tabindex="-1"
		aria-label={null}
		aria-labelledby={null}
		closedby="any"
		style:--_hidden={direction && (direction === 'ltr' ? 'translateX(-100%)' : 'translateX(100%)')}
		class={[
			'np-navigation-drawer-container',
			'np-navigation-drawer-container-modal',
			backdrop && 'np-navigation-drawer-backdrop np-exit-scrim',
			attributes.class,
		]}
		{@attach exitAnimation}
		onkeydown={handleKeydown}
		ontoggle={(event) => {
			open = event.newState === 'open'
			// Focus lands on the first destination, the first interactive element.
			if (open && element) focusableItems(element, ITEMS)[0]?.focus()
			ontoggle?.(event)
		}}
		onclick={(event) => {
			attributes.onclick?.(event)
			if (event.target === element) close()
		}}
	>
		<nav
			aria-label={attributes['aria-label']}
			aria-labelledby={labelledBy}
			class="np-navigation-wrapper np-navigation-drawer-shade"
		>
			{@render content()}
		</nav>
	</dialog>
{:else}
	<nav
		{...attributes}
		{@attach attach}
		bind:this={element}
		aria-labelledby={labelledBy}
		class={[
			'np-navigation-drawer-container',
			open === false && 'np-navigation-drawer-closed',
			attributes.class,
		]}
		onkeydown={handleKeydown}
	>
		<div class="np-navigation-wrapper">
			{@render content()}
		</div>
	</nav>
{/if}

<style>
	.np-navigation-drawer-container {
		color: var(--np-color-on-surface-variant);
		width: var(--np-navigation-drawer-width, 22.5rem);
		border: 0;
		outline: none;
		margin: 0;
		padding: 0;
		background-color: transparent;
		max-width: none;
		max-height: none;
	}

	.np-navigation-drawer-container-modal {
		--_hidden: translateX(-100%);
		position: fixed;
		inset-block: 0;
		height: 100dvh;
		overflow: visible;
	}
	.np-navigation-drawer-container-modal:dir(rtl) {
		--_hidden: translateX(100%);
	}
	.np-navigation-drawer-container-modal:not([open]) {
		display: none;
	}

	.np-navigation-wrapper {
		background-color: var(--np-navigation-drawer-background, var(--np-color-surface-container-low));
		border-start-end-radius: var(--np-shape-corner-large);
		border-end-end-radius: var(--np-shape-corner-large);
		width: var(--np-navigation-drawer-width, 22.5rem);
		height: var(--np-navigation-drawer-height, 100dvh);
		overflow-y: auto;
		scrollbar-width: thin;
		display: block;
	}

	.np-navigation-drawer-container-modal .np-navigation-wrapper {
		transform: var(--_hidden);
	}
	.np-navigation-drawer-container-modal[open] .np-navigation-wrapper {
		transform: translateX(0);
	}

	/* It moves like the modal navigation rail: it springs open and slides back without the spring. */
	@media (prefers-reduced-motion: no-preference) {
		.np-navigation-drawer-container-modal .np-navigation-wrapper {
			--_motion: var(--np-motion-standard-fast-spatial);
			transition: transform var(--_motion);
			/* Its colour carries on past the window's edge, so the spring shows no gap there. */
			box-shadow:
				var(--_bleed) 0 0 0
					var(--np-navigation-drawer-background, var(--np-color-surface-container-low)),
				var(--np-elevation-1);
		}
		.np-navigation-drawer-container-modal {
			--_bleed: -2rem;
			transition:
				overlay var(--np-motion-standard-fast-spatial) allow-discrete,
				display var(--np-motion-standard-fast-spatial) allow-discrete;
		}
		.np-navigation-drawer-container-modal:dir(rtl) {
			--_bleed: 2rem;
		}
		.np-navigation-drawer-container-modal[open] .np-navigation-wrapper {
			--_motion: var(--np-motion-expressive-default-spatial);
			@starting-style {
				transform: var(--_hidden);
			}
		}
	}

	.np-navigation-drawer {
		display: flex;
		padding: var(--np-navigation-drawer-padding, 0.75rem);
		flex-direction: column;
	}
	/* The headline sits like a 56dp row, its text in line with the labels below. */
	.np-navigation-drawer-headline {
		display: flex;
		align-items: center;
		min-height: 3.5rem;
		padding-inline: 1rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		letter-spacing: 0.006rem;
		color: var(--np-color-on-surface-variant);
	}

	/* A dismissible standard drawer slides out to the start and gives its space back. */
	.np-navigation-drawer-container:not(.np-navigation-drawer-container-modal) {
		--_hidden: translateX(-100%);
		overflow: hidden;
	}
	.np-navigation-drawer-container:not(.np-navigation-drawer-container-modal):dir(rtl) {
		--_hidden: translateX(100%);
	}
	.np-navigation-drawer-closed {
		width: 0;
		visibility: hidden;
	}
	.np-navigation-drawer-closed .np-navigation-wrapper {
		transform: var(--_hidden);
	}
	@media (prefers-reduced-motion: no-preference) {
		/* visibility stays visible for as long as either end is, so it hides only once the drawer
		   has slid out. */
		.np-navigation-drawer-container:not(.np-navigation-drawer-container-modal) {
			transition:
				width var(--np-motion-standard-slow-spatial),
				visibility var(--np-motion-standard-slow-spatial);
		}
		.np-navigation-drawer-container:not(.np-navigation-drawer-container-modal)
			.np-navigation-wrapper {
			transition: transform var(--np-motion-standard-slow-spatial);
		}
	}
	.np-navigation-drawer-shade {
		box-shadow: var(--np-elevation-1);
	}

	.np-navigation-drawer-container-modal::backdrop {
		background-color: transparent;
	}
	.np-navigation-drawer-backdrop::backdrop {
		background-color: var(--np-color-scrim);
		opacity: 0;
	}
	.np-navigation-drawer-backdrop[open]::backdrop {
		opacity: 0.32;
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-navigation-drawer-backdrop::backdrop {
			transition:
				opacity var(--np-motion-expressive-slow-effects),
				overlay var(--np-motion-expressive-slow-effects) allow-discrete,
				display var(--np-motion-expressive-slow-effects) allow-discrete;
		}
		.np-navigation-drawer-backdrop[open]::backdrop {
			@starting-style {
				opacity: 0;
			}
		}
	}
</style>
