<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Tooltips - Noph UI</title>
</svelte:head>

<h1>Tooltips</h1>
<h2>Basic tooltip</h2>
<DemoContainer>
	<div aria-describedby="example-tooltip-1">Hover over this text</div>
	<Tooltip id="example-tooltip-1">This is a basic tooltip</Tooltip>
</DemoContainer>
<Code
	value={`<div aria-describedby="tooltip">
	Hover over this text
</div>
<Tooltip id="tooltip">
	This is a basic tooltip
</Tooltip>`}
/>
<h2>Button with tooltip</h2>
<p>Buttons have built-in support for tooltips. You can simply set the title attribute.</p>

<DemoContainer>
	<Button title="This is a button tooltip">Hover over this button</Button>
</DemoContainer>
<Code
	value={`<Button title="This is a button tooltip">
	Hover over this button
</Button>`}
/>
