<script lang="ts">
	import Divider from '$lib/divider/Divider.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Divider - Noph UI</title>
</svelte:head>

<h1>Divider</h1>
<h2>Usage</h2>
<DemoContainer><Divider style="width:200px" /></DemoContainer>
<Code value="<Divider style=&quot;width:200px&quot; />" />

<h2>Theming</h2>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-divider-color</code></td>
			<td><code>--np-color-outline-variant</code></td>
		</tr>
	</tbody>
</table>
<h3>Example</h3>
<DemoContainer>
	<Divider --np-divider-color="var(--np-color-tertiary)" style="width:200px" />
</DemoContainer>
<Code
	value="--np-divider-color=&quot;var(--np-color-tertiary)&quot; style=&quot;width:200px&quot;"
/>

<h2>API</h2>
<h3>Attributes</h3>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>variant</code></td>
			<td><code>'full' | 'inset' | 'inset-middle'</code></td>
			<td><code>'full'</code></td>
			<td>The type of the divider</td>
		</tr>
	</tbody>
</table>
