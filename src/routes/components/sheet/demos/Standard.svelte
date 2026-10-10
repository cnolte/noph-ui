<script lang="ts">
	import { Button, IconButton, Sheet } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let open = $state(false)
</script>

<div style="display:flex;width:100%;min-height:16rem;overflow:hidden">
	<div style="flex:1;min-width:0;padding:1rem">
		<Button onclick={() => (open = !open)}>{open ? 'Close' : 'Open'} standard sheet</Button>
		<p>The content makes room for the sheet and stays interactive.</p>
	</div>
	<Sheet bind:open modal={false} placement="end" headline="Standard">
		{#snippet action()}
			<IconButton title="Close" onclick={() => (open = false)}>
				<Icon>close</Icon>
			</IconButton>
		{/snippet}
		<p>A standard side sheet sits beside the content.</p>
	</Sheet>
</div>
