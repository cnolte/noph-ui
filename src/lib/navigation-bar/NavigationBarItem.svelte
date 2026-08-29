<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import Badge from '#lib/badge/Badge.svelte'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import type { NavigationBarItemProps } from './types.ts'

	let {
		selected = false,
		icon,
		label,
		badge = false,
		badgeLabel,
		badgeAriaLabel,
		labelBehavior = 'always',
		orientation = 'vertical',
		element = $bindable(),
		...attributes
	}: NavigationBarItemProps = $props()

	let touchEl: HTMLSpanElement | undefined = $state()

	const isLink = $derived(attributes.href != null)
	const classes = $derived([
		'np-navigation-bar-item',
		selected && 'np-navigation-bar-item-selected',
		labelBehavior === 'selected' && 'np-navigation-bar-item-label-selected',
		orientation === 'horizontal' && 'np-navigation-bar-item-horizontal',
		attributes.class,
	])
</script>

{#snippet content()}
	{#if orientation === 'horizontal'}
		<!-- Sized off its own parent, so it has to sit on the whole pill rather than the icon alone. -->
		<Ripple forElement={touchEl} />
	{/if}
	<span class="np-navigation-bar-item-icon">
		{#if orientation === 'vertical'}
			<Ripple forElement={touchEl} />
		{/if}
		{@render icon()}
		{#if badge}
			<span class="np-navigation-bar-item-badge">
				<Badge label={badgeLabel} aria-label={badgeAriaLabel} />
			</span>
		{/if}
	</span>
	<span class="np-navigation-bar-item-label">{label}</span>
	<span class="np-touch" bind:this={touchEl}></span>
{/snippet}

{#if isLink}
	<a
		{...attributes}
		bind:this={element}
		href={attributes.href}
		class={classes}
		aria-current={selected ? 'page' : undefined}
		tabindex={selected ? 0 : -1}
	>
		{@render content()}
	</a>
{:else}
	<button
		{...attributes as HTMLButtonAttributes}
		bind:this={element}
		class={classes}
		aria-current={selected ? 'page' : undefined}
		tabindex={selected ? 0 : -1}
	>
		{@render content()}
	</button>
{/if}

<style>
	.np-navigation-bar-item {
		position: relative;
		flex: 1;
		min-width: 0;
		cursor: pointer;
		font: inherit;
		border-width: 0;
		background: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: 0.25rem;
		color: var(--np-color-on-surface);
		text-decoration: none;
		-webkit-tap-highlight-color: transparent;
	}

	.np-navigation-bar-item-icon {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.5rem;
		height: 2rem;
		border-radius: var(--np-shape-corner-full);
		color: var(--np-color-on-surface-variant);
		z-index: 1;
	}

	/* The active-indicator pill, grown from the selected class rather than measured. */
	.np-navigation-bar-item-icon::before {
		content: '';
		position: absolute;
		inset: 0;
		opacity: 0;
		transform: scaleX(0.32);
		background-color: var(
			--np-navigation-bar-item-active-indicator-color,
			var(--np-color-secondary-container)
		);
		border-radius: inherit;
		z-index: -1;
	}
	.np-navigation-bar-item-selected .np-navigation-bar-item-icon::before {
		opacity: 1;
		transform: scaleX(1);
	}

	.np-navigation-bar-item-selected .np-navigation-bar-item-icon {
		color: var(--np-color-on-secondary-container);
		--np-icon-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}

	.np-navigation-bar-item-label {
		font-size: 0.75rem;
		line-height: 1rem;
		letter-spacing: 0.031rem;
		font-weight: var(--np-navigation-bar-item-font-weight, 500);
		color: var(--np-color-on-surface-variant);
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.np-navigation-bar-item-selected .np-navigation-bar-item-label {
		font-weight: var(--np-navigation-bar-item-selected-font-weight, 500);
		color: var(--np-color-on-surface);
	}

	/*
	 * `labelBehavior="selected"` keeps the label in the layout but hides it, so the row does not
	 * reflow as the selection moves.
	 */
	.np-navigation-bar-item-label-selected .np-navigation-bar-item-label {
		visibility: hidden;
	}
	.np-navigation-bar-item-label-selected.np-navigation-bar-item-selected
		.np-navigation-bar-item-label {
		visibility: visible;
	}

	/*
	 * The icon sits beside the label instead of above it, for a bar with room to spare. Unlike the
	 * stacked layout, the active-indicator pill wraps the icon and label together, like a chip,
	 * rather than just the icon.
	 */
	.np-navigation-bar-item-horizontal {
		flex-direction: row;
		justify-content: center;
		/* M3's "icon label space" token: 4dp between the icon and the label. */
		gap: 0.25rem;
		/*
		 * M3's "leading/trailing space" token (16dp) sets the inline padding, and the block padding
		 * is picked so a 1.5rem icon plus padding adds up to the "active indicator height" token
		 * (40dp).
		 */
		padding: 0.5rem 1rem;
		border-radius: var(--np-shape-corner-full);
		/* The bar stretches items to its own height by default; a pill sizes to its own content and
		 * centers in the bar instead. */
		align-self: center;
		/* Gives the item its own stacking context, so the pill's z-index: -1 stays behind the icon
		 * and label instead of escaping to sit behind the bar's own background. */
		z-index: 0;
	}
	.np-navigation-bar-item-horizontal::before {
		content: '';
		position: absolute;
		inset: 0;
		opacity: 0;
		transform: scaleX(0.32);
		background-color: var(
			--np-navigation-bar-item-active-indicator-color,
			var(--np-color-secondary-container)
		);
		border-radius: inherit;
		z-index: -1;
	}
	.np-navigation-bar-item-horizontal.np-navigation-bar-item-selected::before {
		opacity: 1;
		transform: scaleX(1);
	}
	/* The wrapping item now supplies the pill, so the icon's own is switched off. */
	.np-navigation-bar-item-horizontal .np-navigation-bar-item-icon {
		width: 1.5rem;
		height: 1.5rem;
	}
	.np-navigation-bar-item-horizontal .np-navigation-bar-item-icon::before {
		content: none;
	}
	.np-navigation-bar-item-horizontal .np-navigation-bar-item-badge {
		--np-badge-top: -0.25rem;
		--np-badge-end: -0.25rem;
	}
	.np-navigation-bar-item-horizontal .np-touch {
		inset: 0;
		width: 100%;
		height: 100%;
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-navigation-bar-item-horizontal::before {
			transition:
				transform var(--np-motion-expressive-default-spatial),
				opacity var(--np-motion-expressive-fast-effects);
		}
	}

	.np-navigation-bar-item-badge {
		--np-badge-top: 0;
		--np-badge-end: 1rem;
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.np-touch {
		position: absolute;
		inset-block-start: 0;
		height: 3.5rem;
		width: 4rem;
	}

	.np-navigation-bar-item:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: 2px;
		border-radius: 1rem;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-navigation-bar-item-icon::before {
			transition:
				transform var(--np-motion-expressive-default-spatial),
				opacity var(--np-motion-expressive-fast-effects);
		}
		.np-navigation-bar-item-label {
			transition: color var(--np-motion-expressive-default-effects);
		}
		.np-navigation-bar-item:focus-visible {
			animation: focusAnimation var(--np-motion-expressive-slow-effects) forwards;
		}
	}
</style>
