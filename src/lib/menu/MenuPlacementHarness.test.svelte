<script lang="ts">
	import Menu from './Menu.svelte'
	import MenuItem from './MenuItem.svelte'

	let {
		top = 0,
		left = 0,
		items = 4,
		coverAnchor,
		menuStyle = '',
	}: {
		top?: number
		left?: number
		items?: number
		coverAnchor?: boolean
		menuStyle?: string
	} = $props()

	let anchorElement = $state<HTMLElement>()
</script>

<button
	type="button"
	id="placement-anchor"
	popovertarget="placement-menu"
	bind:this={anchorElement}
	style="position:fixed;top:{top}px;left:{left}px;width:120px;height:40px;anchor-name:--placement"
>
	Open the menu
</button>

<Menu
	anchor={anchorElement}
	id="placement-menu"
	style="position-anchor:--placement;{menuStyle}"
	{coverAnchor}
>
	{#each Array.from({ length: items }, (_, index) => index) as index (index)}
		<MenuItem>Item {index + 1}</MenuItem>
	{/each}
</Menu>
