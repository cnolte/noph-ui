<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
	import Vertical from './demos/Vertical.svelte'
	import VerticalSource from './demos/Vertical.svelte?raw'
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
	A divider is a thin line that separates content in a list or between sections of a layout. Use one
	only where whitespace is not enough.
</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer><Usage /></DemoContainer>
<Code value={UsageSource} />

<h3 id="vertical">Vertical<a href="#vertical" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	<code>orientation="vertical"</code> makes the divider vertical, for example between text and media
	on a large screen. It takes the height of its flex or grid row. <code>inset</code> indents it at
	the top, and <code>inset-middle</code> at the top and bottom.
</p>
<DemoContainer><Vertical /></DemoContainer>
<Code value={VerticalSource} />

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
	The divider renders <code>role="separator"</code>, which screen readers announce. This helps when
	it separates groups on different topics, such as a list of accounts and a list of settings.
</p>
<p>
	For a purely decorative divider, pass <code>aria-hidden="true"</code>. Keep the role on dividers
	that carry meaning.
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
		<tr>
			<td><code>orientation</code></td>
			<td><code>'horizontal' | 'vertical'</code></td>
			<td><code>'horizontal'</code></td>
			<td
				>A vertical divider takes the height of its flex or grid row and sets <code
					>aria-orientation</code
				>.</td
			>
		</tr>
	</tbody>
</table>
