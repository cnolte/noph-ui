<script lang="ts">
	import Switch from '$lib/switch/Switch.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let checked = false
</script>

<svelte:head>
	<title>Switch - Noph UI</title>
</svelte:head>

<h1>Switch</h1>
<h2>Usage</h2>
<DemoContainer>
	<Switch bind:checked />
</DemoContainer>

<Code
	value={`<script lang="ts">
	let checked = false
</` +
		`script>
<Switch bind:checked />`}
/>

<h2>Disable</h2>
<DemoContainer>
	<Switch bind:checked disabled />
</DemoContainer>

<Code
	value={`<script lang="ts">
	let checked = false
</` +
		`script>
<Switch bind:checked disabled />`}
/>

<h2>Icons</h2>
<DemoContainer>
	<Switch icons="both" />
	<Switch icons="checked" />
	<Switch icons="none" />
</DemoContainer>

<Code
	value={`<Switch icons="both" />
<Switch icons="checked" />
<Switch icons="none" />`}
/>
