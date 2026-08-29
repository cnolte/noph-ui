<script lang="ts">
	import ChevronDownIcon from '#lib/icons/ChevronDownIcon.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import Button from './Button.svelte'
	import ButtonGroup from './ButtonGroup.svelte'
	import type { SplitButtonProps } from './types.ts'

	let {
		label = '',
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

	// The trailing half is the menu's invoker, so it is also the popover's implicit anchor.
	let trigger: HTMLElement | undefined = $state()
</script>

{#snippet caret()}
	<ChevronDownIcon />
{/snippet}

<ButtonGroup
	{...attributes}
	bind:element
	variant="connected"
	class={['np-split-button', attributes.class]}
>
	<Button {variant} {size} {disabled} {onclick} start={icon}>{label}</Button>
	<!--
		A `Button` rather than an `IconButton`, because an icon button has no `elevated` variant and
		a split button's two halves have to match.
	-->
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
	<Menu id={menuId} anchor={trigger} bind:open coverAnchor={false}>
		{@render menu?.(menuId)}
	</Menu>
</ButtonGroup>

<style>
	/* The caret turns over while the menu is open, the way the select arrow does. */
	:global(.np-split-button-trigger svg) {
		transition: rotate var(--np-motion-expressive-fast-effects);
	}
	:global(.np-split-button-trigger[aria-expanded='true'] svg) {
		rotate: 180deg;
	}
	/*
		The trailing half only holds a caret, so it does not need a full button's width. It is
		square rather than merely narrow, because every size sets its round corner to half its
		height, and only on a square does that corner come out as a true circle.
	*/
	:global(.np-split-button > .np-split-button-trigger) {
		--np-button-padding: 0;
		aspect-ratio: 1;
		justify-content: center;
	}
	/*
		While the menu is open the trailing half reads as selected: its inner corner rounds out to
		the outer one, so the half becomes a circle, and it keeps a state layer up. Overriding the
		group's inner corner rather than `border-radius` leaves ButtonGroup's own corner rules in
		charge of which corner is which.
	*/
	:global(.np-split-button > .np-split-button-trigger[aria-expanded='true']) {
		--np-button-group-inner-corner: var(--_round-radius, var(--np-shape-corner-full));
	}
	:global(.np-split-button-trigger[aria-expanded='true'] .np-ripple-surface::before) {
		opacity: var(--np-ripple-hover-opacity, 0.08);
	}
</style>
