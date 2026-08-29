<script lang="ts">
	import { Button } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Button variant="tonal">
	{#snippet start()}
		<Icon>send</Icon>
	{/snippet}
	Send
</Button>
<Button variant="text">
	{#snippet end()}
		<Icon>open_in_new</Icon>
	{/snippet}
	Open
</Button>
