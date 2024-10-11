<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import OpenInNewIcon from '$lib/icons/OpenInNewIcon.svelte'
	import SendIcon from '$lib/icons/SendIcon.svelte'
	import Code from '../../Code.svelte'
	import DemoCaintainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Buttons - Noph UI</title>
</svelte:head>

<h1>Buttons</h1>
<h2>Types</h2>
<DemoCaintainer>
	<Button variant="elevated">Elevated</Button>
	<Button variant="filled">Filled</Button>
	<Button variant="tonal">Tonal</Button>
	<Button variant="outlined">Outlined</Button>
	<Button variant="text">Text</Button>
</DemoCaintainer>
<h2>Elevated button</h2>
<DemoCaintainer>
	<Button variant="elevated">Elevated</Button>
	<Button variant="elevated" disabled>Disabled</Button>
</DemoCaintainer>
<Code
	value={`<Button variant="elevated">Elevated</Button>
<Button variant="elevated" disabled>Disabled</Button>`}
/>
<h2>Filled button</h2>
<DemoCaintainer>
	<Button variant="filled">Filled</Button>
	<Button variant="filled" disabled>Disabled</Button>
</DemoCaintainer>
<Code
	value={`<Button variant="filled">Filled</Button>
<Button variant="filled" disabled>Disabled</Button>`}
/>
<h2>Tonal button</h2>

<DemoCaintainer>
	<Button variant="tonal">Tonal</Button>
	<Button variant="tonal" disabled>Disabled</Button>
</DemoCaintainer>
<Code
	value={`<Button variant="tonal">Tonal</Button>
<Button variant="tonal" disabled>Disabled</Button>`}
/>
<h2>Outlined button</h2>

<DemoCaintainer>
	<Button variant="outlined">Outlined</Button>
	<Button variant="outlined" disabled>Disabled</Button>
</DemoCaintainer>
<Code
	value={`<Button variant="outlined">Outlined</Button>
<Button variant="outlined" disabled>Disabled</Button>`}
/>
<h2>Text button</h2>

<DemoCaintainer>
	<Button variant="text">Text</Button>
	<Button variant="text" disabled>Disabled</Button>
</DemoCaintainer>
<Code
	value={`<Button variant="text">Text</Button>
<Button variant="text" disabled>Disabled</Button>`}
/>
<h2>Custom buttons</h2>

<DemoCaintainer style="background-color:#f7fafe">
	<Button --np-outlined-button-label-text-color="#ba1a1a" --np-outlined-button-container-shape="0">
		Error
	</Button>
</DemoCaintainer>
<Code
	value={`<Button --np-outlined-button-label-text-color="#ba1a1a" --np-outlined-button-container-shape="0">
	Error
</Button>`}
/>
<h2>Icon</h2>
<DemoCaintainer>
	<Button variant="tonal">
		{#snippet start()}
			<SendIcon />
		{/snippet}Send</Button
	>
	<Button variant="text">
		{#snippet end()}
			<OpenInNewIcon />
		{/snippet}Open</Button
	>
</DemoCaintainer>
<Code
	value={`<Button>
	{#snippet start()}
		<SendIcon />
	{/snippet}
	Send
</Button>
<Button>
	{#snippet end()}
		<OpenInNewIcon />
	{/snippet}
	Open
</Button>`}
/>
<h2>Size</h2>
<DemoCaintainer>
	<Button size="small">Small</Button>
	<Button size="medium">Medium</Button>
	<Button size="large">Large</Button>
</DemoCaintainer>
<Code
	value={`<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>`}
/>
