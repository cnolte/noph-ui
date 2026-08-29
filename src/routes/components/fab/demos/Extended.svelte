<script lang="ts">
	import { ExtendedFab } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<ExtendedFab label="Compose">
	{#snippet icon()}<Icon>mail</Icon>{/snippet}
</ExtendedFab>
<ExtendedFab variant="tertiary" label="Search">
	{#snippet icon()}<Icon>search</Icon>{/snippet}
</ExtendedFab>
