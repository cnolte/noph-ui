<script lang="ts">
	import ChevronDownIcon from '#lib/icons/ChevronDownIcon.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import Button from './Button.svelte'
	import ButtonGroup from './ButtonGroup.svelte'
	import type { SplitButtonProps } from './types.js'

	let {
		label = '',
		iconOnly = false,
		icon,
		menu,
		variant = 'filled',
		size = 's',
		disabled = false,
		open = $bindable(false),
		menuLabel = 'More options',
		onclick,
		element = $bindable(),
		...attributes
	}: SplitButtonProps = $props()

	const uid = $props.id()
	const menuId = `np-split-button-menu-${uid}`

	let trigger: HTMLElement | undefined = $state()
</script>

{#snippet caret()}
	<ChevronDownIcon />
{/snippet}

<!-- Tab moves from the leading to the trailing button, the arrow keys are not needed. -->
<ButtonGroup
	{...attributes}
	bind:element
	variant="connected"
	arrowKeys={false}
	class={['np-split-button', attributes.class]}
>
	{#if iconOnly}
		<Button {variant} {size} {disabled} {onclick} start={icon} title={label} />
	{:else}
		<Button {variant} {size} {disabled} {onclick} start={icon}>{label}</Button>
	{/if}
	<Button
		{variant}
		{size}
		{disabled}
		bind:element={trigger}
		class="np-split-button-trigger"
		command="toggle-popover"
		commandfor={menuId}
		aria-haspopup="menu"
		aria-expanded={open}
		aria-label={menuLabel}
		start={caret}
	/>
	<Menu id={menuId} anchor={trigger} bind:open coverAnchor={false} style="--np-menu-margin: 4px">
		{@render menu?.(menuId)}
	</Menu>
</ButtonGroup>

<style>
	/* A split button keeps its own width instead of spanning its container like other connected
	   groups. */
	:global(.np-button-group.np-split-button) {
		display: inline-flex;
	}
	:global(.np-split-button > .np-button) {
		flex: none;
	}

	/* The inner corners per size, rounder while hovered, focused or pressed. */
	:global(.np-split-button > .np-button) {
		--np-button-group-inner-corner: var(--_split-inner, 0.25rem);
		--np-button-group-pressed-inner-corner: var(--_split-inner-active, 0.75rem);
	}
	:global(.np-split-button > .np-button:is(:focus-visible, :active, .pressed)) {
		--_split-inner: var(--_split-inner-active, 0.75rem);
	}
	@media (hover: hover) {
		:global(.np-split-button > .np-button:hover) {
			--_split-inner: var(--_split-inner-active, 0.75rem);
		}
	}
	/* Pressed, only the inner corners change, the outer ends stay round. */
	@media (prefers-reduced-motion: no-preference) {
		:global(.np-split-button > .np-button:not(.np-split-button-trigger):is(:active, .pressed)) {
			border-start-start-radius: var(--_round-radius);
			border-end-start-radius: var(--_round-radius);
		}
		:global(.np-split-button > .np-split-button-trigger:is(:active, .pressed)) {
			border-start-end-radius: var(--_round-radius);
			border-end-end-radius: var(--_round-radius);
		}
	}
	:global(.np-split-button > .xs) {
		--_split-inner-active: 0.5rem;
	}
	:global(.np-split-button > .l) {
		--_split-inner: 0.5rem;
		--_split-inner-active: 1.25rem;
	}
	:global(.np-split-button > .xl) {
		--_split-inner: 0.75rem;
		--_split-inner-active: 1.25rem;
	}

	/* Closed, the caret sits a little toward the leading button; open, it is centered. */
	:global(.np-split-button-trigger .button-icon) {
		position: relative;
		inset-inline-start: var(--_caret-offset, -1px);
	}
	:global(.np-split-button-trigger.m .button-icon) {
		--_caret-offset: -2px;
	}
	:global(.np-split-button-trigger.l .button-icon) {
		--_caret-offset: -3px;
	}
	:global(.np-split-button-trigger.xl .button-icon) {
		--_caret-offset: -6px;
	}
	:global(.np-split-button-trigger[aria-expanded='true'] .button-icon) {
		--_caret-offset: 0px;
	}
	:global(.np-split-button-trigger[aria-expanded='true'] svg) {
		rotate: 180deg;
	}
	@media (prefers-reduced-motion: no-preference) {
		:global(.np-split-button-trigger svg) {
			transition: rotate var(--np-motion-standard-fast-spatial);
		}
		:global(.np-split-button-trigger .button-icon) {
			transition: inset-inline-start var(--np-motion-standard-fast-spatial);
		}
	}
	:global(.np-split-button > .np-split-button-trigger) {
		--np-button-padding: 0;
		aspect-ratio: 1;
		justify-content: center;
	}
	:global(.np-split-button > .np-split-button-trigger[aria-expanded='true']) {
		--np-button-group-inner-corner: var(--_round-radius, var(--np-shape-corner-full));
	}
	:global(.np-split-button-trigger[aria-expanded='true'] .np-ripple-surface::before) {
		opacity: var(--np-ripple-hover-opacity, 0.08);
	}
</style>
