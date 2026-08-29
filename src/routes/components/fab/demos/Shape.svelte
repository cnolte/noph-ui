<script lang="ts">
	import { Fab } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Fab shape="round" label="Round">
	{#snippet icon()}<Icon>add</Icon>{/snippet}
</Fab>
<Fab shape="square" label="Square">
	{#snippet icon()}<Icon>add</Icon>{/snippet}
</Fab>
