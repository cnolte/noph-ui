<script lang="ts">
	import FilterChip from '$lib/chip/FilterChip.svelte'
	import { Icon } from '$lib/icons/index.ts'
	import DemoCaintainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Chips - Noph UI</title>
</svelte:head>

<h1>Chips</h1>
<h2>Usage</h2>
<DemoCaintainer>
	<FilterChip label="Default"></FilterChip>
	<FilterChip selected label="Selected"></FilterChip>
	<FilterChip label="Icon">
		{#snippet icon()}
			<Icon>bookmark</Icon>
		{/snippet}
	</FilterChip>
	<FilterChip label="Elevated" elevated removable>
		{#snippet icon()}
			<Icon>videocam</Icon>
		{/snippet}
	</FilterChip>
</DemoCaintainer>
<DemoCaintainer>
	<FilterChip disabled label="Default"></FilterChip>
	<FilterChip selected disabled label="Selected"></FilterChip>
	<FilterChip disabled label="Icon">
		{#snippet icon()}
			<Icon>bookmark</Icon>
		{/snippet}
	</FilterChip>
	<FilterChip disabled label="Elevated" elevated removable>
		{#snippet icon()}
			<Icon>videocam</Icon>
		{/snippet}
	</FilterChip>
</DemoCaintainer>
