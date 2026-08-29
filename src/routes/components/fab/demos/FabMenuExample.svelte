<script lang="ts">
	import { Button, FabMenu } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<div style="display:flex;justify-content:center;padding-block-start:9rem;width:16rem">
	<FabMenu label="Create">
		{#snippet icon()}<Icon>add</Icon>{/snippet}
		<Button variant="tonal">New document</Button>
		<Button variant="tonal">New folder</Button>
		<Button variant="tonal">Upload</Button>
	</FabMenu>
</div>
<div style="display:flex;justify-content:center;padding-block-start:9rem;width:16rem">
	<FabMenu
		label="Create, tertiary"
		variant="tertiary"
		style="--np-tonal-button-container-color: var(--np-color-tertiary-container); --np-tonal-button-label-text-color: var(--np-color-on-tertiary-container)"
	>
		{#snippet icon()}<Icon>add</Icon>{/snippet}
		<Button variant="tonal">New document</Button>
		<Button variant="tonal">New folder</Button>
		<Button variant="tonal">Upload</Button>
	</FabMenu>
</div>
