<script lang="ts">
	import type { AppBarProps } from './types.ts'

	let {
		variant = 'small',
		headline,
		subtitle,
		leading,
		search,
		trailing,
		collapsible = false,
		scroller = 'root',
		children,
		element = $bindable(),
		...attributes
	}: AppBarProps = $props()

	const twoLine = $derived(variant === 'medium' || variant === 'large')
	const isSearch = $derived(variant === 'search')
	// Only a two-line bar has a second row to collapse.
	const collapses = $derived(collapsible && twoLine)
</script>

{#snippet titles(inline: boolean)}
	<div class={['np-app-bar-titles', inline && 'np-app-bar-titles-inline']}>
		<div class="np-app-bar-headline">{headline}</div>
		{#if subtitle}
			<div class="np-app-bar-subtitle">{subtitle}</div>
		{/if}
	</div>
{/snippet}

<header
	{...attributes}
	bind:this={element}
	class={[
		'np-app-bar',
		`np-app-bar-${variant}`,
		collapses && 'np-app-bar-collapsible',
		collapses && scroller === 'nearest' && 'np-app-bar-scroller-nearest',
		attributes.class,
	]}
>
	<div class="np-app-bar-row">
		{#if leading}
			<div class="np-app-bar-leading">{@render leading()}</div>
		{/if}
		{#if isSearch}
			<!-- A search app bar carries a field in place of a headline. -->
			<div class="np-app-bar-search-field">{@render search?.()}</div>
		{:else if twoLine}
			<!--
				The collapsed copy of the headline and subtitle. Hidden from assistive technology so they
				are announced once; the real ones below stay in the accessibility tree even at height zero.
			-->
			<div class="np-app-bar-inline" aria-hidden="true">{@render titles(true)}</div>
		{:else}
			{@render titles(false)}
		{/if}
		{#if trailing}
			<div class="np-app-bar-trailing">{@render trailing()}</div>
		{/if}
	</div>
	{#if twoLine}
		<div class="np-app-bar-second-row">
			{@render titles(false)}
		</div>
	{/if}
	{@render children?.()}
</header>

<style>
	.np-app-bar {
		position: sticky;
		inset-block-start: 0;
		z-index: 8;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: var(--np-app-bar-container-color, var(--np-color-surface));
		color: var(--np-color-on-surface);
		--np-icon-button-icon-color: var(--np-color-on-surface-variant);
	}

	/*
	 * An expanded search floats past the bar's own bounds, into the space of whatever comes
	 * after it in the document. Sibling bars share the same z-index, so without this the one
	 * holding the expanded search would lose to a later sibling and the view would open behind
	 * it rather than over it.
	 */
	.np-app-bar:has(:global(.np-search-expanded)) {
		z-index: 9;
	}

	.np-app-bar-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: none;
		/* `min-height` rather than `height`, so a subtitle on a one-row bar grows it. */
		min-height: 4rem;
		padding-inline: 0.25rem;
	}

	.np-app-bar-leading,
	.np-app-bar-trailing {
		display: flex;
		align-items: center;
		flex: none;
		gap: 0.25rem;
	}
	.np-app-bar-trailing {
		margin-inline-start: auto;
	}

	.np-app-bar-titles {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.125rem;
		min-width: 0;
	}

	.np-app-bar-subtitle {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		color: var(--np-app-bar-subtitle-color, var(--np-color-on-surface-variant));
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	/* The collapsed copy sits on one row, so its subtitle stays at the small size. */
	.np-app-bar-titles-inline .np-app-bar-headline {
		font-size: 1.375rem;
	}

	.np-app-bar-headline {
		font-size: var(--_headline-size);
		line-height: 1.2;
		font-weight: 400;
		color: var(--np-app-bar-headline-color, var(--np-color-on-surface));
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		min-width: 0;
	}

	/* One-row bars: the headline sits in the action row. */
	.np-app-bar-small,
	.np-app-bar-search {
		--_headline-size: 1.375rem;
	}

	/*
	 * The field takes the row, so a search bar has no headline to size. Named `-search-field`
	 * rather than `-search`, which is already the variant class on the header.
	 */
	.np-app-bar-search-field {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		padding-inline: 0.25rem;
	}
	.np-app-bar-small .np-app-bar-titles {
		padding-inline-start: 0.75rem;
		flex: 1;
	}

	/* Two-row bars: the headline sits below, and the inline copy is revealed on collapse. */
	.np-app-bar-medium {
		--_headline-size: 1.5rem;
		--_second-row-height: 3rem; /* medium: 64 + 48 = 112 */
	}
	.np-app-bar-large {
		--_headline-size: 1.75rem;
		--_second-row-height: 5.5rem; /* large: 64 + 88 = 152 */
	}

	/*
	 * Sized by its content with a floor, not a fixed height, so a headline plus a subtitle is not
	 * clipped. `interpolate-size` lets the collapse animate that intrinsic height down to zero,
	 * the same way the extended FAB animates its width.
	 */
	.np-app-bar-second-row {
		interpolate-size: allow-keywords;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		height: auto;
		min-height: var(--_second-row-height);
		padding-inline: 1rem;
		padding-block-end: 1rem;
		overflow: hidden;
	}

	.np-app-bar-inline {
		font-size: 1.375rem;
		line-height: 1.2;
		font-weight: 400;
		color: var(--np-app-bar-headline-color, var(--np-color-on-surface));
		padding-inline-start: 0.75rem;
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* Hidden until the bar collapses. */
		opacity: 0;
	}

	/*
	 * The collapse. `animation-timeline: scroll()` drives these keyframes from the scroll position
	 * itself, so there is no scroll listener, no measurement and no state. `animation-range` ends
	 * the collapse once the page has scrolled past the second row's height.
	 */
	@supports (animation-timeline: scroll()) {
		/*
		 * Scroll anchoring has to be off on whichever element scrolls, or the collapse cannot
		 * happen at all: the bar shrinking above the viewport is exactly the content shift that
		 * anchoring exists to compensate for, so the browser pushes the scroll position back and
		 * the two fight to a standstill. `:has()` reaches the scroller so a consumer does not have
		 * to know this, and only ever matches when a collapsible bar is actually present.
		 */
		:global(html:has(.np-app-bar-collapsible)) {
			overflow-anchor: none;
		}
		/*
		 * `scroll(nearest block)` resolves to the nearest scrollable ancestor at any depth, and CSS
		 * cannot single that one out, so every ancestor of the bar is covered. Turning anchoring off
		 * on an ancestor that does not scroll costs nothing.
		 */
		:global(:has(.np-app-bar-scroller-nearest)) {
			overflow-anchor: none;
		}

		/*
		 * Deliberately not gated on `prefers-reduced-motion`. The collapse is a layout state tied
		 * one to one to the scroll position, the way `position: sticky` is, not motion that plays on
		 * its own. Turning it off would leave the bar permanently eating a third of a small screen
		 * rather than removing an animation.
		 */
		.np-app-bar-collapsible .np-app-bar-second-row {
			animation: np-app-bar-collapse linear both;
			animation-timeline: scroll(root block);
			animation-range: 0 var(--_second-row-height);
		}
		.np-app-bar-collapsible .np-app-bar-inline {
			animation: np-app-bar-reveal linear both;
			animation-timeline: scroll(root block);
			animation-range: 0 var(--_second-row-height);
		}
		.np-app-bar-scroller-nearest .np-app-bar-second-row,
		.np-app-bar-scroller-nearest .np-app-bar-inline {
			animation-timeline: scroll(nearest block);
		}
	}

	@keyframes np-app-bar-collapse {
		to {
			height: 0;
			min-height: 0;
			padding-block-end: 0;
			opacity: 0;
		}
	}

	@keyframes np-app-bar-reveal {
		/* Held hidden for the first half, so the two headlines cross rather than overlap. */
		0%,
		50% {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
