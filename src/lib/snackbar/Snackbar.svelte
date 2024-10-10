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
	}

	let { label, supportingText, actionLabel, onActionClick, icon, onIconClick }: SnackbarProps =
		$props()
</script>

<div class="snackbar">
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
			aria-label={actionLabel}
			onclick={onActionClick}
		>
			{actionLabel}</Button
		>
	{/if}
	{#if icon}
		<IconButton
			--np-icon-button-icon-color="var(--np-color-on-background-snackbar, var(--np-color-inverse-on-surface))"
			style="border-radius:0.25rem"
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
		padding: 0.625rem 0;
	}
	.label {
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
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
