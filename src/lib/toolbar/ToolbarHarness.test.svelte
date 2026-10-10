<script lang="ts">
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Toolbar from './Toolbar.svelte'
	import type { ToolbarProps } from './types.js'

	let {
		variant = 'docked',
		orientation = 'horizontal',
		placement = 'bottom',
		color = 'standard',
	}: {
		variant?: ToolbarProps['variant']
		orientation?: ToolbarProps['orientation']
		placement?: ToolbarProps['placement']
		color?: ToolbarProps['color']
	} = $props()
</script>

<Toolbar {variant} {orientation} {placement} {color} aria-label="Actions">
	<IconButton title="Bold" variant="tonal" toggle><Icon>format_bold</Icon></IconButton>
	<IconButton title="Favorite"><Icon>favorite</Icon></IconButton>
	<IconButton title="Search"><Icon>search</Icon></IconButton>
	<IconButton title="Delete"><Icon>delete</Icon></IconButton>
</Toolbar>
