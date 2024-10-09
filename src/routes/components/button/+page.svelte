<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import OpenInNewIcon from '$lib/icons/OpenInNewIcon.svelte'
	import SendIcon from '$lib/icons/SendIcon.svelte'
	import Code from '../../Code.svelte'
</script>

<svelte:head>
	<title>Buttons - Noph UI</title>
</svelte:head>

<h1>Buttons</h1>
<h2>Types</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button variant="elevated">Elevated</Button>
	<Button variant="filled">Filled</Button>
	<Button variant="tonal">Tonal</Button>
	<Button variant="outlined">Outlined</Button>
	<Button variant="text">Text</Button>
</div>
<h2>Elevated button</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button variant="elevated">Elevated</Button>
	<Button variant="elevated" disabled>Disabled</Button>
</div>
<Code
	value={`<Button variant="elevated">Elevated</Button>
<Button variant="elevated" disabled>Disabled</Button>`}
/>
<h2>Filled button</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button variant="filled">Filled</Button>
	<Button variant="filled" disabled>Disabled</Button>
</div>
<Code
	value={`<Button variant="filled">Filled</Button>
<Button variant="filled" disabled>Disabled</Button>`}
/>
<h2>Tonal button</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button variant="tonal">Tonal</Button>
	<Button variant="tonal" disabled>Disabled</Button>
</div>
<Code
	value={`<Button variant="tonal">Tonal</Button>
<Button variant="tonal" disabled>Disabled</Button>`}
/>
<h2>Outlined button</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button variant="outlined">Outlined</Button>
	<Button variant="outlined" disabled>Disabled</Button>
</div>
<Code
	value={`<Button variant="outlined">Outlined</Button>
<Button variant="outlined" disabled>Disabled</Button>`}
/>
<h2>Text button</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button variant="text">Text</Button>
	<Button variant="text" disabled>Disabled</Button>
</div>
<Code
	value={`<Button variant="text">Text</Button>
<Button variant="text" disabled>Disabled</Button>`}
/>
<h2>Custom Buttons</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button style="--np-outlined-button-label-text-color: var(--np-color-error)">Error</Button>
</div>
<Code
	value={`
<Button style="--np-outlined-button-label-text-color: var(--np-color-error)">
	Error
</Button>`}
/>
<h2>Icon</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
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
</div>
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
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-color-outline)] p-4"
>
	<Button size="small">Small</Button>
	<Button size="medium">Medium</Button>
	<Button size="large">Large</Button>
</div>
<Code
	value={`<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>`}
/>
