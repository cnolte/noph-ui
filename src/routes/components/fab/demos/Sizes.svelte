<script lang="ts">
	import { Fab } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Fab size="s" label="Add, small">
	{#snippet icon()}<Icon>add</Icon>{/snippet}
</Fab>
<Fab size="m" label="Add, medium">
	{#snippet icon()}<Icon>add</Icon>{/snippet}
</Fab>
<Fab size="l" label="Add, large">
	{#snippet icon()}<Icon>add</Icon>{/snippet}
</Fab>
