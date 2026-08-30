<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Loading indicator - Material 3 spinner for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 Expressive loading indicator for Svelte: a spinner that morphs through shapes while it turns, for short waits inside a page."
	/>
</svelte:head>

<h1>Loading indicator</h1>
<p>
	The loading indicator is the Material 3 expressive take on a spinner. Instead of sweeping an arc
	around a circle, it morphs through a sequence of shapes while it turns. Use it for short waits
	inside a surface you already own, such as a pull to refresh gesture or a panel that is fetching
	its contents. For anything that reports real progress over a longer period, reach for
	<a class="link" href="/components/progress">progress indicators</a> instead.
</p>

<h2 id="usage">
	Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The indicator gives no reading of progress, so it needs nothing but a label. It loops through
	seven shapes, a new morph every 650ms, and completes a full turn every 4.7 seconds. The whole
	animation is precomputed, so it runs on the browser's own timeline and costs no script while it
	spins.
	<code>contained</code> puts the shape on a filled circle. Use it when the indicator floats over content,
	where the container keeps it legible, and leave it off when the indicator sits on a surface of its own.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The indicator renders <code>role="progressbar"</code> without an <code>aria-valuenow</code>, and
	that missing value is what tells assistive technology that the wait has no known length. It has no
	text of its own, so always pass an <code>aria-label</code> saying what is loading.
</p>
<Code
	value={`<LoadingIndicator
	aria-label="Loading search results"
/>`}
/>

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
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
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
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
			<td><code>contained</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether or not to draw the shape on a filled container.</td>
		</tr>
	</tbody>
</table>
