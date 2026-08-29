<script lang="ts">
	import { Fab } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Fab variant="primary-container" label="Primary container">
	{#snippet icon()}<Icon>add</Icon>{/snippet}
</Fab>
<Fab variant="secondary-container" label="Secondary container">
	{#snippet icon()}<Icon>mail</Icon>{/snippet}
</Fab>
<Fab variant="tertiary-container" label="Tertiary container">
	{#snippet icon()}<Icon>favorite</Icon>{/snippet}
</Fab>
