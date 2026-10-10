<script lang="ts">
	import { arrowKeyNav, rovingTabindex } from '#lib/keyboard-nav.js'
	import { setListContext } from './context.js'
	import type { ListProps } from './types.js'

	let { element = $bindable(), selection, children, ...attributes }: ListProps = $props()

	setListContext({
		get selection() {
			return selection
		},
	})

	// The actions in a list share one tab stop, on the selected item or else the first. ↓ and → move
	// to the next action, ↑ and ← back, wrapping at the ends.
	const ACTIONS = "a[href], button, input:not([type='hidden']), select, textarea"
	const roving = rovingTabindex(ACTIONS, {
		current: "[aria-selected='true'], [aria-current]:not([aria-current='false']), .selected",
	})
	const arrows = arrowKeyNav(ACTIONS, 'both')
</script>

<ul
	bind:this={element}
	role={selection ? 'listbox' : undefined}
	aria-multiselectable={selection === 'multiple' ? 'true' : undefined}
	{...attributes}
	{@attach roving}
	onkeydown={(event) => {
		attributes.onkeydown?.(event)
		if (event.defaultPrevented) return
		arrows(event)
		// Every action follows Space and Enter, links included.
		const target = event.target
		if (event.key === ' ' && target instanceof HTMLAnchorElement && target.matches(ACTIONS)) {
			event.preventDefault()
			target.click()
		}
	}}
>
	{#if children}
		{@render children()}
	{/if}
</ul>

<style>
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
</style>
