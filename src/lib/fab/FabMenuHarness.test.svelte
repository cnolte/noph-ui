<script lang="ts">
	import Icon from '#lib/icons/Icon.svelte'
	import Button from '#lib/button/Button.svelte'
	import FabMenu from './FabMenu.svelte'
	import type { FabMenuProps } from './types.ts'

	let {
		open = $bindable(false),
		placement = 'block-start',
	}: { open?: boolean; placement?: FabMenuProps['placement'] } = $props()
</script>

<!-- Room above and below, so a placement is not clamped by the viewport edge. -->
<div style="margin-block:10rem;display:flex;justify-content:center">
	<FabMenu bind:open {placement} label="Create">
		{#snippet icon()}<Icon>add</Icon>{/snippet}
		<Button role="menuitem" variant="tonal">New document</Button>
		<Button role="menuitem" variant="tonal">New folder</Button>
		<Button role="menuitem" variant="tonal">Upload</Button>
	</FabMenu>
</div>
