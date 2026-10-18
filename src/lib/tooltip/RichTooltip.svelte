<script lang="ts">
	import '#lib/internal/pop-in.css'
	import { popoverController, syncOpenEffect } from '#lib/popover.svelte.js'
	import type { RichTooltipProps } from './types.js'

	let {
		children,
		subhead,
		actions,
		open = $bindable(),
		element = $bindable(),
		id,
		ontoggle,
		...attributes
	}: RichTooltipProps = $props()

	const findControl = () =>
		id
			? (document.querySelector<HTMLElement>(`[commandfor="${id}"], [popovertarget="${id}"]`) ??
				undefined)
			: undefined

	const controller = popoverController(() => element)

	export const show = () => {
		if (!element || element.matches(':popover-open')) return
		const source = findControl()
		element.showPopover(source ? { source } : undefined)
	}

	export const close = () => controller.close()

	syncOpenEffect(
		() => element,
		() => open,
		show,
		close,
	)
</script>

<div
	{...attributes}
	{id}
	class={[
		'np-rich-tooltip',
		'np-pop-in',
		subhead && 'np-rich-tooltip-with-subhead',
		actions && 'np-rich-tooltip-with-actions',
		attributes.class,
	]}
	role="tooltip"
	popover="auto"
	bind:this={element}
	ontoggle={(event) => {
		let { newState } = event
		open = newState === 'open'
		ontoggle?.(event)
	}}
>
	{#if subhead}
		<div class="np-rich-tooltip-subhead">{subhead}</div>
	{/if}
	{#if children}
		<div class="np-rich-tooltip-text">{@render children()}</div>
	{/if}
	{#if actions}
		<div class="np-rich-tooltip-actions">{@render actions()}</div>
	{/if}
</div>

<style>
	.np-rich-tooltip[popover] {
		box-sizing: border-box;
		width: max-content;
		max-width: min(20rem, 100vw - 1rem);
		overflow-wrap: break-word;
		margin: var(--np-rich-tooltip-margin, 4px 8px 8px 0);
		padding: 0.25rem 1rem;
		border: none;
		border-radius: var(--np-shape-corner-medium);
		background: var(--np-color-surface-container);
		color: var(--np-color-on-surface-variant);
		box-shadow: var(--np-elevation-2);
		font-size: 0.875rem;
		line-height: 1.25rem;
		justify-self: var(--np-rich-tooltip-justify-self, auto);
		align-self: var(--np-rich-tooltip-align-self, auto);
		position-area: var(--np-rich-tooltip-position-area, bottom right);
		position-try-fallbacks: var(
			--np-rich-tooltip-position-try-fallbacks,
			flip-block,
			flip-inline,
			flip-block flip-inline
		);
	}
	.np-rich-tooltip-with-subhead[popover] {
		padding-block: 0.75rem 1rem;
	}
	.np-rich-tooltip-with-actions[popover] {
		padding-block: 0.75rem 0.5rem;
	}
	.np-rich-tooltip-subhead {
		margin-bottom: 0.25rem;
		font-weight: 500;
	}

	.np-rich-tooltip-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		min-height: 2.25rem;
		margin-top: 1rem;
		margin-inline-start: calc(-1 * var(--np-rich-tooltip-action-inset, 1rem));
		padding-inline-end: var(--np-rich-tooltip-action-inset, 1rem);
	}
</style>
