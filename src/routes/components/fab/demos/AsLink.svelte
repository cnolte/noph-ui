<script lang="ts">
	import { Fab } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<Fab href="/components/button" label="Go to buttons">
	{#snippet icon()}<Icon>arrow_forward</Icon>{/snippet}
</Fab>
