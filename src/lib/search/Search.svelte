<script lang="ts">
	import '#lib/internal/focus-ring.css'
	import IconButton from '#lib/button/IconButton.svelte'
	import ArrowBackIcon from '#lib/icons/ArrowBackIcon.svelte'
	import CloseIcon from '#lib/icons/CloseIcon.svelte'
	import SearchIcon from '#lib/icons/SearchIcon.svelte'
	import type { SearchProps } from './types.ts'

	let {
		value = $bindable(''),
		placeholder = '',
		expanded = $bindable(false),
		variant = 'contained',
		view = 'docked',
		leading,
		trailing,
		resultsAttributes,
		label = 'Search',
		clearLabel = 'Clear search',
		backLabel = 'Close search',
		onsearch,
		inputAttributes,
		children,
		element = $bindable(),
		inputElement = $bindable(),
		...attributes
	}: SearchProps = $props()

	const uid = $props.id()
	const resultsId = `np-search-results-${uid}`

	/*
	 * A combobox has to own a popup ARIA recognises, so the field claims to be one only when the
	 * results say what they are. Left alone they are ordinary content that appears below the
	 * field, which is what a list, a set of categories or a row of chips actually is.
	 */
	const comboboxPopups = ['listbox', 'tree', 'grid', 'dialog']
	const isCombobox = $derived(comboboxPopups.includes(String(resultsAttributes?.role)))

	/*
	 * A focused text input always matches `:focus-visible`, pointer or not, so the ring is tracked
	 * by hand: it shows only when focus did not arrive under a finger or a mouse.
	 */
	let pointerFocus = false
	let focusRing = $state(false)
</script>

<div
	{...attributes}
	bind:this={element}
	class={[
		'np-search',
		`np-search-${variant}`,
		`np-search-${view}`,
		expanded && 'np-search-expanded',
		attributes.class,
	]}
	onkeydown={(event) => {
		// A key press means whatever takes focus next is being reached with the keyboard.
		pointerFocus = false
		attributes.onkeydown?.(event)
	}}
	onfocusout={(event) => {
		// The open view floats over the page, so it closes the moment focus leaves it.
		const next = event.relatedTarget
		if (expanded && !(next instanceof Node && element?.contains(next))) expanded = false
		attributes.onfocusout?.(event)
	}}
>
	<div class="np-search-container">
		<!-- The click only forwards focus to the input below, which is the actual control. -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class={['np-search-bar', focusRing && 'np-search-focus-ring']}
			onpointerdown={() => (pointerFocus = true)}
			onclick={() => inputElement?.focus()}
		>
			<div class="np-search-state-layer"></div>
			<span class="np-search-leading">
				{#if leading}
					{@render leading()}
				{:else if expanded}
					<IconButton
						title={backLabel}
						onclick={(event) => {
							// Bubbling to the bar's own onclick would refocus the input and reopen the view.
							event.stopPropagation()
							expanded = false
						}}
					>
						<ArrowBackIcon />
					</IconButton>
				{:else}
					<span class="np-search-leading-icon"><SearchIcon /></span>
				{/if}
			</span>

			<input
				{...inputAttributes}
				bind:this={inputElement}
				bind:value
				type="search"
				class="np-search-input"
				{placeholder}
				aria-label={label}
				role={isCombobox ? 'combobox' : undefined}
				aria-expanded={isCombobox ? expanded : undefined}
				aria-autocomplete={isCombobox ? 'list' : undefined}
				aria-controls={resultsId}
				autocomplete="off"
				onpointerdown={(event) => {
					pointerFocus = true
					inputAttributes?.onpointerdown?.(event)
				}}
				onfocus={(event) => {
					expanded = true
					focusRing = !pointerFocus
					pointerFocus = false
					inputAttributes?.onfocus?.(event)
				}}
				onblur={(event) => {
					focusRing = false
					inputAttributes?.onblur?.(event)
				}}
				onkeydown={(event) => {
					if (event.key === 'Enter') onsearch?.(value)
					if (event.key === 'Escape' && expanded) {
						expanded = false
						inputElement?.blur()
					}
					inputAttributes?.onkeydown?.(event)
				}}
			/>

			<span class="np-search-trailing">
				{#if value}
					<IconButton
						title={clearLabel}
						onclick={() => {
							value = ''
							// The focus below is a pointer's doing, so it must not raise the ring.
							pointerFocus = true
							inputElement?.focus()
						}}
					>
						<CloseIcon />
					</IconButton>
				{/if}
				{#if trailing}
					{@render trailing()}
				{/if}
			</span>
		</div>

		<!--
			The container brings no semantics of its own: what goes in it is a list one time and
			categories, avatars and chips the next. `resultsAttributes` is where a role belongs when
			the content has earned one.
		-->
		<div
			{...resultsAttributes}
			id={resultsId}
			class={['np-search-results', resultsAttributes?.class]}
		>
			{@render children?.()}
		</div>
	</div>
</div>

<style>
	.np-search {
		/* SearchBarTokens: 56dp tall, fully rounded, surface-container-high. */
		--_bar-height: 3.5rem;
		/*
		 * M3 Expressive grows the bar by shrinking the margins it keeps to its pane, from 24dp at
		 * rest to 12dp once the view opens. Owning the margin is what makes that growth work
		 * without the consumer having to name two widths.
		 */
		--_pane-margin: var(--np-search-pane-margin, 1.5rem);
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		padding-inline: var(--_pane-margin);
	}
	.np-search-contained.np-search-expanded {
		--_pane-margin: var(--np-search-view-margin, 0.75rem);
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-search {
			transition: padding var(--np-motion-expressive-default-spatial);
		}
	}

	/*
	 * Docked, the bar is all the component takes up in the layout: the view it opens floats over
	 * the page rather than pushing it down, so the margins are the container's own insets.
	 */
	.np-search-docked {
		position: relative;
		block-size: var(--_bar-height);
		padding-inline: 0;
	}

	/*
	 * The container is only a surface in the divided style, where the bar and the results share
	 * one. Contained keeps them apart, 2dp of gap between the two.
	 */
	.np-search-container {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		gap: 0.125rem;
		min-height: 0;
		/* Container width is 360dp at the least and 720dp at the most. */
		width: 100%;
		min-width: min(22.5rem, 100%);
		max-width: var(--np-search-width, 45rem);
		margin-inline: auto;
	}
	.np-search-docked .np-search-container {
		position: absolute;
		inset-block-start: 0;
		inset-inline: var(--_pane-margin);
		/*
		 * A definite `width` rather than `auto`, which resolves outside the transition engine and
		 * would snap the pane to its grown width the instant the class changes instead of easing
		 * it in with the insets.
		 */
		width: calc(100% - 2 * var(--_pane-margin));
		/*
		 * An absolutely positioned box measures a percentage against the whole component, margins
		 * included, so the floor has to leave room for them or a narrow host overflows. Also
		 * transitioned below, in step with `width`, or it would snap to its own end value early
		 * and clamp the still-transitioning `width` to it for the whole animation.
		 */
		min-width: min(22.5rem, calc(100% - 2 * var(--_pane-margin)));
		z-index: var(--np-search-z-index, 3);
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-search-docked .np-search-container {
			transition:
				inset-inline-start var(--np-motion-expressive-default-spatial),
				inset-inline-end var(--np-motion-expressive-default-spatial),
				width var(--np-motion-expressive-default-spatial),
				min-width var(--np-motion-expressive-default-spatial);
		}

		/*
		 * The view unrolls from under the bar rather than arriving whole. Clipping is what does it,
		 * so nothing about the bar moves and the pane's shape, rule and shadow are all uncovered
		 * together, however tall the list turns out to be.
		 */
		.np-search-docked.np-search-expanded .np-search-container {
			animation: unroll var(--np-motion-expressive-default-spatial);
		}
		.np-search-docked.np-search-expanded .np-search-results {
			animation: fadeIn var(--np-motion-expressive-default-effects);
		}
	}
	/* The clip is held off the edges so that it never cuts the shadow while it plays. */
	@keyframes unroll {
		from {
			clip-path: inset(-1.5rem -1.5rem calc(100% - var(--_bar-height)) -1.5rem);
		}
		to {
			clip-path: inset(-1.5rem);
		}
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
	}

	.np-search-bar {
		position: relative;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		flex: none;
		/*
		 * 8dp of padding and 8dp of gap put the glyphs 16dp inside the bar and the input text 16dp
		 * past them, which is what the spec measures. The spec reaches those numbers with 48dp tap
		 * targets and 4dp of space; the library's icon buttons are 40dp, so the space absorbs the
		 * difference.
		 */
		gap: 0.5rem;
		padding-inline: 0.5rem;
		height: var(--_bar-height);
		border-radius: var(--np-search-shape, var(--np-shape-corner-full));
		background-color: var(--np-search-container-color, var(--np-color-surface-container-high));
		color: var(--np-color-on-surface);
	}
	.np-search:not(.np-search-expanded) .np-search-bar {
		cursor: pointer;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-search-bar {
			transition:
				height var(--np-motion-expressive-default-spatial),
				background-color var(--np-motion-expressive-fast-effects);
		}
	}

	/* The bar is a tap target at rest. Once the view is open it is a header, and takes no states. */
	.np-search-state-layer {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
		background-color: var(--np-color-on-surface);
		opacity: 0;
	}
	@media (hover: hover) {
		.np-search:not(.np-search-expanded) .np-search-bar:hover .np-search-state-layer {
			opacity: 0.08;
		}
	}
	.np-search:not(.np-search-expanded) .np-search-bar:active .np-search-state-layer {
		opacity: 0.1;
	}

	/* Positioned, so the bar's content paints over the state layer rather than under it. */
	.np-search-leading,
	.np-search-trailing,
	.np-search-input {
		position: relative;
	}

	.np-search-leading,
	.np-search-trailing {
		display: flex;
		align-items: center;
		flex: none;
	}
	/* Trailing actions sit flush against one another. */
	.np-search-trailing {
		gap: 0;
	}
	/* LeadingIconColor is on-surface; trailing is on-surface-variant. */
	.np-search-leading {
		--np-icon-button-icon-color: var(--np-color-on-surface);
	}
	.np-search-trailing {
		--np-icon-button-icon-color: var(--np-color-on-surface-variant);
	}
	/* Sized like the icon button that replaces it, so the glyph holds still as the view opens. */
	.np-search-leading-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		block-size: 2.5rem;
		inline-size: 2.5rem;
		fill: var(--np-color-on-surface);
	}

	.np-search-input {
		flex: 1;
		min-width: 0;
		appearance: none;
		border: none;
		outline: none;
		background: none;
		font: inherit;
		/* InputTextFont is body-large. */
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: 0.03125rem;
		color: var(--np-color-on-surface);
		padding: 0;
		cursor: inherit;
	}
	.np-search-input::placeholder {
		color: var(--np-color-on-surface-variant);
		opacity: 1;
	}
	/* The type="search" clear affordance would duplicate the component's own. */
	.np-search-input::-webkit-search-cancel-button {
		appearance: none;
	}

	.np-search-focus-ring {
		outline-style: solid;
		outline-color: var(--np-search-focus-indicator-color, var(--np-color-secondary));
		outline-width: 3px;
		outline-offset: 2px;
	}
	@media (prefers-reduced-motion: no-preference) {
		.np-search-focus-ring {
			animation: focusAnimation var(--np-motion-expressive-slow-effects) forwards;
		}
	}

	/* Results are only in the layout, and only in the accessibility tree, once expanded. */
	.np-search-results {
		display: none;
		box-sizing: border-box;
		overflow-y: auto;
		overscroll-behavior: contain;
	}
	.np-search-expanded .np-search-results {
		display: block;
	}

	/* Docked: the results sit under the field, growing to two thirds of the screen at the most. */
	.np-search-docked .np-search-results {
		max-height: var(--np-search-results-max-height, 66.6667dvh);
	}
	/* Contained docks them as their own 12dp pane. */
	.np-search-contained.np-search-docked .np-search-results {
		border-radius: var(--np-search-results-shape, var(--np-shape-corner-medium));
		background-color: var(--np-search-container-color, var(--np-color-surface-container-high));
	}

	/*
	 * Divided (baseline) folds the field and the results into one 28dp container, separated by a
	 * rule. Contained keeps the pill, which is what M3 recommends.
	 */
	.np-search-divided.np-search-expanded .np-search-bar {
		border-radius: 0;
		background-color: transparent;
		border-block-end: 1px solid var(--np-search-divider-color, var(--np-color-outline));
	}
	.np-search-divided.np-search-docked.np-search-expanded .np-search-container {
		gap: 0;
		border-radius: var(--np-search-results-shape, var(--np-shape-corner-extra-large));
		background-color: var(--np-search-container-color, var(--np-color-surface-container-high));
	}
	/*
	 * The results round off the container's bottom corners themselves, rather than the container
	 * clipping them, which would take the header's focus ring with it.
	 */
	.np-search-divided.np-search-docked.np-search-expanded .np-search-results {
		border-end-start-radius: inherit;
		border-end-end-radius: inherit;
	}

	/* Full screen: the field and its results take over the viewport, and the view has no shape. */
	.np-search-full-screen.np-search-expanded {
		position: fixed;
		inset: 0;
		z-index: var(--np-search-z-index, 24);
		/* The pill needs the same room above it that it keeps at its sides. */
		padding-block-start: var(--_pane-margin);
		background-color: var(--np-search-view-background-color, var(--np-color-surface-container-low));
	}
	.np-search-full-screen.np-search-expanded .np-search-container {
		flex: 1;
		max-width: none;
	}
	.np-search-full-screen.np-search-expanded .np-search-results {
		flex: 1;
		max-height: none;
	}
	/*
	 * Contained holds the 56dp bar in full screen too. Only the divided header grows to 72dp, and
	 * it runs edge to edge on the view's own surface.
	 */
	.np-search-divided.np-search-full-screen.np-search-expanded {
		padding: 0;
		background-color: var(--np-search-container-color, var(--np-color-surface-container-high));
	}
	.np-search-divided.np-search-full-screen.np-search-expanded .np-search-bar {
		height: 4.5rem;
	}
</style>
