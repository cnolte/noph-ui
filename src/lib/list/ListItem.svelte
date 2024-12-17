<script lang="ts">
	import Item from '$lib/list/Item.svelte'
	import type { ListItemProps } from './types.ts'

	let { ...attributes }: ListItemProps = $props()
</script>

<li>
	<Item {...attributes} />
</li>
