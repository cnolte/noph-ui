<script lang="ts">
	import { syncOpenEffect } from '#lib/popover.svelte.js'
	import type { SheetProps } from './types.ts'

	let {
		open = $bindable(false),
		modal = true,
		placement = 'bottom',
		handle = true,
		headline,
		action,
		children,
		element = $bindable(),
		onclose,
		ontoggle,
		...attributes
	}: SheetProps = $props()

	const uid = $props.id()
	const headlineId = `np-sheet-headline-${uid}`

	export const show = () => {
		if (!element || element.open) return
		if (modal) element.showModal()
		else element.show()
	}

	export const close = () => {
		element?.close()
	}

	syncOpenEffect(
		() => element,
		() => open,
		show,
		close,
	)
</script>

<dialog
	{...attributes}
	bind:this={element}
	tabindex="-1"
	closedby={modal ? 'any' : 'none'}
	aria-labelledby={headline ? headlineId : attributes['aria-labelledby']}
	class={['np-sheet', `np-sheet-${placement}`, modal && 'np-sheet-modal', attributes.class]}
	onclose={(event) => {
		open = false
		onclose?.(event)
	}}
	ontoggle={(event) => {
		open = event.newState === 'open'
		if (event.newState === 'open') element?.focus()
		ontoggle?.(event)
	}}
	onclick={(event) => {
		if (modal && event.target === element) close()
	}}
>
	{#if handle && placement === 'bottom'}
		<div class="np-sheet-handle" aria-hidden="true"></div>
	{/if}
	{#if headline || action}
		<div class="np-sheet-header">
			{#if headline}
				<h2 id={headlineId} class="np-sheet-headline">{headline}</h2>
			{/if}
			{#if action}
				<div class="np-sheet-action">{@render action()}</div>
			{/if}
		</div>
	{/if}
	<div class="np-sheet-content">
		{@render children?.()}
	</div>
</dialog>

<style>
	.np-sheet {
		position: fixed;
		outline: none;
		z-index: var(--np-sheet-z-index, 24);
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: none;
		max-width: none;
		max-height: none;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: var(--np-sheet-container-color, var(--np-color-surface-container-low));
		color: var(--np-color-on-surface);
		box-shadow: var(--np-sheet-elevation, var(--np-elevation-1));
	}

	.np-sheet:not([open]) {
		display: none;
	}

	.np-sheet-bottom,
	.np-sheet-top {
		inset-inline: 0;
		width: 100%;
		max-height: var(--np-sheet-size, 50dvh);
	}
	.np-sheet-bottom {
		inset-block-end: 0;
		inset-block-start: auto;
		border-start-start-radius: var(--np-sheet-shape, var(--np-shape-corner-extra-large));
		border-start-end-radius: var(--np-sheet-shape, var(--np-shape-corner-extra-large));
	}
	.np-sheet-top {
		inset-block-start: 0;
		inset-block-end: auto;
		border-end-start-radius: var(--np-sheet-shape, var(--np-shape-corner-extra-large));
		border-end-end-radius: var(--np-sheet-shape, var(--np-shape-corner-extra-large));
	}

	.np-sheet-start,
	.np-sheet-end {
		inset-block: 0;
		height: 100dvh;
		width: var(--np-sheet-size, 20rem);
		max-width: 100%;
	}
	.np-sheet-start {
		inset-inline-start: 0;
		inset-inline-end: auto;
		border-start-end-radius: var(--np-sheet-shape, var(--np-shape-corner-large));
		border-end-end-radius: var(--np-sheet-shape, var(--np-shape-corner-large));
	}
	.np-sheet-end {
		inset-inline-end: 0;
		inset-inline-start: auto;
		border-start-start-radius: var(--np-sheet-shape, var(--np-shape-corner-large));
		border-end-start-radius: var(--np-sheet-shape, var(--np-shape-corner-large));
	}

	.np-sheet-handle {
		flex: none;
		width: 2rem;
		height: 0.25rem;
		margin: 1rem auto 0;
		border-radius: var(--np-shape-corner-full);
		background-color: var(--np-sheet-handle-color, var(--np-color-outline-variant));
	}

	.np-sheet-header {
		flex: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 1.5rem 0;
	}
	.np-sheet-headline {
		flex: 1;
		margin: 0;
		font-size: 1.5rem;
		line-height: 2rem;
		font-weight: 400;
	}
	.np-sheet-action {
		flex: none;
		display: flex;
	}

	.np-sheet-content {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: 1rem 1.5rem 1.5rem;
	}

	.np-sheet-modal::backdrop {
		background-color: var(--np-color-scrim);
		opacity: 0.32;
	}

	@media (prefers-reduced-motion: no-preference) {
		.np-sheet {
			transition:
				translate var(--np-motion-expressive-default-spatial),
				display var(--np-motion-expressive-default-spatial) allow-discrete,
				overlay var(--np-motion-expressive-default-spatial) allow-discrete;
		}
		.np-sheet::backdrop {
			transition:
				opacity var(--np-motion-expressive-fast-effects),
				display var(--np-motion-expressive-fast-effects) allow-discrete,
				overlay var(--np-motion-expressive-fast-effects) allow-discrete;
		}

		.np-sheet-bottom {
			translate: 0 100%;
		}
		.np-sheet-top {
			translate: 0 -100%;
		}
		.np-sheet-start {
			translate: -100% 0;
		}
		.np-sheet-end {
			translate: 100% 0;
		}
		.np-sheet[open] {
			translate: 0 0;
		}
		@starting-style {
			.np-sheet-bottom[open] {
				translate: 0 100%;
			}
			.np-sheet-top[open] {
				translate: 0 -100%;
			}
			.np-sheet-start[open] {
				translate: -100% 0;
			}
			.np-sheet-end[open] {
				translate: 100% 0;
			}
		}

		.np-sheet-modal::backdrop {
			opacity: 0;
		}
		.np-sheet-modal[open]::backdrop {
			opacity: 0.32;
			@starting-style {
				opacity: 0;
			}
		}
	}
</style>
