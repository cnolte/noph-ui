<script lang="ts">
	import Divider from '$lib/divider/Divider.svelte'
	import type { DialogProps } from './types.ts'

	let {
		element = $bindable(),
		showPopover = $bindable(),
		hidePopover = $bindable(),
		quick = false,
		children,
		headline,
		icon,
		supportingText,
		actions,
		divider,
		...attributes
	}: DialogProps = $props()

	showPopover = () => {
		element?.showPopover()
	}

	hidePopover = () => {
		element?.hidePopover()
	}
</script>

<div
	bind:this={element}
	popover="auto"
	{...attributes}
	class={['np-dialog-container', !quick && 'np-animate']}
>
	<div
		role="none"
		class="np-backdrop"
		onclick={() => {
			hidePopover()
		}}
	></div>
	<div class="np-dialog" role="dialog">
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
</div>

<style>
	.np-dialog-container {
		background: transparent;
		border: none;
		margin: auto;
		padding: 9px 14px 20px 14px;
		z-index: 1000;
		padding: 2rem 1rem;
	}
	.np-dialog {
		border: 0;
		min-width: 280px;
		max-width: 560px;
		background-color: var(--np-color-surface);
		color: var(--np-color-on-surface);
		padding: 1.5rem;
		border-radius: var(--np-shape-corner-extra-large);
		box-shadow: var(--np-elevation-3);
		max-height: calc(100dvh - 3rem);
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

	.np-animate[popover] {
		transition:
			opacity 0.25s ease,
			display 0.25s allow-discrete,
			overlay 0.25s allow-discrete;
		opacity: 0;
	}
	.np-animate[popover]:popover-open {
		opacity: 1;
		@starting-style {
			opacity: 0;
		}
	}
	.np-dialog-container[popover] .np-backdrop {
		inset: 0;
		position: fixed;
		background-color: var(--np-color-scrim);
		opacity: 0.38;
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
