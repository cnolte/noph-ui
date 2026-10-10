<script lang="ts">
	import { Button, Item, Sheet } from '#lib/index.js'

	const places = Array.from({ length: 24 }, (_, index) => `Place ${index + 1}`)
</script>

<Button command="show-modal" commandfor="heights-sheet">Open places</Button>
<Sheet id="heights-sheet" headline="Places nearby">
	{#each places as place (place)}
		<Item type="button" command="close" commandfor="heights-sheet">{place}</Item>
	{/each}
</Sheet>
