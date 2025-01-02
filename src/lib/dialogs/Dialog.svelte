<script lang="ts">
	import { enhance } from '$app/forms'
	import Divider from '$lib/divider/Divider.svelte'
	import type { DialogProps } from './types.ts'

	let {
		element = $bindable(),
		showPopover = $bindable(),
		hidePopover = $bindable(),
		children,
		headline,
		icon,
		supportingText,
		buttons,
		divider,
		submitFunction,
		...attributes
	}: DialogProps = $props()

	showPopover = () => {
		element?.showPopover()
	}

	hidePopover = () => {
		element?.hidePopover()
	}
</script>

<form
	use:enhance={submitFunction}
	bind:this={element}
	class="np-dialog"
	popover="auto"
	role="dialog"
	{...attributes}
>
	{#if icon}
		<div class="np-dialog-icon">
			{@render icon()}
		</div>
	{/if}
	<h1 class="np-dialog-headline" style={icon ? 'text-align: center' : ''}>{headline}</h1>
	{#if supportingText}
		<p class="np-dialog-supporting-text">{supportingText}</p>
	{/if}
	{#if divider}
		<Divider style="margin-top: 1rem" --np-divider-color="var(--np-color-outline)" />
	{/if}
	{#if children}
		{@render children()}
	{/if}
	{#if buttons}
		<div class="np-dialog-buttons">
			{@render buttons()}
		</div>
	{/if}
</form>

<style>
	.np-dialog {
		border: 0;
		min-width: 280px;
		max-width: 560px;
		background-color: var(--np-color-surface);
		color: var(--np-color-on-surface);
		padding: 1.5rem;
		border-radius: var(--np-shape-corner-extra-large);
		box-shadow: var(--np-elevation-3);
		max-height: 100dvh;
		scrollbar-color: var(--np-color-on-surface-variant) transparent;
		scrollbar-width: thin;
		transition:
			display 0.2s allow-discrete,
			overlay 0.2s allow-discrete,
			opacity 0.2s linear;
		opacity: 0;
		z-index: 1;
	}
	.np-dialog:popover-open {
		opacity: 1;
		@starting-style {
			opacity: 0;
		}
	}
	.np-dialog::backdrop {
		background-color: var(--np-color-scrim);
		opacity: 0;
		transition:
			display 0.2s allow-discrete,
			overlay 0.2s allow-discrete,
			opacity 0.2s linear;
	}
	.np-dialog:popover-open::backdrop {
		opacity: 0.38;
	}

	@starting-style {
		.np-dialog:popover-open::backdrop {
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
	.np-dialog-buttons {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
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
