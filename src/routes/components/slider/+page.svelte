<script lang="ts">
	import Slider from '$lib/slider/Slider.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let value = 70
	let vertValue = 70
</script>

<svelte:head>
	<title>Slider - Noph UI</title>
</svelte:head>

<h1>Slider</h1>
<h2>Usage</h2>
<DemoContainer>
	<Slider bind:value max={100} />
</DemoContainer>

<Code
	value={`<script lang="ts">
	let value = 70
</` +
		`script>
<Slider bind:value max={100} />`}
/>

<h2>Disabled</h2>
<DemoContainer>
	<Slider disabled={true} bind:value />
</DemoContainer>

<Code
	value={`<script lang="ts">
	let value = 70
</` +
		`script>
<Slider bind:value disabled={true} />`}
/>

<h2>Step and stops</h2>
<DemoContainer>
	<Slider max={100} step={10} stops={true} />
</DemoContainer>

<Code
	value={`<script lang="ts">
	let value = 0
</` +
		`script>
<Slider bind:value max={100} step={10} stops={true} />`}
/>

<h2>Endstop</h2>
<DemoContainer>
	<Slider max={100} endStop={false} />
</DemoContainer>

<Code
	value={`<script lang="ts">
	let value = 0
</` +
		`script>
<Slider bind:value endStop={false} />`}
/>

<h2>Vertical</h2>
<DemoContainer>
	<Slider bind:value={vertValue} max={100} vertical />
</DemoContainer>

<Code
	value={`<script lang="ts">
	let value = 70
</` +
		`script>
<Slider bind:value max={100} vertical />`}
/>

<h2>Size</h2>
<DemoContainer>
	Extra small: <Slider size="xs"></Slider>
	Small: <Slider size="s"></Slider>
	Medium: <Slider size="m"></Slider>
	Large: <Slider size="l"></Slider>
	Extra large: <Slider size="xl"></Slider>
</DemoContainer>

<h2>API</h2>
<h3>Slider</h3>
<h4>Attributes</h4>
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
			<td><code>value</code></td>
			<td><code>any</code></td>
			<td>Value of the input or textarea.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLSpanElement</code></td>
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
			<td>Allows access to the input element</td>
		</tr>
	</tbody>
</table>
