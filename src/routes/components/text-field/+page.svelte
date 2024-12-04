<script lang="ts">
	import TextField from '$lib/text-field/TextField.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Text fields - Noph UI</title>
</svelte:head>

<h1>Text fields</h1>

<h2>Usage</h2>
<p>
	Text fields function similarly to <code>&lt;input&gt;</code> elements, serving as containers with labels
	to facilitate user input.
</p>
<DemoContainer>
	<TextField label="Label" value="Value" />
	<TextField label="Label" value="Value" variant="outlined" />
</DemoContainer>
<Code
	value={`<TextField label="Label" value="Value" />
<TextField label="Label" value="Value" variant="outlined" />`}
/>
