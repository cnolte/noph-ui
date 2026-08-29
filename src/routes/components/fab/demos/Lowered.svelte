<script lang="ts">
	import { Fab } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Fab label="Default elevation">
	{#snippet icon()}<Icon>add</Icon>{/snippet}
</Fab>
<Fab lowered label="Lowered">
	{#snippet icon()}<Icon>add</Icon>{/snippet}
</Fab>
