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
	}

	let { label, supportingText, actionLabel, onActionClick, icon, onIconClick }: SnackbarProps =
		$props()
</script>

<div class="snackbar">
	<div class="label">
		<div>{label}</div>
		{#if supportingText}
			<div class="supportingText">{supportingText}</div>
		{/if}
	</div>
	{#if actionLabel}
		<Button
			variant="text"
			style="border-radius:0.25rem; --np-text-button-label-text-color: var(--np-color-on-background-snackbar, var(--np-color-inverse-primary))"
			aria-label={actionLabel}
			onclick={onActionClick}
		>
			{actionLabel}</Button
		>
	{/if}
	{#if icon}
		<IconButton
			style="border-radius:0.25rem; --np-icon-button-icon-color: var(--np-color-on-background-snackbar, var(--np-color-inverse-on-surface))"
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
	.label {
		flex: 1;
		padding: 0.625rem 0;
	}
	.snackbar {
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
		gap: 0.5rem;
		line-height: 1.25rem;
		font-weight: 500;
		font-size: 0.875rem;
		border-radius: 0.25rem;
		fill: currentColor;
		padding: 0.25rem 1rem;
	}
</style>
