<script lang="ts">
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import { syncOpenEffect } from '#lib/popover.svelte.js'
	import type { NavigationDrawerProps } from './types.ts'

	let {
		modal = false,
		backdrop = false,
		open = $bindable(false),
		element = $bindable(),
		direction = 'ltr',
		children,
		onkeydown: userKeydown,
		ontoggle,
		...attributes
	}: NavigationDrawerProps = $props()

	const attach = rovingTabindex('.np-navigation-drawer-item')
	const arrowHandler = arrowKeyNav('.np-navigation-drawer-item')

	const handleKeydown = (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		userKeydown?.(event)
		if (!event.defaultPrevented) arrowHandler(event)
	}

	/* Only a modal drawer is a dialog; a standard one is a nav that is always in the layout. */
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

	const start = $derived(direction === 'ltr' ? 'translateX(-100%)' : 'translateX(100%)')
</script>

<!--
	A modal drawer is a `dialog` holding a nav landmark, so the browser keeps the page behind it
	inert for as long as it is open and hands focus back on close. `::backdrop` is the scrim and
	`closedby="any"` the tap-outside-to-close. Where `closedby` is unsupported the click handler
	below covers it: a click on the backdrop is reported against the dialog itself.
-->
{#if modal}
	<dialog
		{...attributes}
		{@attach attach}
		bind:this={element}
		tabindex="-1"
		aria-label={null}
		aria-labelledby={null}
		closedby="any"
		style="--np-navigation-drawer-start: {start}; {attributes.style ?? ''}"
		class={[
			'np-navigation-drawer-container',
			'np-navigation-drawer-container-modal',
			backdrop && 'np-navigation-drawer-backdrop',
			attributes.class,
		]}
		onkeydown={handleKeydown}
		ontoggle={(event) => {
			open = event.newState === 'open'
			/*
			 * Without this the browser autofocuses the first focusable descendant, the first nav
			 * item. Focus the drawer itself instead, so nothing is focused that the user didn't
			 * choose to interact with.
			 */
			if (event.newState === 'open') element?.focus()
			ontoggle?.(event)
		}}
		onclick={(event) => {
			attributes.onclick?.(event)
			if (event.target === element) close()
		}}
	>
		<!--
			The label belongs to the navigation landmark, not to the dialog wrapping it, so it is
			pulled back off the dialog above and put here. Everything else stays on the dialog: it
			is the container the layout and the custom properties are written against, and the
			element `commandfor` has to reach.
		-->
		<nav
			aria-label={attributes['aria-label']}
			aria-labelledby={attributes['aria-labelledby']}
			class="np-navigation-wrapper np-navigation-drawer-shade"
		>
			<div class="np-navigation-drawer">
				{@render children?.()}
			</div>
		</nav>
	</dialog>
{:else}
	<nav
		{...attributes}
		{@attach attach}
		bind:this={element}
		class={['np-navigation-drawer-container', attributes.class]}
		onkeydown={handleKeydown}
	>
		<div class="np-navigation-wrapper">
			<div class="np-navigation-drawer">
				{@render children?.()}
			</div>
		</div>
	</nav>
{/if}

<style>
	.np-navigation-drawer-container {
		color: var(--np-color-on-surface-variant);
		width: calc(var(--np-navigation-drawer-width, 22.5rem) + 3px);
		border: 0;
		/* Focus lands here on open only to stay off the first nav item, not as something to show. */
		outline: none;
		margin: 0;
		padding: 0;
		background-color: transparent;
		max-width: none;
		max-height: none;
	}

	/* The modal drawer is docked to the inline edge rather than centred as a dialog would be. */
	.np-navigation-drawer-container-modal {
		position: fixed;
		inset-block: 0;
		height: 100dvh;
		overflow: visible;
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
		transform: var(--np-navigation-drawer-start, translateX(-100%));
	}
	.np-navigation-drawer-container-modal[open] .np-navigation-wrapper {
		transform: translateX(0);
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-navigation-drawer-container-modal .np-navigation-wrapper {
			transition: transform var(--np-motion-standard-slow-spatial);
		}
		.np-navigation-drawer-container-modal {
			transition:
				overlay var(--np-motion-standard-slow-spatial) allow-discrete,
				display var(--np-motion-standard-slow-spatial) allow-discrete;
		}
		.np-navigation-drawer-container-modal[open] .np-navigation-wrapper {
			@starting-style {
				transform: var(--np-navigation-drawer-start, translateX(-100%));
			}
		}
	}

	.np-navigation-drawer {
		display: flex;
		padding: var(--np-navigation-drawer-padding, 1.25rem 0.75rem);
		flex-direction: column;
	}
	.np-navigation-drawer-shade {
		box-shadow: var(--np-elevation-1);
	}

	/* `backdrop` decides whether the scrim is painted; a modal dialog always has the layer. */
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
