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

	let filterGroup = $state<string[]>([])

	let emails: string[] = $state(['info@noph.dev'])
	let email = $state('')
	let pendingDeleteIndex: number | null = $state(null)
</script>

<svelte:head>
	<title>Chips - Noph UI</title>
</svelte:head>

<h1>Chips</h1>

<h2>Assist chip</h2>

<h3>Outlined</h3>
<DemoContainer>
	<ChipSet>
		<AssistChip label="Assist chip" />
		<AssistChip label="With icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</AssistChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<AssistChip label="Assist chip" />
	<AssistChip label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</AssistChip>
</ChipSet>`}
/>

<h3>Elevated</h3>
<DemoContainer>
	<ChipSet>
		<AssistChip elevated label="Assist chip" />
		<AssistChip elevated label="With icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</AssistChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<AssistChip elevated label="Assist chip" />
	<AssistChip elevated label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</AssistChip>
</ChipSet>`}
/>

<h3>Disabled</h3>
<DemoContainer>
	<ChipSet>
		<AssistChip disabled label="Outlined" />
		<AssistChip disabled label="Outlined with icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</AssistChip>
		<AssistChip disabled elevated label="Elevated" />
		<AssistChip disabled elevated label="Elevated with icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</AssistChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<AssistChip disabled label="Outlined" />
	<AssistChip disabled label="Outlined with icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</AssistChip>
	<AssistChip disabled elevated label="Elevated" />
	<AssistChip disabled elevated label="Elevated with icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</AssistChip>
</ChipSet>`}
/>

<h3>As link</h3>
<DemoContainer>
	<ChipSet>
		<AssistChip label="Visit website" href="https://noph.dev" target="_blank" rel="noopener">
			{#snippet icon()}<Icon>open_in_new</Icon>{/snippet}
		</AssistChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<AssistChip label="Visit website" href="https://noph.dev">
		{#snippet icon()}<Icon>open_in_new</Icon>{/snippet}
	</AssistChip>
</ChipSet>`}
/>

<h2>Filter chip</h2>

<h3>Outlined</h3>
<DemoContainer>
	<ChipSet>
		<FilterChip label="Filter chip" />
		<FilterChip label="Selected" selected />
		<FilterChip label="With icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</FilterChip>
		<FilterChip label="Selected with icon" selected>
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</FilterChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<FilterChip label="Filter chip" />
	<FilterChip label="Selected" selected />
	<FilterChip label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
	<FilterChip label="Selected with icon" selected>
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
</ChipSet>`}
/>

<h3>Elevated</h3>
<DemoContainer>
	<ChipSet>
		<FilterChip elevated label="Filter chip" />
		<FilterChip elevated label="Selected" selected />
		<FilterChip elevated label="With icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</FilterChip>
		<FilterChip elevated label="Selected with icon" selected>
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</FilterChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<FilterChip elevated label="Filter chip" />
	<FilterChip elevated label="Selected" selected />
	<FilterChip elevated label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
	<FilterChip elevated label="Selected with icon" selected>
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
</ChipSet>`}
/>

<h3>Removable</h3>
<DemoContainer>
	<ChipSet>
		<FilterChip label="Removable" removable onremove={() => showPopover?.()} />
		<FilterChip label="Selected" removable selected onremove={() => showPopover?.()} />
		<FilterChip elevated label="Elevated" removable onremove={() => showPopover?.()} />
	</ChipSet>
</DemoContainer>
<Snackbar bind:showPopover label="Remove was clicked" />
<Code
	value={`<ChipSet>
	<FilterChip label="Removable" removable onremove={() => {}} />
	<FilterChip label="Selected" removable selected onremove={() => {}} />
	<FilterChip elevated label="Elevated" removable onremove={() => {}} />
</ChipSet>`}
/>

<h3>Disabled</h3>
<DemoContainer>
	<ChipSet>
		<FilterChip disabled label="Outlined" />
		<FilterChip disabled label="Outlined selected" selected />
		<FilterChip disabled elevated label="Elevated" />
		<FilterChip disabled elevated label="Elevated selected" selected />
		<FilterChip disabled label="With icon">
			{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
		</FilterChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<FilterChip disabled label="Outlined" />
	<FilterChip disabled label="Outlined selected" selected />
	<FilterChip disabled elevated label="Elevated" />
	<FilterChip disabled elevated label="Elevated selected" selected />
	<FilterChip disabled label="With icon">
		{#snippet icon()}<Icon>bookmark</Icon>{/snippet}
	</FilterChip>
</ChipSet>`}
/>

<h3>Group</h3>
<DemoContainer>
	<ChipSet>
		<FilterChip label="Running" value="running" bind:group={filterGroup} />
		<FilterChip label="Walking" value="walking" bind:group={filterGroup} />
		<FilterChip label="Cycling" value="cycling" bind:group={filterGroup} />
		<FilterChip label="Swimming" value="swimming" bind:group={filterGroup} />
	</ChipSet>
</DemoContainer>
<Code
	value={`let filterGroup = $state<string[]>([])

<ChipSet>
	<FilterChip label="Running" value="running" bind:group={filterGroup} />
	<FilterChip label="Walking" value="walking" bind:group={filterGroup} />
	<FilterChip label="Cycling" value="cycling" bind:group={filterGroup} />
	<FilterChip label="Swimming" value="swimming" bind:group={filterGroup} />
</ChipSet>`}
/>

<h2>Input chip</h2>

<h3>Default</h3>
<DemoContainer>
	<ChipSet>
		<InputChip label="Input chip" />
		<InputChip label="With icon">
			{#snippet icon()}<Icon>person</Icon>{/snippet}
		</InputChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<InputChip label="Input chip" />
	<InputChip label="With icon">
		{#snippet icon()}<Icon>person</Icon>{/snippet}
	</InputChip>
</ChipSet>`}
/>

<h3>Selected</h3>
<DemoContainer>
	<ChipSet>
		<InputChip selected label="Selected" />
		<InputChip selected label="With icon">
			{#snippet icon()}<Icon>person</Icon>{/snippet}
		</InputChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<InputChip selected label="Selected" />
	<InputChip selected label="With icon">
		{#snippet icon()}<Icon>person</Icon>{/snippet}
	</InputChip>
</ChipSet>`}
/>

<h3>Disabled</h3>
<DemoContainer>
	<ChipSet>
		<InputChip disabled label="Disabled" />
		<InputChip disabled selected label="Disabled selected" />
		<InputChip disabled label="With icon">
			{#snippet icon()}<Icon>person</Icon>{/snippet}
		</InputChip>
	</ChipSet>
</DemoContainer>
<Code
	value={`<ChipSet>
	<InputChip disabled label="Disabled" />
	<InputChip disabled selected label="Disabled selected" />
	<InputChip disabled label="With icon">
		{#snippet icon()}<Icon>person</Icon>{/snippet}
	</InputChip>
</ChipSet>`}
/>

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
			} else if (e.key === 'Backspace' && !e.currentTarget.value && emails.length > 0) {
				e.preventDefault()
				if (pendingDeleteIndex !== null) {
					emails.splice(pendingDeleteIndex, 1)
					pendingDeleteIndex = null
				} else {
					pendingDeleteIndex = emails.length - 1
				}
			} else {
				pendingDeleteIndex = null
			}
		}}
		onfocus={() => {
			pendingDeleteIndex = null
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
					selected={pendingDeleteIndex === index}
					onremove={() => {
						if (index > -1) {
							emails.splice(index, 1)
							pendingDeleteIndex = null
						}
					}}
				/>
			{/each}
		</ChipSet>
	</TextField>
</DemoContainer>
<Code
	value={`let pendingDeleteIndex: number | null = $state(null)

<TextField
	type="email"
	label="Emails"
	variant="outlined"
	placeholder="Add email..."
	bind:value={email}
	populated={emails.length > 0}
	onkeydown={(e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			if (e.currentTarget.value && e.currentTarget.reportValidity()) {
				emails.push(e.currentTarget.value)
				email = ''
			}
		} else if (e.key === 'Backspace' && !e.currentTarget.value && emails.length > 0) {
			e.preventDefault()
			if (pendingDeleteIndex !== null) {
				emails.splice(pendingDeleteIndex, 1)
				pendingDeleteIndex = null
			} else {
				pendingDeleteIndex = emails.length - 1
			}
		} else {
			pendingDeleteIndex = null
		}
	}}
	onfocus={() => { pendingDeleteIndex = null }}
>
	<ChipSet chipsCount={emails.length}>
		{#each emails as email, index (index)}
			<InputChip
				name="email"
				value={email}
				selected={pendingDeleteIndex === index}
				onremove={() => {
					if (index > -1) {
						emails.splice(index, 1)
						pendingDeleteIndex = null
					}
				}}
			/>
		{/each}
	</ChipSet>
</TextField>`}
/>
