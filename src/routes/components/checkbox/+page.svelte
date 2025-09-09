<script lang="ts">
	import Checkbox from '$lib/checkbox/Checkbox.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Checkbox - Noph UI</title>
</svelte:head>

<h1>Checkbox</h1>
<h2>Usage</h2>
<DemoContainer>
	<Checkbox aria-label="Unchecked" />
	<Checkbox aria-label="Checked" checked />
	<Checkbox aria-label="Indeterminate" indeterminate />
</DemoContainer>
<Code
	value={`<Checkbox />
<Checkbox checked />
<Checkbox indeterminate />`}
/>
<h2>Disabled</h2>
<DemoContainer>
	<Checkbox aria-label="Unchecked" disabled />
	<Checkbox aria-label="Checked" disabled checked />
	<Checkbox aria-label="Indeterminate" disabled indeterminate />
</DemoContainer>
<Code
	value={`<Checkbox disabled />
<Checkbox checked disabled />
<Checkbox indeterminate disabled />`}
/>
<h3>Label</h3>
<DemoContainer>
	<label style="display: flex; align-items: center"><Checkbox />Checkbox one</label>
	<label style="display: flex; align-items: center"><Checkbox />Checkbox two</label>
</DemoContainer>
<Code
	value={`<label><Checkbox />Checkbox one</label>
<label><Checkbox />Checkbox two</label>`}
/>

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
			<td><code>--np-checkbox-container-shape</code></td>
			<td><code>2px</code></td>
		</tr>
		<tr>
			<td><code>--np-checkbox-outline-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-checkbox-selected-container-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-checkbox-selected-icon-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
	</tbody>
</table>
<h3>Example</h3>
<DemoContainer>
	<Checkbox
		checked
		aria-label="Themed Checkbox"
		--np-checkbox-container-shape="10px"
		--np-checkbox-outline-color="var(--np-color-tertiary)"
		--np-checkbox-selected-container-color="var(--np-color-error)"
		--np-checkbox-selected-icon-color="var(--np-color-on-error)"
	/>
</DemoContainer>
<Code
	value={`<Checkbox
	checked
	--np-checkbox-container-shape="10px"
	--np-checkbox-outline-color="var(--np-color-tertiary)"
	--np-checkbox-selected-container-color="var(--np-color-error)"
	--np-checkbox-selected-icon-color="var(--np-color-on-error)"
/>`}
/>

<h2>API</h2>
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
			<td><code>...attributes</code></td>
			<td><code>Omit&lt;HTMLInputAttributes, 'type'&gt;</code></td>
			<td></td>
			<td></td>
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
			<td><code>indeterminate</code></td>
			<td><code>boolean | null | undefined</code></td>
			<td>Input property</td>
		</tr>
		<tr>
			<td><code>checked</code></td>
			<td><code>boolean | null | undefined</code></td>
			<td>Input property</td>
		</tr>
		<tr>
			<td><code>group</code></td>
			<td><code>string | number | undefined</code></td>
			<td>Input property</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td
				>A reference to the root DOM element of the component. This variable is bound using <code
					>bind:this</code
				>, allowing direct access to the underlying HTML element for manipulation or querying within
				the component's logic.</td
			>
		</tr>
	</tbody>
</table>
