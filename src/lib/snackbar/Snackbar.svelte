<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import IconButton from '$lib/button/IconButton.svelte'
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
		label: string
		supportingText?: string
		actionLabel?: string
		onActionClick?: (event: Event) => void
		icon?: Snippet
		onIconClick?: (event: Event) => void
		showSnackbar?: () => void
		hideSnackbar?: () => void
		timeout?: number
	}

	let {
		label,
		supportingText,
		actionLabel,
		onActionClick,
		icon,
		onIconClick = () => {
			element?.hidePopover()
		},
		showSnackbar = $bindable(),
		hideSnackbar = $bindable(),
		timeout = 3000,
		...attributes
	}: SnackbarProps = $props()

	let timeoutId: number | undefined = $state()
	let element: HTMLElement | undefined = $state()
	let buttonHeight = $derived(supportingText ? '4.25rem' : '3rem')

	showSnackbar = () => {
		element?.showPopover()
	}

	hideSnackbar = () => {
		element?.hidePopover()
	}

	const toggleHandler = (event: ToggleEvent) => {
		if (event.newState === 'closed') {
			clearTimeout(timeoutId)
		}
		if (event.newState === 'open' && timeout) {
			timeoutId = setTimeout(() => {
				element?.hidePopover()
			}, timeout)
		}
	}
</script>

<div
	popover="auto"
	{...attributes}
	class="np-snackbar"
	onbeforetoggle={toggleHandler}
	bind:this={element}
>
	<div class="np-snackbar-inner">
		<div class="np-snackbar-label-container">
			<div class="np-snackbar-label">{label}</div>
			{#if supportingText}
				<div class="np-snackbar-supporting-text">{supportingText}</div>
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
</div>

<style>
	.np-snackbar-supporting-text {
		font-weight: 400;
	}
	.np-snackbar-label-container {
		flex: 1;
		overflow: hidden;
		padding: 0.875rem 1rem;
	}
	.np-snackbar-label {
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
	}
	.np-snackbar-inner {
		display: flex;
		align-items: center;
	}
	.np-snackbar[popover] {
		border: none;
		margin-bottom: 1rem;
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
		line-height: 1.25rem;
		font-weight: 500;
		font-size: 0.875rem;
		border-radius: 0.25rem;
		fill: currentColor;
		box-shadow: var(--np-elevation-3);
		padding: 0;
		transition:
			overlay 0.2s allow-discrete,
			display 0.2s allow-discrete,
			opacity 0.2s linear;
		opacity: 0;
		z-index: 1;
	}

	.np-snackbar:popover-open {
		opacity: 1;
		animation: slideIn 0.2s linear;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(100%);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
