<script lang="ts">
	import FabMenu from './FabMenu.svelte'
	import FabMenuItem from './FabMenuItem.svelte'
	import type { FabMenuProps } from './types.js'

	let { variant = 'primary-container' }: { variant?: FabMenuProps['variant'] } = $props()
</script>

<div style="margin-block:22rem 2rem;display:flex;justify-content:center">
	<FabMenu label="Create" {variant}>
		{#snippet icon()}<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>{/snippet}
		<FabMenuItem>Album</FabMenuItem>
		<FabMenuItem>Photo</FabMenuItem>
		<FabMenuItem>Video</FabMenuItem>
	</FabMenu>
</div>
