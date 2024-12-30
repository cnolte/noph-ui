<script>
	import Radio from '$lib/radio/Radio.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Radio button - Noph UI</title>
</svelte:head>

<h1>Radio button</h1>
<h2>Usage</h2>
<DemoContainer>
	<form>
		<Radio name="group" value="first" aria-label="First radio" checked />
		<Radio name="group" value="second" aria-label="Second radio" />
		<Radio name="group" value="third" aria-label="Third radio" />
	</form>
</DemoContainer>
<Code
	value={`<Radio name="group" value="first" aria-label="First radio" checked />
<Radio name="group" value="second" aria-label="Second radio" />
<Radio name="group" value="third" aria-label="Third radio" />`}
/>
<h3>Labels</h3>
<DemoContainer>
	<form style="display: flex; align-items: center;">
		<Radio name="group" value="cat" id="cat-radio" checked />
		<label style="margin-right:1rem" for="cat-radio">Cat</label>
		<Radio name="group" value="second" id="mouse-radio" />
		<label style="margin-right:1rem" for="mouse-radio">Mouse</label>
		<Radio name="group" value="third" id="dog-radio" />
		<label for="dog-radio">Dog</label>
	</form>
</DemoContainer>
<Code
	value={`<Radio name="animals" value="cat" id="cat-radio" checked />
<label for="cat-radio">Cat</label>

<Radio name="animals" value="second" id="mouse-radio" />
<label for="mouse-radio">Mouse</label>

<Radio name="animals" value="third" id="dog-radio" />
<label for="dog-radio">Dog</label>`}
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
			<td><code>--np-radio-icon-size</code></td>
			<td><code>20px</code></td>
		</tr>
		<tr>
			<td><code>--np-radio-icon-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-radio-selected-icon-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
	</tbody>
</table>
<h3>Example</h3>
<DemoContainer>
	<Radio
		--np-radio-icon-size="40px"
		--np-radio-icon-color="var(--np-color-secondary)"
		--np-radio-selected-icon-color="var(--np-color-tertiary)"
		checked
		aria-label="Themed Radio 1"
		name="themed"
	/>
	<Radio
		--np-radio-icon-size="40px"
		--np-radio-icon-color="var(--np-color-secondary)"
		--np-radio-selected-icon-color="var(--np-color-tertiary)"
		checked
		aria-label="Themed Radio 2"
		name="themed"
	/>
	<Radio
		--np-radio-icon-size="40px"
		--np-radio-icon-color="var(--np-color-secondary)"
		--np-radio-selected-icon-color="var(--np-color-tertiary)"
		checked
		aria-label="Themed Radio 3"
		name="themed"
	/>
</DemoContainer>
<Code
	value={`<Radio
	--np-radio-icon-size="40px"
	--np-radio-icon-color="var(--np-color-secondary)"
	--np-radio-selected-icon-color="var(--np-color-tertiary)"
	checked
	name="themed"
/>
<Radio
	--np-radio-icon-size="40px"
	--np-radio-icon-color="var(--np-color-secondary)"
	--np-radio-selected-icon-color="var(--np-color-tertiary)"
	checked
	name="themed"
/>
<Radio
	--np-radio-icon-size="40px"
	--np-radio-icon-color="var(--np-color-secondary)"
	--np-radio-selected-icon-color="var(--np-color-tertiary)"
	checked
	name="themed"
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
