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
			<td><code>min</code></td>
			<td><code>number</code></td>
			<td>The minimum value allowed for the slider</td>
		</tr>
		<tr>
			<td><code>max</code></td>
			<td><code>number</code></td>
			<td>The maximum value allowed for the slider</td>
		</tr>
		<tr>
			<td><code>step</code></td>
			<td><code>number | 'any'</code></td>
			<td
				>Specifies the interval between valid values. The value will snap to multiples of this step
				(starting from the minimum). If you set a step size you probably also want to show the
				individual stops by setting<code>stops={true}</code></td
			>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td>If true, the slider interaction is disabled (defaults to false)</td>
		</tr>
		<tr>
			<td><code>showValue</code></td>
			<td><code>boolean</code></td>
			<td>Displays the current value near the slider (defaults to true)</td>
		</tr>
		<tr>
			<td><code>size</code></td>
			<td><code>SliderSize</code></td>
			<td
				>The size of the slider component as defined in the measurement table <a
					href="https://m3.material.io/components/sliders/specs">here</a
				></td
			>
		</tr>
		<tr>
			<td><code>stops</code></td>
			<td><code>boolean</code></td>
			<td
				>Render visual stops (ticks) along the slider track. (only useful in combination with
				"steps")</td
			>
		</tr>
		<tr>
			<td><code>endStop</code></td>
			<td><code>boolean</code></td>
			<td>Show a stop specifically at the end of the slider</td>
		</tr>
		<tr>
			<td><code>vertical</code></td>
			<td><code>boolean</code></td>
			<td>Displayed the slider vertically instead of horizontally</td>
		</tr>
		<tr>
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td>An accessible label or text associated with the slider</td>
		</tr>
		<tr>
			<td><code>format</code></td>
			<td><code>(n: number) =&gt; string</code></td>
			<td>A function to format the displayed value (e.g. for adding units)</td>
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
			<td><code>value</code></td>
			<td><code>number</code></td>
			<td>The current value of the slider</td>
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
			<td>Allows access to the input element</td>
		</tr>
	</tbody>
</table>
