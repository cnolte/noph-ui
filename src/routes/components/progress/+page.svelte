<script>
	import CircularProgress from '$lib/progress/CircularProgress.svelte'
	import LinearProgress from '$lib/progress/LinearProgress.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Progress indicators - Noph UI</title>
</svelte:head>

<h1>Progress indicators</h1>
<h2>Usage</h2>
<DemoContainer>
	<CircularProgress aria-label="Circular progress 75%" value={0.75} />
	<CircularProgress aria-label="Circular progress indeterminate" indeterminate />
	<div class="linear-list">
		<LinearProgress aria-label="Linear progress 75%" value={0.75} />
		<LinearProgress aria-label="Linear progress indeterminate" indeterminate />
	</div></DemoContainer
>
<Code
	value={`<CircularProgress value={0.75} />
<CircularProgress indeterminate />
<LinearProgress value={0.75} />
<LinearProgress indeterminate />`}
/>

<h3>Four colors</h3>
<DemoContainer>
	<CircularProgress
		aria-label="Circular progress indeterminate fourColor"
		fourColor
		indeterminate
	/>
	<div class="linear-list">
		<LinearProgress aria-label="Linear progress indeterminate fourColor" fourColor indeterminate />
	</div>
</DemoContainer>
<Code
	value={`<CircularProgress fourColor indeterminate />
<LinearProgress fourColor indeterminate />`}
/>
<h2>Circular progress</h2>
<DemoContainer>
	<CircularProgress aria-label="Circular progress indeterminate" indeterminate />
	<CircularProgress aria-label="Circular progress 40%" value={0.4} /></DemoContainer
>
<Code
	value={`<CircularProgress indeterminate />
<CircularProgress value={0.4} />`}
/>
<h2>Linear progress</h2>
<DemoContainer>
	<LinearProgress aria-label="Linear progress indeterminate" indeterminate />
	<LinearProgress aria-label="Linear progress 40%" value={0.4} />
</DemoContainer>
<Code
	value={`<LinearProgress indeterminate />
<LinearProgress value={0.4} />`}
/>
<h3>Buffer</h3>
<DemoContainer>
	<LinearProgress aria-label="Linear progress buffer" value={0.5} buffer={0.8} />
</DemoContainer>
<Code value={`<LinearProgress value={0.5} buffer={0.8} />`} />

<h2>Theming</h2>
<h3>Circular progress tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-circular-progress-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-circular-progress-active-indicator-width</code></td>
			<td><code>8.3333</code></td>
		</tr>
		<tr>
			<td><code>--np-circular-progress-size</code></td>
			<td><code>3rem</code></td>
		</tr>
	</tbody>
</table>
<h3>Circular progress example</h3>
<DemoContainer>
	<CircularProgress
		--np-circular-progress-color="var(--np-color-error)"
		--np-circular-progress-active-indicator-width="20"
		--np-circular-progress-size="5rem"
		aria-label="Circular progress custom"
		indeterminate
	/>
</DemoContainer>
<Code
	value={`<CircularProgress
	--np-circular-progress-color="var(--np-color-error)"
	--np-circular-progress-active-indicator-width="20"
	--np-circular-progress-size="5rem"
	indeterminate
/>`}
/>
<h3>Linear progress tokens</h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-linear-progress-track-shape</code></td>
			<td><code>0</code></td>
		</tr>
		<tr>
			<td><code>--np-linear-progress-track-height</code></td>
			<td><code>0.25rem</code></td>
		</tr>
		<tr>
			<td><code>--np-linear-progress-active-indicator-height</code></td>
			<td><code>0.25rem</code></td>
		</tr>
		<tr>
			<td><code>--np-linear-progress-active-indicator-color</code></td>
			<td><code>--np-color-primary</code></td>
		</tr>
		<tr>
			<td><code>--np-linear-progress-track-color</code></td>
			<td><code>--np-color-surface-container-highest</code></td>
		</tr></tbody
	>
</table>
<h3>Linear progress example</h3>
<DemoContainer>
	<LinearProgress
		--np-linear-progress-active-indicator-color="var(--np-color-error)"
		--np-linear-progress-track-shape="0.5rem"
		--np-linear-progress-track-height="0.5rem"
		--np-linear-progress-active-indicator-height="0.5rem"
		aria-label="Linear progress custom"
		indeterminate
	/>
</DemoContainer>
<Code
	value={`<LinearProgress
	--np-linear-progress-active-indicator-color="var(--np-color-error)"
	--np-linear-progress-track-shape="0.5rem"
	--np-linear-progress-track-height="0.5rem"
	--np-linear-progress-active-indicator-height="0.5rem"
	indeterminate
/>`}
/>

<h2>API</h2>
<h3>Circular progress attributes</h3>
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
			<td><code>value</code></td>
			<td><code>number</code></td>
			<td><code>0</code></td>
			<td>Progress to display, a fraction between 0 and <code>max</code></td>
		</tr>
		<tr>
			<td><code>max</code></td>
			<td><code>number</code></td>
			<td><code>1</code></td>
			<td>Maximum progress to display, defaults to 1.</td>
		</tr>
		<tr>
			<td><code>indeterminate</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td
				>Whether or not to display indeterminate progress, which gives no indication to how long an
				activity will take.</td
			>
		</tr>
		<tr>
			<td><code>fourColor</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether or not to render indeterminate mode using 4 colors instead of one.</td>
		</tr>
	</tbody>
</table>
<h3>Circular progress bindables</h3>
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
<h3>Linear progress attributes</h3>
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
			<td><code>value</code></td>
			<td><code>number</code></td>
			<td><code>0</code></td>
			<td>Progress to display, a fraction between 0 and <code>max</code></td>
		</tr>
		<tr>
			<td><code>max</code></td>
			<td><code>number</code></td>
			<td><code>1</code></td>
			<td>Maximum progress to display, defaults to 1.</td>
		</tr>
		<tr>
			<td><code>indeterminate</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td
				>Whether or not to display indeterminate progress, which gives no indication to how long an
				activity will take.</td
			>
		</tr>
		<tr>
			<td><code>fourColor</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether or not to render indeterminate mode using 4 colors instead of one.</td>
		</tr>
		<tr>
			<td><code>buffer</code></td>
			<td><code>number</code></td>
			<td><code>0</code></td>
			<td
				>Buffer amount to display, a fraction between 0 and <code>max</code>. If the value is 0 or
				negative, the buffer is not displayed.</td
			>
		</tr>
	</tbody>
</table>
<h3>Linear progress bindables</h3>
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

<style>
	.linear-list {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-self: stretch;
	}
</style>
