<script lang="ts">
	import { Button, IconButton, Sheet } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let standard: ReturnType<typeof Sheet> | undefined = $state()
</script>

<Button onclick={() => standard?.show()}>Open standard sheet</Button>
<Sheet bind:this={standard} id="standard-sheet" modal={false} placement="end" headline="Standard">
	{#snippet action()}
		<IconButton title="Close" command="close" commandfor="standard-sheet">
			<Icon>close</Icon>
		</IconButton>
	{/snippet}
	<p>The page behind this stays interactive.</p>
</Sheet>
