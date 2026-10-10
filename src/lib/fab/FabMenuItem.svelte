<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import type { FabMenuItemProps } from './types.js'

	let { icon, element = $bindable(), ...attributes }: FabMenuItemProps = $props()
</script>

<Button {...attributes} bind:element role="menuitem" variant="tonal" size="m" start={icon} />
