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

<h2>API</h2>
<h3>Switch</h3>

<h4>Attributes</h4>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td>Disables the switch interaction.</td>
		</tr>
		<tr>
			<td><code>icons</code></td>
			<td><code>'checked' | 'both' | 'none'</code></td>
			<td>
				Controls the visibility of icons. Determines if only one icon is shown when checked, if both
				both are shown (which also increases the size of the indicator when unchecked) or none for
				never showing an icon.</td
			>
		</tr>
	</tbody>
</table>

<h3>Bindables</h3>
<table>
	<thead>
		<tr>
			<th>Attribute</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>checked</code></td>
			<td><code>boolean</code></td>
			<td>The state of the switch. True indicates the switch is on.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement</code></td>
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
		<tr>
			<td><code>inputElement</code></td>
			<td><code>HTMLInputElement | undefined</code></td>
			<td>Allows access to the underlying native checkbox input element.</td>
		</tr>
	</tbody>
</table>
