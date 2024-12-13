<script lang="ts">
	import Checkbox from '$lib/checkbox/Checkbox.svelte'
	import Code from '../../Code.svelte'
	import DemoCaintainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Checkbox - Noph UI</title>
</svelte:head>

<h1>Checkbox</h1>
<h2>Usage</h2>
<DemoCaintainer>
	<Checkbox aria-label="Unchecked" />
	<Checkbox aria-label="Checked" checked />
	<Checkbox aria-label="Indeterminate" indeterminate />
</DemoCaintainer>
<Code
	value={`<Checkbox />
<Checkbox checked />
<Checkbox indeterminate />`}
/>
