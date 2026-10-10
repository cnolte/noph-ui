<script lang="ts">
	import { List, ListItem } from '#lib/index.js'
</script>

<List style="max-width:340px">
	<ListItem>One line</ListItem>
	<ListItem supportingText="Supporting text">Two lines</ListItem>
	<ListItem
		supportingText="Supporting text that is long enough to wrap onto a second line of its own"
	>
		Three lines
	</ListItem>
</List>
