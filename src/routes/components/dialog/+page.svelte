<script lang="ts">
	import DemoContainer from '../../DemoContainer.svelte'
	import Dialog from '$lib/dialog/Dialog.svelte'
	import Button from '$lib/button/Button.svelte'
	import Icon from '$lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	let hidePopover: () => void
</script>

<svelte:head>
	<title>Dialogs - Noph UI</title>
</svelte:head>

<h1>Dialogs</h1>
<h2>Usage</h2>
<DemoContainer>
	<Button popovertarget="simple-dialog">Show Dialog</Button>
	<Dialog
		bind:hidePopover
		headline="Reset settings?"
		supportingText="This will reset you app preferences back to their default settings."
		id="simple-dialog"
		divider
	>
		{#snippet icon()}
			<Icon>settings</Icon>
		{/snippet}
		{#snippet actions()}
			<Button
				onclick={() => {
					hidePopover()
				}}
				variant="text">Cancel</Button
			>
			<Button
				onclick={() => {
					hidePopover()
				}}
				variant="text">Accept</Button
			>
		{/snippet}
	</Dialog>
</DemoContainer>
<Code
	value={`<Button popovertarget="simple-dialog">Show Dialog</Button>
<Dialog
	bind:hidePopover
	headline="Reset settings?"
	supportingText="This will reset you app preferences back to their default settings."
	id="simple-dialog"
	divider
>
	{#snippet icon()}
		<Icon>settings</Icon>
	{/snippet}
	{#snippet actions()}
		<Button
			onclick={() => {
				hidePopover()
			}}
			variant="text">Cancel</Button
		>
		<Button
			onclick={() => {
				hidePopover()
			}}
			variant="text">Accept</Button
		>
	{/snippet}
</Dialog>`}
/>
