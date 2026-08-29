<script lang="ts">
	import { Button, IconButton, Sheet } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
	import Item from '#lib/list/Item.svelte'
</script>

<Button command="show-modal" commandfor="bottom-sheet">Open bottom sheet</Button>
<Sheet id="bottom-sheet" headline="Bottom sheet">
	{#snippet action()}
		<IconButton title="Close" command="close" commandfor="bottom-sheet">
			<Icon>close</Icon>
		</IconButton>
	{/snippet}
	<Item variant="button">Share</Item>
	<Item variant="button">Add to favourites</Item>
	<Item variant="button">Delete</Item>
</Sheet>
