<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import IconButton from '$lib/button/IconButton.svelte'
	import type { Snippet } from 'svelte'

	interface SnackbarProps {
		label: string
		supportingText?: string
		actionLabel?: string
		onActionClick?: (event: Event) => void
		icon?: Snippet
		onIconClick?: (event: Event) => void
		showSnackbar?: () => void
		timeout?: number
	}
	let timeoutId: number | undefined = $state()
	const hideSnackbar = () => {
		element?.hidePopover()
	}

	let {
		label,
		supportingText,
		actionLabel,
		onActionClick,
		icon,
		onIconClick = hideSnackbar,
		showSnackbar = $bindable(),
		timeout = 3000,
	}: SnackbarProps = $props()
	let buttonHeight = $derived(supportingText ? '4.25rem' : '3rem')

	showSnackbar = () => {
		element?.showPopover()
		timeoutId = setTimeout(() => {
			element?.hidePopover()
		}, timeout)
	}
	let element: HTMLElement | undefined = $state()
</script>

<div
	popover="auto"
	class="snackbar"
	onbeforetoggle={(event) => {
		if (event.newState === 'closed') {
			clearTimeout(timeoutId)
		}
	}}
	bind:this={element}
>
	<div class="label-container">
		<div class="label">{label}</div>
		{#if supportingText}
			<div class="supportingText">{supportingText}</div>
		{/if}
	</div>
	{#if actionLabel}
		<Button
			variant="text"
			--np-text-button-label-text-color="var(--np-color-on-background-snackbar, var(--np-color-inverse-primary))"
			--np-text-button-container-shape="0"
			style="height:{buttonHeight}"
			aria-label={actionLabel}
			onclick={onActionClick}
		>
			{actionLabel}</Button
		>
	{/if}
	{#if icon}
		<IconButton
			--np-icon-button-icon-color="var(--np-color-on-background-snackbar, var(--np-color-inverse-on-surface))"
			--np-icon-button-container-shape="0"
			--np-icon-button-container-height={buttonHeight}
			--np-icon-button-container-width="2.5rem"
			aria-label="Close"
			onclick={onIconClick}
		>
			{@render icon()}</IconButton
		>
	{/if}
</div>

<style>
	.supportingText {
		font-weight: 400;
	}
	.label-container {
		flex: 1;
		overflow: hidden;
		padding: 0.875rem 1rem;
	}
	.label {
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
	}
	.snackbar[popover] {
		margin-bottom: 1.5rem;
		max-width: calc(100% - 3rem);
		--np-ripple-hover-color: var(--np-color-primary);
		--np-ripple-pressed-color: var(--np-color-primary);
		--np-icon-button-icon-color: fillCurrentColor;
		--np-button-container-color: var(
			--np-color-on-background-snackbar,
			var(--np-color-inverse-on-surface)
		);
		color: var(--np-color-on-background-snackbar, var(--np-color-inverse-on-surface));
		background-color: var(--np-color-background-snackbar, var(--np-color-inverse-surface));
		display: flex;
		align-items: center;
		line-height: 1.25rem;
		font-weight: 500;
		font-size: 0.875rem;
		border-radius: 0.25rem;
		fill: currentColor;
		box-shadow: var(--np-elevation-3);
		padding: 0;
		transition:
			overlay 0.3s allow-discrete,
			display 0.3s allow-discrete,
			opacity 0.3s linear;
		opacity: 0;
		z-index: 1;
	}

	.snackbar:popover-open {
		opacity: 1;
		animation: slideIn 0.3s linear;
	}

	@keyframes slideIn {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
