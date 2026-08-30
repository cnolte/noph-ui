<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Divider - Material 3 divider for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 divider for Svelte: a thin rule that separates content in lists and layouts, horizontal or vertical, with an inset you control."
	/>
</svelte:head>

<h1>Divider</h1>
<p>
	A divider is a thin rule that separates content, in a list or between the sections of a layout.
	Reach for one only where whitespace is not enough on its own.
</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer><Usage /></DemoContainer>
<Code value={UsageSource} />

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
			<td><code>--np-divider-color</code></td>
			<td><code>--np-color-outline-variant</code></td>
		</tr>
	</tbody>
</table>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The divider renders <code>role="separator"</code>, which is what a screen reader announces when it
	separates groups that belong to different topics, a list of accounts from a list of settings say.
</p>
<p>
	A rule that is only there to look tidy is noise in that reading. Pass
	<code>aria-hidden="true"</code> for those, and keep the role for the ones that carry meaning.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h3>
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
