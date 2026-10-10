<script lang="ts">
	import { FabMenu, FabMenuItem } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'
</script>

<div style="display:flex;justify-content:center;padding-block-start:14rem;width:16rem">
	<FabMenu label="Create">
		{#snippet icon()}<Icon>add</Icon>{/snippet}
		<FabMenuItem>
			{#snippet icon()}<Icon>mail</Icon>{/snippet}
			Message
		</FabMenuItem>
		<FabMenuItem>
			{#snippet icon()}<Icon>calendar_today</Icon>{/snippet}
			Event
		</FabMenuItem>
		<FabMenuItem>
			{#snippet icon()}<Icon>videocam</Icon>{/snippet}
			Video
		</FabMenuItem>
	</FabMenu>
</div>
<div style="display:flex;justify-content:center;padding-block-start:14rem;width:16rem">
	<FabMenu label="Create, tertiary" variant="tertiary-container">
		{#snippet icon()}<Icon>add</Icon>{/snippet}
		<FabMenuItem>
			{#snippet icon()}<Icon>mail</Icon>{/snippet}
			Message
		</FabMenuItem>
		<FabMenuItem>
			{#snippet icon()}<Icon>calendar_today</Icon>{/snippet}
			Event
		</FabMenuItem>
		<FabMenuItem>
			{#snippet icon()}<Icon>videocam</Icon>{/snippet}
			Video
		</FabMenuItem>
	</FabMenu>
</div>
