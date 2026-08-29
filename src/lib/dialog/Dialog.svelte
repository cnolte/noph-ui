<script lang="ts">
	import Divider from '#lib/divider/Divider.svelte'
	import { syncOpenEffect } from '#lib/popover.svelte.js'
	import type { DialogProps } from './types.ts'

	let {
		element = $bindable(),
		open = $bindable(),
		quick = false,
		children,
		headline,
		icon,
		supportingText,
		actions,
		divider,
		ontoggle,
		'aria-labelledby': ariaLabelledby,
		...attributes
	}: DialogProps = $props()

	const uid = $props.id()

	/*
	 * A modal dialog can only be opened from script or from a `command` button; `<dialog open>` on
	 * its own is the non-modal kind, with no focus trap and no backdrop.
	 */
	export const show = () => {
		if (element && !element.open) element.showModal()
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
</script>

<!--
	A `dialog`, not a popover. `showModal()` keeps everything outside inert for as long as the dialog
	is open, including anything added to the page while it is open, and hands focus back on close.
	`::backdrop` is the scrim and `closedby="any"` the click-outside-to-close. Where `closedby` is
	unsupported the click handler below covers it: a click on the backdrop is reported against the
	dialog itself.
-->
<dialog
	bind:this={element}
	{...attributes}
	tabindex="-1"
	closedby="any"
	aria-labelledby={ariaLabelledby ?? (headline ? `${uid}-dialog-headline` : undefined)}
	aria-describedby={supportingText ? `${uid}-dialog-supporting-text` : undefined}
	class={['np-dialog-container', !quick && 'np-animate', attributes.class]}
	ontoggle={(event) => {
		open = event.newState === 'open'
		/*
		 * Without this the browser autofocuses the first focusable descendant, one of the actions,
		 * which can be a destructive one. Focus the dialog itself instead, so nothing is focused
		 * that the user didn't choose to interact with.
		 */
		if (event.newState === 'open') element?.focus()
		ontoggle?.(event)
	}}
	onclick={(event) => {
		attributes.onclick?.(event)
		if (event.target === element) close()
	}}
>
	<div class="np-dialog">
		{#if icon}
			<div class="np-dialog-icon">
				{@render icon()}
			</div>
		{/if}
		{#if headline}
			<h1
				id="{uid}-dialog-headline"
				class="np-dialog-headline"
				style={icon ? 'text-align: center' : ''}
			>
				{headline}
			</h1>
		{/if}
		{#if supportingText}
			<p id="{uid}-dialog-supporting-text" class="np-dialog-supporting-text">{supportingText}</p>
		{/if}
		{#if divider}
			<Divider style="margin-top: 1rem" --np-divider-color="var(--np-color-outline)" />
		{/if}
		{#if children}
			<div class="np-dialog-scroller">
				{@render children()}
			</div>
		{/if}
		{#if actions}
			<div class="np-dialog-actions">
				{@render actions()}
			</div>
		{/if}
	</div>
</dialog>

<style>
	.np-dialog-container {
		background: transparent;
		border: none;
		/* Focus lands here on open only to stay off the actions, not as something to show. */
		outline: none;
		margin: auto;
		padding: var(--np-dialog-inset, 2rem 1rem);
		box-sizing: border-box;
		min-width: var(--np-dialog-container-min-width, 19.5rem);
		width: var(--np-dialog-container-width, 37rem);
		max-width: 100%;
		max-height: none;
		overflow: visible;
		color: var(--np-color-on-surface);
	}
	/* A closed dialog is `display: none` from the user agent, which the enter transition needs. */
	.np-dialog-container:not([open]) {
		display: none;
	}
	/*
	 * The exit transition holds the dialog in the top layer after it has closed, where it would go on
	 * taking the clicks meant for the page behind it.
	 */
	.np-animate:not([open]) {
		pointer-events: none;
	}

	.np-dialog {
		border: 0;
		background-color: var(--np-dialog-container-color, var(--np-color-surface));
		color: var(--np-color-on-surface);
		padding: var(--np-dialog-padding, 1.5rem);
		border-radius: var(--np-dialog-container-shape, var(--np-shape-corner-extra-large));
		box-shadow: var(--np-dialog-elevation, var(--np-elevation-3));
		max-height: var(--np-dialog-max-height, calc(100dvh - 3rem));
		scrollbar-color: var(--np-color-on-surface-variant) transparent;
		scrollbar-width: thin;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.np-dialog-scroller {
		overflow-y: auto;
		display: flex;
		flex: 1 1 0%;
		flex-direction: column;
	}

	.np-dialog-container::backdrop {
		background-color: var(--np-color-scrim);
		opacity: 0.32;
	}

	.np-animate {
		transition:
			opacity var(--np-motion-expressive-slow-effects),
			display var(--np-motion-expressive-slow-effects) allow-discrete,
			overlay var(--np-motion-expressive-slow-effects) allow-discrete;
		opacity: 0;
	}
	.np-animate[open] {
		opacity: 1;
		@starting-style {
			opacity: 0;
		}
	}
	.np-animate::backdrop {
		transition:
			opacity var(--np-motion-expressive-slow-effects),
			display var(--np-motion-expressive-slow-effects) allow-discrete,
			overlay var(--np-motion-expressive-slow-effects) allow-discrete;
		opacity: 0;
	}
	.np-animate[open]::backdrop {
		opacity: 0.32;
		@starting-style {
			opacity: 0;
		}
	}

	.np-dialog-icon {
		color: var(--np-color-secondary);
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}
	.np-dialog-headline {
		margin: 0 0 1rem 0;
		padding: 0;
		line-height: 2rem;
		font-size: 1.5rem;
		font-weight: 400;
	}
	.np-dialog-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		box-sizing: border-box;
		margin-top: 1.5rem;
	}
	.np-dialog-supporting-text {
		margin: 0;
		padding: 0;
		line-height: 1.25rem;
		font-size: 0.875rem;
		font-weight: 400;
		color: var(--np-color-on-surface-variant);
	}
</style>
