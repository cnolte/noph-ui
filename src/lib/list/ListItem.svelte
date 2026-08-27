<script lang="ts">
	import Item from '#lib/list/Item.svelte'
	import type { ListItemProps } from './types.ts'

	let { element = $bindable(), ...attributes }: ListItemProps = $props()
</script>

<li>
	<Item bind:element {...attributes} />
</li>
