<script lang="ts">
	import type { AppBarProps } from './types.js'

	let {
		variant = 'small',
		headline,
		headlineLevel,
		subtitle,
		alignment = 'start',
		image,
		leading,
		search,
		trailing,
		collapsible = false,
		scroller = 'root',
		children,
		element = $bindable(),
		...attributes
	}: AppBarProps = $props()

	let twoLine = $derived(variant === 'medium' || variant === 'large')
	let isSearch = $derived(variant === 'search')
	let collapses = $derived(collapsible && twoLine)
</script>

{#snippet titles(inline: boolean)}
	<div class={['np-app-bar-titles', inline && 'np-app-bar-titles-inline']}>
		{#if image && !inline}
			<div class="np-app-bar-image">{@render image()}</div>
		{/if}
		<!-- The copy shown while collapsed is hidden from assistive technology, so only the other one
		     is the heading. -->
		<svelte:element
			this={headlineLevel && !inline ? `h${headlineLevel}` : 'div'}
			class="np-app-bar-headline">{headline}</svelte:element
		>
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
		alignment === 'center' && 'np-app-bar-center',
		scroller === 'nearest' && 'np-app-bar-scroller-nearest',
		attributes.class,
	]}
>
	<div class="np-app-bar-row">
		{#if leading}
			<div class="np-app-bar-leading">{@render leading()}</div>
		{/if}
		{#if isSearch}
			<div class="np-app-bar-search-field">{@render search?.()}</div>
		{:else if twoLine}
			<div class="np-app-bar-inline" aria-hidden="true">{@render titles(true)}</div>
		{:else if image}
			<!-- In a small app bar the image takes the headline's place. -->
			<div class="np-app-bar-titles">{@render image()}</div>
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
		--_timeline: scroll(root block);
		--_fill-range: 0 var(--np-app-bar-fill-distance, 0.5rem);
	}
	.np-app-bar-scroller-nearest {
		--_timeline: scroll(nearest block);
	}

	/* The bar is the open search's stacking context, so it rises to the search's own level, above
	   other bars and a page header. */
	.np-app-bar:has(:global(.np-search-expanded)) {
		z-index: var(--np-search-z-index, 24);
	}

	.np-app-bar-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: none;
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
	/* The leading button is on surface, the trailing ones on surface variant. In a search app bar
	   they are all on surface variant. */
	.np-app-bar:not(.np-app-bar-search) .np-app-bar-leading {
		--np-icon-button-icon-color: var(--np-color-on-surface);
	}

	.np-app-bar-titles {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.125rem;
		min-width: 0;
	}

	.np-app-bar-subtitle {
		font-size: var(--_subtitle-size);
		line-height: var(--_subtitle-line-height);
		font-weight: 500;
		color: var(--np-app-bar-subtitle-color, var(--np-color-on-surface-variant));
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.np-app-bar-headline {
		margin: 0;
		font-size: var(--_headline-size);
		line-height: var(--_headline-line-height);
		font-weight: 400;
		color: var(--np-app-bar-headline-color, var(--np-color-on-surface));
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		min-width: 0;
	}
	.np-app-bar-second-row .np-app-bar-headline {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		white-space: normal;
		overflow-wrap: anywhere;
	}

	.np-app-bar-small,
	.np-app-bar-search,
	.np-app-bar-inline {
		--_headline-size: 1.375rem;
		--_headline-line-height: 1.75rem;
		--_subtitle-size: 0.75rem;
		--_subtitle-line-height: 1rem;
	}

	/* The search fills the space between the leading and trailing elements up to 312dp, then
	   grows only to half of it, centred. The bar sits 8dp from the elements beside it, so the
	   margin a search keeps for its open view stays out of the row. */
	.np-app-bar-search-field {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		container-type: inline-size;
		--np-search-pane-margin: 0;
	}
	.np-app-bar-search-field :global(.np-search:not(.np-search-full-screen.np-search-expanded)) {
		width: min(100%, max(19.5rem, 50cqi));
	}
	.np-app-bar-search-field :global(.np-search:not(.np-search-expanded) .np-search-bar) {
		background-color: var(--np-search-container-color, var(--np-color-surface-container));
	}
	.np-app-bar-small .np-app-bar-titles {
		padding-inline-start: 0.75rem;
		flex: 1;
	}

	.np-app-bar-medium {
		--_headline-size: 1.75rem;
		--_headline-line-height: 2.25rem;
		--_subtitle-size: 0.875rem;
		--_subtitle-line-height: 1.25rem;
		--_second-row-height: 3rem;
	}
	.np-app-bar-large {
		--_headline-size: 2.25rem;
		--_headline-line-height: 2.75rem;
		--_subtitle-size: 1rem;
		--_subtitle-line-height: 1.5rem;
		--_second-row-height: 3.5rem;
	}

	.np-app-bar-second-row {
		interpolate-size: allow-keywords;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		height: auto;
		min-height: var(--_second-row-height);
		padding-inline: 1rem;
		padding-block-end: 0.75rem;
		overflow: hidden;
	}
	.np-app-bar-image {
		display: flex;
		margin-block-end: 0.5rem;
	}

	/* Centred, a small app bar puts its headline in the middle of the bar whatever sits beside it. */
	.np-app-bar-center .np-app-bar-row {
		display: grid;
		grid-template-columns: minmax(max-content, 1fr) auto minmax(max-content, 1fr);
	}
	.np-app-bar-center .np-app-bar-leading {
		grid-column: 1;
	}
	.np-app-bar-center .np-app-bar-row > .np-app-bar-titles,
	.np-app-bar-center .np-app-bar-inline,
	.np-app-bar-center .np-app-bar-search-field {
		grid-column: 2;
		padding-inline: 0;
	}
	.np-app-bar-center.np-app-bar-search .np-app-bar-row {
		grid-template-columns: auto 1fr auto;
	}
	.np-app-bar-center .np-app-bar-trailing {
		grid-column: 3;
		justify-self: end;
	}
	.np-app-bar-center .np-app-bar-titles {
		align-items: center;
		text-align: center;
	}
	.np-app-bar-center .np-app-bar-second-row {
		justify-content: center;
	}
	.np-app-bar-center .np-app-bar-search-field :global(.np-search-input) {
		text-align: center;
	}

	.np-app-bar-inline {
		padding-inline-start: 0.75rem;
		flex: 1;
		min-width: 0;
		overflow: hidden;
		opacity: 0;
	}

	@supports (animation-timeline: scroll()) {
		:global(html:has(.np-app-bar-collapsible)) {
			overflow-anchor: none;
		}
		:global(:has(.np-app-bar-collapsible.np-app-bar-scroller-nearest)) {
			overflow-anchor: none;
		}

		.np-app-bar {
			animation: np-app-bar-fill linear both;
			animation-timeline: var(--_timeline);
			animation-range: var(--_fill-range);
		}
		.np-app-bar-search-field :global(.np-search:not(.np-search-expanded) .np-search-bar) {
			animation: np-app-bar-search-fill linear both;
			animation-timeline: var(--_timeline);
			animation-range: var(--_fill-range);
		}

		.np-app-bar-collapsible .np-app-bar-second-row {
			animation: np-app-bar-collapse linear both;
			animation-timeline: var(--_timeline);
			animation-range: 0 var(--_second-row-height);
		}
		.np-app-bar-collapsible .np-app-bar-inline {
			animation: np-app-bar-reveal linear both;
			animation-timeline: var(--_timeline);
			animation-range: 0 var(--_second-row-height);
		}
	}

	@keyframes np-app-bar-fill {
		to {
			background-color: var(
				--np-app-bar-scrolled-container-color,
				var(--np-color-surface-container)
			);
		}
	}

	@keyframes np-app-bar-search-fill {
		to {
			background-color: var(--np-search-container-color, var(--np-color-surface-container-highest));
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
		0%,
		50% {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
