<script lang="ts">
	import { arrowKeyNav, focusableItems, focusedItem, rovingTabindex } from '#lib/keyboard-nav.js'
	import type { ChipSetProps } from './types.js'

	let { children, element = $bindable(), ...attributes }: ChipSetProps = $props()

	const CHIP_SELECTOR = "input:not([type='hidden']), button, a[href]"
	const attach = rovingTabindex(CHIP_SELECTOR, {
		currentAttr: 'aria-current',
		currentValue: 'true',
	})
	const arrows = arrowKeyNav(CHIP_SELECTOR, 'horizontal')

	// In a set that wraps, ↑ and ↓ move to the chip closest above or below the focused one.
	const toRow = (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		const chips = focusableItems(event.currentTarget, CHIP_SELECTOR)
		const focused = focusedItem(event.currentTarget, CHIP_SELECTOR, chips)
		if (!focused) return
		const from = focused.getBoundingClientRect()
		const fromX = from.left + from.width / 2
		const below = event.key === 'ArrowDown'
		const candidates = chips
			.map((chip) => ({ chip, box: chip.getBoundingClientRect() }))
			.filter(({ box }) => (below ? box.top >= from.bottom : box.bottom <= from.top))
		if (!candidates.length) return
		const rowTop = below
			? Math.min(...candidates.map(({ box }) => box.top))
			: Math.max(...candidates.map(({ box }) => box.top))
		const row = candidates.filter(({ box }) => Math.abs(box.top - rowTop) < 1)
		const distance = (box: DOMRect) => Math.abs(box.left + box.width / 2 - fromX)
		row.sort((a, b) => distance(a.box) - distance(b.box))[0].chip.focus()
		event.preventDefault()
	}

	const onkeydown = (event: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') toRow(event)
		else arrows(event)
	}
</script>

<div {...attributes} bind:this={element} class={['np-chip-set-wrapper', attributes.class]}>
	{#if children}
		<div {@attach attach} class={['np-chip-set']} role="toolbar" tabindex="-1" {onkeydown}>
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.np-chip-set-wrapper {
		overflow: auto;
		padding: 0.5rem;
		margin: -0.5rem;
	}
	.np-chip-set-wrapper:has(.np-chip-set > :global(*)) {
		margin-inline-end: 0;
	}
	.np-chip-set {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
		min-width: 0;
	}
</style>
