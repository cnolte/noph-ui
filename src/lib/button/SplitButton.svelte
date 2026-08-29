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
	:global(.np-split-button-trigger svg) {
		transition: rotate var(--np-motion-expressive-fast-effects);
	}
	:global(.np-split-button-trigger[aria-expanded='true'] svg) {
		rotate: 180deg;
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
