<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte'
	import Button from '#lib/button/Button.svelte'
	import FabMenu from './FabMenu.svelte'
	import type { FabMenuProps } from './types.js'

	let {
		open = $bindable(false),
		placement = 'block-start',
		size = 's',
	}: {
		open?: boolean
		placement?: FabMenuProps['placement']
		size?: FabMenuProps['size']
	} = $props()
</script>

<div style="margin-block:10rem;display:flex;justify-content:center">
	<FabMenu bind:open {placement} {size} label="Create">
		{#snippet icon()}<Icon>add</Icon>{/snippet}
		<Button role="menuitem" variant="tonal">New document</Button>
		<Button role="menuitem" variant="tonal">New folder</Button>
		<Button role="menuitem" variant="tonal">Upload</Button>
	</FabMenu>
</div>
