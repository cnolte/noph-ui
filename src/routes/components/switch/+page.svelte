<script lang="ts">
	import Switch from '#lib/switch/Switch.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Switch - Noph UI</title>
</svelte:head>

<h1>Switch</h1>
<h2 id="usage">Usage</h2>
<DemoContainer>
	<Switch />
</DemoContainer>

<Code value="<Switch />" />

<h2 id="disable">Disable</h2>
<DemoContainer>
	<Switch disabled />
</DemoContainer>

<Code value="<Switch disabled />" />

<h2 id="icons">Icons</h2>
<DemoContainer>
	<Switch icons="selected" />
	<Switch icons="both" />
</DemoContainer>

<Code
	value={`<Switch icons="selected" />
<Switch icons="both" />`}
/>
<h2 id="theming">Theming</h2>
<h3 id="tokens">Tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-comp-switch-selected-track-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-selected-handle-color</code></td>
			<td><code>--np-color-on-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-selected-icon-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-unselected-track-color</code></td>
			<td><code>--np-color-surface-container-highest</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-unselected-track-outline-color</code></td>
			<td><code>--np-color-outline</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-unselected-handle-color</code></td>
			<td><code>--np-color-outline</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-handle-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-state-layer-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-state-layer-size</code></td>
			<td><code>2.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-disabled-unselected-track-color</code></td>
			<td><code>--np-color-surface-container-highest</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-disabled-selected-track-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-disabled-track-opacity</code></td>
			<td><code>0.12</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-disabled-unselected-handle-opacity</code></td>
			<td><code>0.38</code></td>
		</tr>
		<tr>
			<td><code>--np-comp-switch-disabled-selected-handle-opacity</code></td>
			<td><code>1</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-comp-switch-selected-icon-color</code> colors the icon inside the handle, which only
	shows with <code>icons="selected"</code> or <code>icons="both"</code>. The
	<code>disabled</code> tokens take a colour and an opacity separately, because the disabled switch is
	drawn by fading the same colours rather than by swapping in pre-faded ones.
</p>
<h3 id="example">Example</h3>
<DemoContainer>
	<Switch
		selected
		icons="both"
		--np-comp-switch-selected-track-color="var(--np-color-tertiary)"
		--np-comp-switch-selected-handle-color="var(--np-color-on-tertiary)"
		--np-comp-switch-selected-icon-color="var(--np-color-tertiary)"
	/>
</DemoContainer>
<Code
	value={`<Switch
	selected
	icons="both"
	--np-comp-switch-selected-track-color="var(--np-color-tertiary)"
	--np-comp-switch-selected-handle-color="var(--np-color-on-tertiary)"
	--np-comp-switch-selected-icon-color="var(--np-color-tertiary)"
/>`}
/>
<h2 id="api">API</h2>
<h3 id="switch">Switch</h3>

<h4 id="attributes">Attributes</h4>
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
			<td>Disables the switch.</td>
		</tr>
		<tr>
			<td><code>icons</code></td>
			<td><code>'selected' | 'both' | undefined</code></td>
			<td>
				Controls the visibility of icons. Determines if only one icon is shown when selected, if
				both are shown (which also increases the size of the indicator when unchecked) or none for
				never showing an icon.</td
			>
		</tr>
	</tbody>
</table>

<h3 id="bindables">Bindables</h3>
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
			<td><code>selected</code></td>
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
