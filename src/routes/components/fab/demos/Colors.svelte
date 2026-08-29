<script lang="ts">
	import { Fab } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Fab variant="primary" label="Primary">
	{#snippet icon()}<Icon>add</Icon>{/snippet}
</Fab>
<Fab variant="secondary" label="Secondary">
	{#snippet icon()}<Icon>mail</Icon>{/snippet}
</Fab>
<Fab variant="tertiary" label="Tertiary">
	{#snippet icon()}<Icon>favorite</Icon>{/snippet}
</Fab>
