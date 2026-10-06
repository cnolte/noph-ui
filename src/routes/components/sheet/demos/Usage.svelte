<script lang="ts">
	import { Button, IconButton, Item, Sheet } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Button command="show-modal" commandfor="bottom-sheet">Open bottom sheet</Button>
<Sheet id="bottom-sheet" headline="Bottom sheet">
	{#snippet action()}
		<IconButton title="Close" command="close" commandfor="bottom-sheet">
			<Icon>close</Icon>
		</IconButton>
	{/snippet}
	<Item type="button" command="close" commandfor="bottom-sheet">Share</Item>
	<Item type="button" command="close" commandfor="bottom-sheet">Add to favourites</Item>
	<Item type="button" command="close" commandfor="bottom-sheet">Delete</Item>
</Sheet>
