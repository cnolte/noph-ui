<script lang="ts">
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Toolbar from './Toolbar.svelte'
	import type { ToolbarProps } from './types.ts'

	let {
		variant = 'docked',
		orientation = 'horizontal',
		placement = 'bottom',
	}: {
		variant?: ToolbarProps['variant']
		orientation?: ToolbarProps['orientation']
		placement?: ToolbarProps['placement']
	} = $props()
</script>

<Toolbar {variant} {orientation} {placement} aria-label="Actions">
	<IconButton title="Favorite"><Icon>favorite</Icon></IconButton>
	<IconButton title="Search"><Icon>search</Icon></IconButton>
	<IconButton title="Delete"><Icon>delete</Icon></IconButton>
</Toolbar>
