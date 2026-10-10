<script lang="ts">
	import '#lib/internal/exit.css'
	import { exitAnimation } from '#lib/animation.js'
	import IconButton from '#lib/button/IconButton.svelte'
	import Divider from '#lib/divider/Divider.svelte'
	import CloseIcon from '#lib/icons/CloseIcon.svelte'
	import { syncOpenEffect } from '#lib/popover.svelte.js'
	import type { DialogProps } from './types.js'

	let {
		element = $bindable(),
		open = $bindable(),
		variant = 'basic',
		closeLabel = 'Close',
		quick = false,
		children,
		headline,
		headlineLevel = 2,
		icon,
		supportingText,
		actions,
		actionBar,
		divider,
		closedby = 'any',
		role,
		ontoggle,
		oncancel,
		'aria-labelledby': ariaLabelledby,
		...attributes
	}: DialogProps = $props()

	const uid = $props.id()
	let fullScreen = $derived(variant === 'full-screen')

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

{#snippet title()}
	<svelte:element this={`h${headlineLevel}`} id="{uid}-dialog-headline" class="np-dialog-headline">
		{headline}
	</svelte:element>
{/snippet}

<!-- A basic dialog is an alert dialog on the web, as M3 asks; one that holds a task, like a
     full-screen dialog or a picker, is a plain dialog. -->
<dialog
	{...attributes}
	bind:this={element}
	{@attach !quick && exitAnimation}
	{closedby}
	role={role ?? (fullScreen ? 'dialog' : 'alertdialog')}
	aria-labelledby={ariaLabelledby ?? (headline ? `${uid}-dialog-headline` : undefined)}
	aria-describedby={supportingText ? `${uid}-dialog-supporting-text` : undefined}
	class={[
		'np-dialog-container',
		fullScreen && 'np-dialog-full-screen',
		!quick && 'np-animate np-exit-scrim',
		attributes.class,
	]}
	ontoggle={(event) => {
		open = event.newState === 'open'
		ontoggle?.(event)
	}}
	oncancel={(event) => {
		// Browsers without closedby still close on Escape.
		if (closedby === 'none') event.preventDefault()
		oncancel?.(event)
	}}
	onclick={(event) => {
		attributes.onclick?.(event)
		if (event.target === element && closedby === 'any') close()
	}}
>
	<div class="np-dialog">
		{#if fullScreen}
			<div class="np-dialog-header">
				<IconButton type="button" aria-label={closeLabel} onclick={close}>
					<CloseIcon />
				</IconButton>
				{#if headline}
					{@render title()}
				{/if}
				{#if actions}
					<div class="np-dialog-header-actions">{@render actions()}</div>
				{/if}
			</div>
			{#if divider}
				<Divider />
			{/if}
		{:else}
			{#if icon}
				<div class="np-dialog-icon">
					{@render icon()}
				</div>
			{/if}
			{#if headline}
				<div class={['np-dialog-title', icon && 'np-dialog-title-centered']}>{@render title()}</div>
			{/if}
			{#if divider && (supportingText || children)}
				<Divider style="margin-top: 1rem" --np-divider-color="var(--np-color-outline)" />
			{/if}
		{/if}
		<!-- Headline and actions stay put; everything between them scrolls. -->
		{#if supportingText || children}
			<div class="np-dialog-scroller">
				{#if supportingText}
					<p id="{uid}-dialog-supporting-text" class="np-dialog-supporting-text">
						{supportingText}
					</p>
				{/if}
				{@render children?.()}
			</div>
		{/if}
		{#if fullScreen}
			{#if actionBar}
				<div class="np-dialog-action-bar">{@render actionBar()}</div>
			{/if}
		{:else if actions}
			{#if divider && (supportingText || children)}
				<Divider style="margin-bottom: 1rem" --np-divider-color="var(--np-color-outline)" />
			{/if}
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
	.np-dialog-container:not([open]) {
		display: none;
	}
	.np-animate:not([open]) {
		pointer-events: none;
	}

	.np-dialog {
		border: 0;
		background-color: var(--np-dialog-container-color, var(--np-color-surface-container-high));
		color: var(--np-color-on-surface);
		padding: var(--np-dialog-padding, 1.5rem);
		border-radius: var(--np-dialog-container-shape, var(--np-shape-corner-extra-large));
		box-shadow: var(--np-dialog-elevation, var(--np-elevation-3));
		/* Its padding included, so it fits the window inside the container's own inset. */
		box-sizing: border-box;
		max-height: var(--np-dialog-max-height, calc(100dvh - 4rem));
		scrollbar-color: var(--np-color-on-surface-variant) transparent;
		scrollbar-width: thin;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.np-dialog-scroller {
		overflow-y: auto;
		overscroll-behavior: contain;
		display: flex;
		flex: 1 1 0%;
		flex-direction: column;
	}

	.np-dialog-container::backdrop {
		background-color: var(--np-color-scrim);
		opacity: 0.32;
	}

	/* It fades in, and closes like a menu: a short fade while it shrinks a little, its scrim
	   fading along. */
	.np-animate {
		--_exit: var(--np-motion-expressive-default-effects);
		--np-exit-scrim-motion: var(--_exit);
		transition:
			opacity var(--_exit),
			scale var(--_exit),
			display var(--_exit) allow-discrete,
			overlay var(--_exit) allow-discrete;
		opacity: 0;
	}
	.np-animate[open] {
		--_enter: var(--np-motion-expressive-slow-effects);
		transition:
			opacity var(--_enter),
			display var(--_enter) allow-discrete,
			overlay var(--_enter) allow-discrete;
		opacity: 1;
		@starting-style {
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-animate:not([open]) {
			scale: 0.95;
		}
	}
	.np-animate::backdrop {
		transition:
			opacity var(--np-motion-expressive-default-effects),
			display var(--np-motion-expressive-default-effects) allow-discrete,
			overlay var(--np-motion-expressive-default-effects) allow-discrete;
		opacity: 0;
	}
	.np-animate[open]::backdrop {
		transition:
			opacity var(--np-motion-expressive-slow-effects),
			display var(--np-motion-expressive-slow-effects) allow-discrete,
			overlay var(--np-motion-expressive-slow-effects) allow-discrete;
		opacity: 0.32;
		@starting-style {
			opacity: 0;
		}
	}

	.np-dialog-title-centered {
		text-align: center;
	}

	/* Full-screen: a 56dp header with the close button, headline and confirming action, the
	   content 24dp from the sides and an optional 56dp action bar. It fills a compact window and
	   floats, at most 560dp wide, on larger ones. */
	.np-dialog-full-screen {
		width: var(--np-dialog-container-width, 35rem);
	}
	.np-dialog-full-screen .np-dialog {
		padding: 0;
	}
	.np-dialog-header {
		flex: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 3.5rem;
		padding-inline: 0.5rem 0.75rem;
		--np-icon-button-icon-color: var(--np-color-on-surface);
	}
	.np-dialog-header .np-dialog-headline {
		flex: 1;
		min-width: 0;
		margin: 0;
		font-size: 1.375rem;
		line-height: 1.75rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.np-dialog-header-actions {
		display: flex;
		gap: 0.5rem;
		margin-inline-start: auto;
	}
	.np-dialog-full-screen .np-dialog-scroller {
		padding: 1.5rem 1.5rem;
	}
	.np-dialog-action-bar {
		flex: none;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.5rem;
		min-height: 3.5rem;
		padding-inline: 1.5rem;
	}
	@media (width < 600px) {
		.np-dialog-full-screen {
			width: 100%;
			height: 100%;
			min-width: 0;
			max-height: none;
			margin: 0;
			padding: 0;
		}
		.np-dialog-full-screen .np-dialog {
			height: 100%;
			max-height: none;
			border-radius: 0;
			box-shadow: none;
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
