<script lang="ts">
	import { Button, IconButton, RichTooltip } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<IconButton title="Add to favorites"><Icon>favorite</Icon></IconButton>
<IconButton command="show-popover" commandfor="example-rich-tooltip" aria-label="About tooltips">
	<Icon>info</Icon>
</IconButton>
<RichTooltip id="example-rich-tooltip" subhead="Rich tooltip">
	Room for a sentence or two, and an action.
	{#snippet actions()}
		<Button variant="text">Learn more</Button>
	{/snippet}
</RichTooltip>
