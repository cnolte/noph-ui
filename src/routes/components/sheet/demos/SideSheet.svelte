<script lang="ts">
	import { Button, IconButton, Sheet, TextField } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Button command="show-modal" commandfor="filter-sheet">Open filters</Button>
<Sheet id="filter-sheet" placement="end" detached headline="Filters">
	{#snippet leading()}
		<IconButton title="Back" command="close" commandfor="filter-sheet">
			<Icon>arrow_back</Icon>
		</IconButton>
	{/snippet}
	{#snippet action()}
		<IconButton title="Close" command="close" commandfor="filter-sheet">
			<Icon>close</Icon>
		</IconButton>
	{/snippet}
	<TextField label="Keyword" />
	{#snippet actions()}
		<Button command="close" commandfor="filter-sheet">Apply</Button>
		<Button variant="outlined" command="close" commandfor="filter-sheet">Cancel</Button>
	{/snippet}
</Sheet>
