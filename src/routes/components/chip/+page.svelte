<script lang="ts">
	import ChipSet from '$lib/chip/ChipSet.svelte'
	import FilterChip from '$lib/chip/FilterChip.svelte'
	import InputChip from '$lib/chip/InputChip.svelte'
	import { Icon } from '$lib/icons/index.ts'
	import { AssistChip } from '$lib/index.ts'
	import Snackbar from '$lib/snackbar/Snackbar.svelte'
	import TextField from '$lib/text-field/TextField.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let showPopover: (() => void) | undefined = $state()
	let chips = $state([
		{ label: 'Outlined' },
		{ label: 'Elevated', elevated: true },
		{ label: 'Icon', icon: 'bookmark' },
		{ label: 'Selected', selected: true },
		{
			label: 'Removable',
			removable: true,
			remove: () => {
				showPopover?.()
			},
		},
	])

	let emails: string[] = $state(['info@noph.dev'])
	let email = $state('')
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

{#snippet filterChipsList(disabled = false)}
	{#each chips as chip, index (index)}
		<FilterChip
			label={chip.label}
			{disabled}
			elevated={chip.elevated}
			selected={chip.selected}
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
<h3>Disabled</h3>
<DemoContainer>
	<ChipSet>
		{@render filterChipsList(true)}
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

<h3>Chips with text fields</h3>

<DemoContainer>
	<TextField
		type="email"
		label="Emails"
		variant="outlined"
		placeholder="Add email..."
		style="width:340px"
		bind:value={email}
		populated={emails.length > 0}
		onkeydown={(e) => {
			if (e.key === 'Enter') {
				e.preventDefault()
				if (e.currentTarget.value && e.currentTarget.reportValidity()) {
					emails.push(e.currentTarget.value)
					email = ''
				}
			}
		}}
		onblur={(e) => {
			if (e.currentTarget.value && e.currentTarget.reportValidity()) {
				emails.push(e.currentTarget.value)
				email = ''
			}
		}}
	>
		<ChipSet chipsCount={emails.length}>
			{#each emails as email, index (index)}
				<InputChip
					name="email"
					value={email}
					onremove={() => {
						if (index > -1) {
							emails.splice(index, 1)
						}
					}}
				/>
			{/each}
		</ChipSet>
	</TextField>
</DemoContainer>
<Code
	value={`<TextField
	type="email"
	label="Emails"
	variant="outlined"
	placeholder="Add email..."
	style="width:340px"
	bind:value={email}
	bind:reportValidity={reportEmailValidity}
	populated={emails.length > 0}
	onkeydown={(e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			if (e.currentTarget.value && reportEmailValidity?.()) {
				emails.push(e.currentTarget.value)
				email = ''
			}
		}
	}}
	onblur={(e) => {
		if (e.currentTarget.value && reportEmailValidity?.()) {
			emails.push(e.currentTarget.value)
			email = ''
		}
	}}
>
	<ChipSet>
		{#each emails as email, index (index)}
			<InputChip
				name="email"
				value={email}
				onremove={() => {
					if (index > -1) {
						emails.splice(index, 1)
					}
				}}
			/>
		{/each}
	</ChipSet>
</TextField>`}
/>
