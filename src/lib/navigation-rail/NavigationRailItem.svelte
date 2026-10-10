<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import Badge from '#lib/badge/Badge.svelte'
	import { badgeDescription } from '#lib/badge/description.js'
	import Ripple from '#lib/ripple/Ripple.svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import { getNavigationRailContext } from './context.js'
	import type { NavigationRailItemProps } from './types.js'

	let {
		selected,
		icon,
		label,
		badge = false,
		badgeLabel,
		badgeAriaLabel,
		element = $bindable(),
		...attributes
	}: NavigationRailItemProps = $props()

	const uid = $props.id()
	let badgeId = $derived(badge ? `${uid}-badge` : undefined)
	let describedBy = $derived(
		[attributes['aria-describedby'], badgeId].filter(Boolean).join(' ') || undefined,
	)

	let isLink = $derived(attributes.href != null)

	const rail = getNavigationRailContext()
	let expanded = $derived(rail?.expanded ?? false)

	let classes = $derived([
		'np-navigation-action',
		selected && 'np-navigation-action-selected',
		expanded && 'np-navigation-action-expanded',
		attributes.class,
	])
</script>

{#snippet content()}
	<span class="np-navigation-action-indicator"><Ripple forElement={element} /></span>
	<span class="np-navigation-action-icon">
		{@render icon()}
		{#if badge}
			<span class="np-navigation-action-badge"><Badge label={badgeLabel} /></span>
		{/if}
	</span>
	<!-- Both labels stay, so they can cross-fade while the rail morphs. The one out of use is hidden
	     and out of the flow. -->
	<span
		class={['np-navigation-action-label', 'np-label-below', expanded && 'np-away']}
		aria-hidden={expanded ? 'true' : undefined}>{label}</span
	>
	<span
		class={['np-navigation-action-label', 'np-label-beside', !expanded && 'np-away']}
		aria-hidden={expanded ? undefined : 'true'}>{label}</span
	>
	{#if badgeId}
		<span id={badgeId} hidden>{badgeDescription(badgeLabel, badgeAriaLabel)}</span>
	{/if}
{/snippet}

{#if isLink}
	<a
		{...attributes}
		bind:this={element}
		href={attributes.href}
		aria-describedby={describedBy}
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
		aria-describedby={describedBy}
		class={classes}
		aria-current={selected ? 'page' : undefined}
		tabindex={selected ? 0 : -1}
	>
		{@render content()}
	</button>
{/if}

<style>
	/* Collapsed: the indicator around the icon, the label below. Expanded: icon and label side by
	   side inside the indicator. The item spans the rail, so its target is the full width.
	   Everything is anchored to the item's start, so the parts keep their place while the rail's
	   width animates, and the measures below place the label that fades out as well. */
	.np-navigation-action {
		--_pad-block: 0.375rem;
		--_pad-inline: 1.25rem;
		--_indicator-width: 3.5rem;
		--_indicator-height: 2rem;
		--_row-gap: 0.25rem;
		--_expanded-height: 3.5rem;
		--_icon: 1.5rem;
		--_icon-inset: 1rem;
		--_label-gap: 0.5rem;
		--_beside-line: 1.25rem;
		position: relative;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: var(--_indicator-width);
		grid-template-rows: var(--_indicator-height) auto;
		row-gap: var(--_row-gap);
		justify-items: start;
		align-items: center;
		width: 100%;
		padding-block: var(--_pad-block);
		padding-inline: var(--_pad-inline);
		cursor: pointer;
		font: inherit;
		border: 0;
		background: none;
		color: var(--np-color-on-surface);
		text-decoration: none;
		-webkit-tap-highlight-color: transparent;
	}
	.np-navigation-action-expanded {
		grid-template-columns: auto auto;
		grid-template-rows: var(--_expanded-height);
		justify-content: start;
		padding-block: 0;
	}

	.np-navigation-action:focus-visible {
		outline-style: solid;
		outline-color: var(--np-color-secondary);
		outline-width: 3px;
		outline-offset: -3px;
		border-radius: 1rem;
	}
	/* The focused state layer, on top of the ring. */
	.np-navigation-action:focus-visible :global(.np-ripple-surface)::before {
		opacity: var(--np-ripple-focus-opacity, 0.1);
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-navigation-action:focus-visible {
			animation: focusAnimationInset var(--np-motion-expressive-slow-effects) forwards;
		}
	}

	.np-navigation-action-indicator {
		grid-area: 1 / 1;
		/* Top aligned, so its height can animate without moving it. */
		align-self: start;
		position: relative;
		z-index: 0;
		width: var(--_indicator-width);
		height: var(--_indicator-height);
		border-radius: var(--np-shape-corner-full);
	}
	.np-navigation-action-expanded .np-navigation-action-indicator {
		grid-area: 1 / 1 / 2 / 3;
		justify-self: stretch;
		width: auto;
		height: var(--_expanded-height);
	}
	.np-navigation-action-indicator::before {
		content: '';
		position: absolute;
		inset: 0;
		opacity: 0;
		transform: scaleX(0.32);
		background-color: var(
			--np-navigation-rail-item-active-indicator-color,
			var(--np-color-secondary-container)
		);
		border-radius: inherit;
		z-index: -1;
	}
	.np-navigation-action-selected .np-navigation-action-indicator::before {
		opacity: 1;
		transform: scaleX(1);
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-navigation-action-indicator::before {
			transition:
				transform var(--np-motion-expressive-default-spatial),
				opacity var(--np-motion-expressive-fast-effects);
		}
	}

	.np-navigation-action-icon {
		grid-area: 1 / 1;
		justify-self: center;
		position: relative;
		z-index: 1;
		display: flex;
		width: var(--_icon);
		height: var(--_icon);
		color: var(--np-color-on-surface-variant);
		pointer-events: none;
	}
	.np-navigation-action-expanded .np-navigation-action-icon {
		justify-self: start;
		margin-inline-start: var(--_icon-inset);
	}
	.np-navigation-action-selected .np-navigation-action-icon {
		color: var(--np-color-on-secondary-container);
		--np-icon-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
	}
	/* The badge stays on the icon in both layouts. */
	.np-navigation-action-badge {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.np-navigation-action-label {
		font-size: 0.75rem;
		line-height: 1rem;
		letter-spacing: 0.031rem;
		font-weight: var(--np-navigation-rail-item-font-weight, 500);
		color: var(--np-color-on-surface-variant);
		pointer-events: none;
	}
	.np-navigation-action-selected .np-navigation-action-label {
		font-weight: var(--np-navigation-rail-item-selected-font-weight, 500);
		color: var(--np-color-secondary);
	}
	/* Centred under the icon, across the width of the collapsed rail. */
	.np-label-below {
		grid-area: 2 / 1;
		box-sizing: border-box;
		width: calc(2 * var(--_pad-inline) + var(--_indicator-width));
		margin-inline-start: calc(-1 * var(--_pad-inline));
		padding-inline: 0.25rem;
		text-align: center;
		overflow-wrap: anywhere;
	}
	.np-label-beside {
		grid-area: 1 / 2;
		position: relative;
		z-index: 1;
		margin-inline: var(--_label-gap) 1rem;
		font-size: 0.875rem;
		line-height: var(--_beside-line);
		letter-spacing: 0.006rem;
		white-space: nowrap;
	}
	.np-navigation-action-selected .np-label-beside {
		color: var(--np-color-on-secondary-container);
	}
	/* The label out of use leaves the flow where it would sit in the other layout. */
	.np-navigation-action-label.np-away {
		grid-area: auto;
		position: absolute;
		margin: 0;
		opacity: 0;
		visibility: hidden;
	}
	.np-label-below.np-away {
		inset-block-start: calc(var(--_pad-block) + var(--_indicator-height) + var(--_row-gap));
		inset-inline-start: 0;
	}
	.np-label-beside.np-away {
		inset-block-start: calc((var(--_expanded-height) - var(--_beside-line)) / 2);
		inset-inline-start: calc(
			var(--_pad-inline) + var(--_icon-inset) + var(--_icon) + var(--_label-gap)
		);
	}
	/* The old label fades out at once, the new one fades in as the items settle. */
	@media (prefers-reduced-motion: no-preference) {
		.np-navigation-action-label {
			transition:
				opacity var(--np-motion-standard-fast-effects) 100ms,
				visibility 0s;
		}
		.np-navigation-action-label.np-away {
			transition:
				opacity 100ms linear,
				visibility 0s linear 100ms;
		}
	}
</style>
