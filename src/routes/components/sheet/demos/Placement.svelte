<script lang="ts">
	import { Button, IconButton, Sheet } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Button command="show-modal" commandfor="side-sheet">Open side sheet</Button>
<Sheet id="side-sheet" placement="end" headline="Side sheet">
	{#snippet action()}
		<IconButton title="Close" command="close" commandfor="side-sheet">
			<Icon>close</Icon>
		</IconButton>
	{/snippet}
	<p>Filters, details, or anything secondary to the page behind it.</p>
</Sheet>
