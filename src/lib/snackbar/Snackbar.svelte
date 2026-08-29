<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import { popoverController, syncOpenEffect } from '#lib/popover.svelte.js'
	import type { SnackbarProps } from './types.ts'

	let {
		label,
		supportingText,
		actionLabel,
		onactionclick,
		icon,
		iconAriaLabel = 'Close',
		oniconclick = () => close(),
		open = $bindable(false),
		ontoggle,
		timeout = 4000,
		element = $bindable(),
		popover = 'manual',
		...attributes
	}: SnackbarProps = $props()

	let hovered = $state(false)
	let focused = $state(false)

	const uid = $props.id()
	const controller = popoverController(() => element)

	export const show = () => controller.show()
	export const close = () => controller.close()

	syncOpenEffect(
		() => element,
		() => open,
		show,
		close,
	)

	$effect(() => {
		if (!open || hovered || focused || timeout <= 0) return
		const timeoutId = setTimeout(close, timeout)
		return () => clearTimeout(timeoutId)
	})
</script>

<div
	{...attributes}
	{popover}
	class={['np-snackbar', attributes.class]}
	bind:this={element}
	role="alert"
	aria-labelledby="np-snackbar-label-{uid}"
	onpointerenter={() => (hovered = true)}
	onpointerleave={() => (hovered = false)}
	onfocusin={() => (focused = true)}
	onfocusout={() => (focused = false)}
	ontoggle={(event) => {
		open = event.newState === 'open'
		ontoggle?.(event)
	}}
>
	<div class="np-snackbar-inner">
		<div class="np-snackbar-label-container">
			<div id="np-snackbar-label-{uid}" class="np-snackbar-label">{label}</div>
			{#if supportingText}
				<div class="np-snackbar-supporting-text">{supportingText}</div>
			{/if}
		</div>
		{#if actionLabel}
			<Button
				variant="text"
				--np-text-button-label-text-color="var(--np-snackbar-action-color, var(--np-color-inverse-primary))"
				aria-label={actionLabel}
				onclick={onactionclick}
			>
				{actionLabel}
			</Button>
		{/if}
		{#if icon}
			<div class="np-snackbar-icon-container">
				<IconButton
					--np-icon-button-icon-color="var(--np-snackbar-text-color, var(--np-color-inverse-on-surface))"
					aria-label={iconAriaLabel}
					onclick={oniconclick}
				>
					{@render icon()}</IconButton
				>
			</div>
		{/if}
	</div>
</div>

<style>
	.np-snackbar-icon-container {
		width: 2.75rem;
	}
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
		overflow: hidden;
		align-items: center;
	}
	.np-snackbar[popover] {
		border: none;
		margin: auto auto 1rem;
		min-width: min(21.5rem, calc(100% - 3rem));
		max-width: min(42rem, calc(100% - 3rem));
		color: var(--np-snackbar-text-color, var(--np-color-inverse-on-surface));
		background-color: var(--np-snackbar-container-color, var(--np-color-inverse-surface));
		line-height: 1.25rem;
		font-weight: 500;
		font-size: 0.875rem;
		border-radius: var(--np-snackbar-container-shape, 0.25rem);
		fill: currentColor;
		box-shadow: var(--np-elevation-3);
		padding: 0;
		transition:
			overlay 0.2s allow-discrete,
			display 0.2s allow-discrete,
			opacity var(--np-motion-expressive-default-effects);
		opacity: 0;
	}

	.np-snackbar:popover-open {
		opacity: 1;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-snackbar:popover-open {
			animation: slideIn var(--np-motion-expressive-default-spatial);
		}
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
