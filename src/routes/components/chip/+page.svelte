<script lang="ts">
	import ChipSet from '$lib/chip/ChipSet.svelte'
	import FilterChip from '$lib/chip/FilterChip.svelte'
	import { Icon } from '$lib/icons/index.ts'
	import Snackbar from '$lib/snackbar/Snackbar.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let showPopover: (() => void) | undefined = $state()
	let chips = $state([
		{ label: 'Filter chip' },
		{ label: 'Filter chip with icon', icon: 'bookmark' },
		{
			label: 'Removable filter chip',
			removable: true,
			remove: () => {
				showPopover?.()
			},
		},
	])
</script>

<svelte:head>
	<title>Chips - Noph UI</title>
</svelte:head>

<h1>Chips</h1>
<h2>Filter chip</h2>
<h3>Outlined</h3>

{#snippet chipsList(disabled = false, elevated = false)}
	{#each chips as chip}
		<FilterChip
			label={chip.label}
			{disabled}
			{elevated}
			removable={chip.removable}
			remove={chip.remove}
		>
			{#snippet icon()}
				{#if chip.icon}
					<Icon>{chip.icon}</Icon>
				{/if}
			{/snippet}
		</FilterChip>
	{/each}
{/snippet}

<DemoContainer>
	<ChipSet>
		{@render chipsList()}
	</ChipSet>
</DemoContainer>
<h3>Elevated</h3>
<DemoContainer>
	<ChipSet>
		{@render chipsList(false, true)}
	</ChipSet>
</DemoContainer>
<h3>Disabled</h3>
<DemoContainer>
	<ChipSet>
		{@render chipsList(true, false)}
	</ChipSet>
</DemoContainer>
<Snackbar bind:showPopover label="Remove was clicked" />
