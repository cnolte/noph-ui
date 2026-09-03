<script lang="ts">
	import { flushSync } from 'svelte'
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

	const comboboxPopups = ['listbox', 'tree', 'grid', 'dialog']
	const isCombobox = $derived(comboboxPopups.includes(String(resultsAttributes?.role)))

	let pointerFocus = false
	let focusRing = $state(false)
	let pointerInside = false

	export const show = () => {
		expanded = true
		pointerFocus = true
		flushSync()
		inputElement?.focus()
	}

	export const close = () => {
		expanded = false
		inputElement?.blur()
	}
</script>

<svelte:window
	onpointerdown={(event) => {
		pointerInside = event.target instanceof Node && element?.contains(event.target) === true
	}}
	onpointercancel={() => (pointerInside = false)}
	onclick={() => (pointerInside = false)}
/>

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
		pointerFocus = false
		attributes.onkeydown?.(event)
	}}
	onfocusout={(event) => {
		const next = event.relatedTarget
		if (expanded && !pointerInside && !(next instanceof Node && element?.contains(next)))
			expanded = false
		attributes.onfocusout?.(event)
	}}
>
	<div class="np-search-container">
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
		--_bar-height: 3.5rem;
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

	.np-search-docked {
		position: relative;
		block-size: var(--_bar-height);
		padding-inline: 0;
	}

	.np-search-container {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		gap: 0.125rem;
		min-height: 0;
		width: 100%;
		min-width: min(22.5rem, 100%);
		max-width: var(--np-search-width, 45rem);
		margin-inline: auto;
	}
	.np-search-docked .np-search-container {
		position: absolute;
		inset-block-start: 0;
		inset-inline: var(--_pane-margin);
		width: calc(100% - 2 * var(--_pane-margin));
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

		.np-search-docked.np-search-expanded .np-search-results {
			animation:
				unroll var(--np-motion-expressive-default-spatial),
				fadeIn var(--np-motion-expressive-default-effects);
		}
	}
	@keyframes unroll {
		from {
			clip-path: inset(0 -1.5rem 100% -1.5rem);
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
				background-color var(--np-motion-expressive-fast-effects),
				border-start-start-radius var(--np-motion-expressive-fast-effects),
				border-start-end-radius var(--np-motion-expressive-fast-effects);
		}
	}

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
	.np-search-trailing {
		gap: 0;
	}
	.np-search-leading {
		--np-icon-button-icon-color: var(--np-color-on-surface);
	}
	.np-search-trailing {
		--np-icon-button-icon-color: var(--np-color-on-surface-variant);
	}
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

	.np-search-results {
		display: none;
		box-sizing: border-box;
		overflow-y: auto;
		overscroll-behavior: contain;
	}
	.np-search-expanded .np-search-results {
		display: block;
	}

	.np-search-docked .np-search-results {
		max-height: var(--np-search-results-max-height, 66.6667dvh);
	}
	.np-search-contained.np-search-docked .np-search-results {
		border-radius: var(--np-search-results-shape, var(--np-shape-corner-medium));
		background-color: var(--np-search-container-color, var(--np-color-surface-container-high));
	}

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
	.np-search-divided.np-search-docked.np-search-expanded .np-search-results {
		border-end-start-radius: inherit;
		border-end-end-radius: inherit;
	}

	.np-search-full-screen.np-search-expanded {
		position: fixed;
		inset: 0;
		z-index: var(--np-search-z-index, 24);
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
	.np-search-divided.np-search-full-screen.np-search-expanded {
		padding: 0;
		background-color: var(--np-search-container-color, var(--np-color-surface-container-high));
	}
	.np-search-divided.np-search-full-screen.np-search-expanded .np-search-bar {
		height: 4.5rem;
	}

	@media (prefers-reduced-motion: no-preference) {
		@starting-style {
			.np-search-full-screen.np-search-expanded,
			.np-search-divided.np-search-full-screen.np-search-expanded {
				padding-block-start: 0;
				padding-inline: var(--np-search-pane-margin, 1.5rem);
			}
		}
	}
</style>
