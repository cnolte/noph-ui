<script lang="ts">
	import ChipSet from '$lib/chip/ChipSet.svelte'
	import FilterChip from '$lib/chip/FilterChip.svelte'
	import InputChip from '$lib/chip/InputChip.svelte'
	import { Icon } from '$lib/icons/index.ts'
	import { AssistChip } from '$lib/index.ts'
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

<h2>Assist chip</h2>
<DemoContainer>
	<ChipSet>
		<AssistChip label="Assist chip">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</AssistChip>
		<AssistChip elevated label="Assist chip" />
	</ChipSet>
</DemoContainer>

<h3>Disabled</h3>
<DemoContainer>
	<ChipSet>
		<AssistChip disabled label="Assist chip">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</AssistChip>
		<AssistChip disabled elevated label="Assist chip" />
	</ChipSet>
</DemoContainer>

<h2>Filter chip</h2>
<h3>Outlined</h3>

{#snippet filterChipsList(disabled = false, elevated = false)}
	{#each chips as chip, index (index)}
		<FilterChip
			label={chip.label}
			{disabled}
			{elevated}
			removable={chip.removable}
			onremove={chip.remove}
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
		{@render filterChipsList()}
	</ChipSet>
</DemoContainer>
<h3>Elevated</h3>
<DemoContainer>
	<ChipSet>
		{@render filterChipsList(false, true)}
	</ChipSet>
</DemoContainer>
<h3>Disabled</h3>
<DemoContainer>
	<ChipSet>
		{@render filterChipsList(true, false)}
	</ChipSet>
</DemoContainer>
<Snackbar bind:showPopover label="Remove was clicked" />

<h2>Input chip</h2>
<DemoContainer>
	<ChipSet>
		<InputChip label="Input chip" />
		<InputChip selected label="Input chip" />
	</ChipSet>
</DemoContainer>

<h3>Disabled</h3>
<DemoContainer>
	<ChipSet>
		<InputChip disabled label="Input chip" />
		<InputChip disabled selected label="Input chip" />
	</ChipSet>
</DemoContainer>
