<script lang="ts">
	import Divider from '#lib/divider/Divider.svelte'
	import type { DialogProps } from './types.ts'

	let {
		element = $bindable(),
		quick = false,
		children,
		headline,
		icon,
		supportingText,
		actions,
		divider,
		ontoggle,
		// Naming attributes belong on the element that carries role="dialog", not on the popover
		// container the rest of the attributes are spread onto.
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		...attributes
	}: DialogProps = $props()

	const uid = $props.id()

	let dialogEl: HTMLDivElement | undefined = $state()
	let previouslyFocused: HTMLElement | undefined
	let inerted: HTMLElement[] = []

	export const showPopover = () => {
		element?.showPopover()
	}

	export const hidePopover = () => {
		element?.hidePopover()
	}

	const trapFocus = () => {
		if (!element) return
		previouslyFocused = document.activeElement as HTMLElement | undefined
		for (let node: HTMLElement | null = element; node && node !== document.body;) {
			const parent: HTMLElement | null = node.parentElement
			if (!parent) break
			for (const sibling of parent.children) {
				if (sibling === node || !(sibling instanceof HTMLElement) || sibling.inert) continue
				sibling.inert = true
				inerted.push(sibling)
			}
			node = parent
		}
		dialogEl?.focus()
	}

	const releaseFocus = () => {
		for (const node of inerted) node.inert = false
		inerted = []
		previouslyFocused?.focus?.()
		previouslyFocused = undefined
	}
</script>

<div
	bind:this={element}
	{...attributes}
	popover="auto"
	ontoggle={(event) => {
		if (event.newState === 'open') {
			trapFocus()
		} else {
			releaseFocus()
		}
		ontoggle?.(event)
	}}
	class={['np-dialog-container', !quick && 'np-animate', attributes.class]}
>
	<div
		role="none"
		class="np-backdrop"
		onclick={() => {
			hidePopover()
		}}
	></div>
	<div
		bind:this={dialogEl}
		class="np-dialog"
		role="dialog"
		tabindex="-1"
		aria-modal="true"
		aria-label={ariaLabel}
		aria-labelledby={ariaLabelledby ?? (headline ? `${uid}-dialog-headline` : undefined)}
		aria-describedby={supportingText ? `${uid}-dialog-supporting-text` : undefined}
	>
		{#if icon}
			<div class="np-dialog-icon">
				{@render icon()}
			</div>
		{/if}
		{#if headline}
			<h1
				id="{uid}-dialog-headline"
				class="np-dialog-headline"
				style={icon ? 'text-align: center' : ''}
			>
				{headline}
			</h1>
		{/if}
		{#if supportingText}
			<p id="{uid}-dialog-supporting-text" class="np-dialog-supporting-text">{supportingText}</p>
		{/if}
		{#if divider}
			<Divider style="margin-top: 1rem" --np-divider-color="var(--np-color-outline)" />
		{/if}
		{#if children}
			<div class="np-dialog-scroller">
				{@render children()}
			</div>
		{/if}
		{#if actions}
			<div class="np-dialog-actions">
				{@render actions()}
			</div>
		{/if}
	</div>
</div>

<style>
	.np-dialog-container {
		background: transparent;
		border: none;
		margin: auto;
		padding: var(--np-dialog-inset, 2rem 1rem);
		box-sizing: border-box;
		min-width: var(--np-dialog-container-min-width, 19.5rem);
		width: var(--np-dialog-container-width, 37rem);
		max-width: 100%;
	}
	.np-dialog {
		border: 0;
		background-color: var(--np-dialog-container-color, var(--np-color-surface));
		color: var(--np-color-on-surface);
		padding: var(--np-dialog-padding, 1.5rem);
		border-radius: var(--np-dialog-container-shape, var(--np-shape-corner-extra-large));
		box-shadow: var(--np-dialog-elevation, var(--np-elevation-3));
		max-height: var(--np-dialog-max-height, calc(100dvh - 3rem));
		scrollbar-color: var(--np-color-on-surface-variant) transparent;
		scrollbar-width: thin;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.np-dialog-scroller {
		overflow-y: auto;
		display: flex;
		flex: 1 1 0%;
		flex-direction: column;
	}

	.np-animate[popover] {
		transition:
			opacity var(--np-motion-expressive-slow-effects),
			display var(--np-motion-expressive-slow-effects) allow-discrete,
			overlay var(--np-motion-expressive-slow-effects) allow-discrete;
		opacity: 0;
	}
	.np-animate[popover]:popover-open {
		opacity: 1;
		@starting-style {
			opacity: 0;
		}
	}
	.np-dialog-container[popover] .np-backdrop {
		inset: 0;
		position: fixed;
		background-color: var(--np-color-scrim);
		opacity: 0.32;
	}
	.np-dialog:focus-visible {
		outline: none;
	}

	.np-dialog-icon {
		color: var(--np-color-secondary);
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}
	.np-dialog-headline {
		margin: 0 0 1rem 0;
		padding: 0;
		line-height: 2rem;
		font-size: 1.5rem;
		font-weight: 400;
	}
	.np-dialog-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		box-sizing: border-box;
		margin-top: 1.5rem;
	}
	.np-dialog-supporting-text {
		margin: 0;
		padding: 0;
		line-height: 1.25rem;
		font-size: 0.875rem;
		font-weight: 400;
		color: var(--np-color-on-surface-variant);
	}
</style>
