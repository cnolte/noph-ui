<script lang="ts">
	import LoadingIndicator from '#lib/loading-indicator/LoadingIndicator.svelte'
	import Slider from '#lib/slider/Slider.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'

	let value = $state(0.6)
</script>

<svelte:head>
	<title>Loading indicator - Noph UI</title>
</svelte:head>

<h1>Loading indicator</h1>
<p>
	The loading indicator is the Material 3 expressive take on a spinner. Instead of sweeping an arc
	around a circle, it morphs through a sequence of shapes while it turns. Use it for short waits
	inside a surface you already own, such as a pull to refresh gesture or a panel that is fetching
	its contents. For anything that reports real progress over a longer period, reach for
	<a href="/components/progress">progress indicators</a> instead.
</p>

<h2>Indeterminate</h2>
<p>
	Pass <code>indeterminate</code> when you cannot say how long the wait will be. The indicator loops through
	seven shapes, a new morph every 650ms, and completes a full turn every 4.7 seconds.
</p>
<DemoContainer>
	<LoadingIndicator aria-label="Loading" indeterminate />
</DemoContainer>
<Code
	value={`<LoadingIndicator
	indeterminate
	aria-label="Loading"
/>`}
/>

<h2>Determinate</h2>
<p>
	With a <code>value</code> the indicator morphs from a circle into a soft burst as it fills up,
	turning half a rotation counterclockwise along the way. <code>value</code> is a fraction between
	<code>0</code>
	and <code>max</code>, which defaults to <code>1</code>.
</p>
<DemoContainer>
	<div class="controls">
		<Slider
			min={0}
			max={1}
			labeled
			step={0.01}
			bind:value
			aria-label="Progress value"
			format={(v) => `${Math.round(v * 100)}%`}
		/>
		<div class="row">
			<LoadingIndicator aria-label="Download progress" {value} />
			<LoadingIndicator aria-label="Download progress" contained {value} />
		</div>
	</div>
</DemoContainer>
<Code value={`<LoadingIndicator value={0.6} aria-label="Download progress" />`} />

<h2>Contained</h2>
<p>
	<code>contained</code> puts the shape on a filled circle. Use it when the indicator floats over content,
	where the container keeps it legible, and leave it off when the indicator sits on a surface of its own.
</p>
<DemoContainer>
	<div class="row">
		<LoadingIndicator aria-label="Loading" indeterminate />
		<LoadingIndicator aria-label="Loading" contained indeterminate />
	</div>
</DemoContainer>
<Code
	value={`<LoadingIndicator indeterminate aria-label="Loading" />
<LoadingIndicator contained indeterminate aria-label="Loading" />`}
/>

<h2>Accessibility</h2>
<p>
	The indicator renders <code>role="progressbar"</code> and keeps <code>aria-valuenow</code> and
	<code>aria-valuemax</code>
	in sync with <code>value</code> and <code>max</code>. It has no text of its own, so always pass an
	<code>aria-label</code>
	saying what is loading. An indeterminate indicator leaves out <code>aria-valuenow</code>, and that
	omission is what tells assistive technology that the duration is unknown.
</p>
<Code
	value={`<LoadingIndicator
	indeterminate
	aria-label="Loading search results"
/>`}
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
			<td><code>--np-loading-indicator-color</code></td>
			<td
				><code>--np-color-primary</code>, <code>--np-color-on-primary-container</code> when contained</td
			>
		</tr>
		<tr>
			<td><code>--np-loading-indicator-container-color</code></td>
			<td><code>--np-color-primary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-loading-indicator-size</code></td>
			<td><code>3rem</code></td>
		</tr>
	</tbody>
</table>
<p>
	The shape is drawn relative to the container, so it scales with
	<code>--np-loading-indicator-size</code> without any further adjustment.
</p>
<DemoContainer>
	<LoadingIndicator
		--np-loading-indicator-color="var(--np-color-on-error-container)"
		--np-loading-indicator-container-color="var(--np-color-error-container)"
		--np-loading-indicator-size="5rem"
		aria-label="Loading, custom"
		contained
		indeterminate
	/>
</DemoContainer>
<Code
	value={`<LoadingIndicator
	--np-loading-indicator-color="var(--np-color-on-error-container)"
	--np-loading-indicator-container-color="var(--np-color-error-container)"
	--np-loading-indicator-size="5rem"
	contained
	indeterminate
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
			<td><code>value</code></td>
			<td><code>number</code></td>
			<td><code>0</code></td>
			<td>Progress to display, a fraction between 0 and <code>max</code>.</td>
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
			<td><code>contained</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether or not to draw the shape on a filled container.</td>
		</tr>
	</tbody>
</table>

<style>
	.controls {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		min-width: min(22rem, 70vw);
	}
	.row {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}
</style>
