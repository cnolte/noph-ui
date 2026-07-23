<script lang="ts">
	import DemoContainer from '../../DemoContainer.svelte'
	import Dialog from '#lib/dialog/Dialog.svelte'
	import Button from '#lib/button/Button.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	let dialog: ReturnType<typeof Dialog> | undefined = $state()
</script>

<svelte:head>
	<title>Dialogs - Noph UI</title>
</svelte:head>

<h1>Dialogs</h1>
<h2>Usage</h2>
<DemoContainer>
	<Button popovertarget="simple-dialog">Show Dialog</Button>
	<Dialog
		bind:this={dialog}
		headline="Reset settings?"
		supportingText="This will reset your app preferences back to their default settings."
		id="simple-dialog"
		divider
	>
		{#snippet icon()}
			<Icon>settings</Icon>
		{/snippet}
		{#snippet actions()}
			<Button
				onclick={() => {
					dialog?.hidePopover()
				}}
				variant="text">Cancel</Button
			>
			<Button
				onclick={() => {
					dialog?.hidePopover()
				}}
				variant="text">Accept</Button
			>
		{/snippet}
	</Dialog>
</DemoContainer>
<Code
	value={`<script lang="ts">
	let dialog: ReturnType<typeof Dialog> | undefined = $state()
</` +
		`script>

<Button popovertarget="simple-dialog">Show Dialog</Button>
<Dialog
	bind:this={dialog}
	headline="Reset settings?"
	supportingText="This will reset your app preferences back to their default settings."
	id="simple-dialog"
	divider
>
	{#snippet icon()}
		<Icon>settings</Icon>
	{/snippet}
	{#snippet actions()}
		<Button
			onclick={() => {
				dialog?.hidePopover()
			}}
			variant="text">Cancel</Button
		>
		<Button
			onclick={() => {
				dialog?.hidePopover()
			}}
			variant="text">Accept</Button
		>
	{/snippet}
</Dialog>`}
/>

<h2>Methods</h2>
<p>
	Bind a reference to the dialog with <code>bind:this</code> to call its methods imperatively. Type
	the reference with <code>ReturnType&lt;typeof Dialog&gt;</code>; it is <code>undefined</code>
	until the component has mounted, so call through <code>?.</code>.
</p>
<table>
	<thead>
		<tr>
			<th>Method</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>showPopover</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Shows the dialog.</td>
		</tr>
		<tr>
			<td><code>hidePopover</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Hides the dialog.</td>
		</tr>
	</tbody>
</table>
