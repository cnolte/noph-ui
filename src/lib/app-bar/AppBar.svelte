<script lang="ts">
	import type { AppBarProps } from './types.js'

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

	let twoLine = $derived(variant === 'medium' || variant === 'large')
	let isSearch = $derived(variant === 'search')
	let collapses = $derived(collapsible && twoLine)
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

	.np-app-bar:has(:global(.np-search-expanded)) {
		z-index: 9;
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

	.np-app-bar-search-field {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		padding-inline: 0.25rem;
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
		--_second-row-height: 5.5rem;
	}

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
	.np-app-bar-medium .np-app-bar-second-row {
		padding-block-end: 0.75rem;
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
