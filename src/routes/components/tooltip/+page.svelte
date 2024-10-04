<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import Code from '../../Code.svelte'

	let exampleBtn1: HTMLDivElement | undefined = $state()
</script>

<svelte:head>
	<title>Tooltip - Noph UI</title>
</svelte:head>

<h1>Tooltip</h1>
<h2>Basic Tooltip</h2>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-divider-color)] p-4"
>
	<div aria-describedby="example-tooltip-1" bind:this={exampleBtn1}>Hover over this text</div>
	{#if exampleBtn1}
		<Tooltip anchor={exampleBtn1} id="example-tooltip-1">This is a basic tooltip</Tooltip>
	{/if}
</div>
<Code
	value={`<div aria-describedby="tooltip" bind:this={buttonEl}>
	Hover over this text
</div>
{#if buttonEl}
	<Tooltip anchor={buttonEl} id="tooltip">
		This is a basic tooltip
	</Tooltip>
{/if}`}
/>
<h2>Button with Tooltip</h2>
<p>Buttons have built-in support for tooltips. You can simply set the title attribute.</p>
<div
	class="mx-auto mb-8 flex w-fit flex-wrap gap-4 rounded-3xl border border-solid border-[var(--np-divider-color)] p-4"
>
	<Button title="This is a button tooltip">Hover over this button</Button>
</div>
<Code
	value={`<Button title="This is a button tooltip">
	Hover over this button
</Button>`}
/>
