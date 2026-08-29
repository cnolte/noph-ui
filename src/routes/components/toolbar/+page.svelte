<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Docked from './demos/Docked.svelte'
	import DockedSource from './demos/Docked.svelte?raw'
	import Floating from './demos/Floating.svelte'
	import FloatingSource from './demos/Floating.svelte?raw'
	import Vertical from './demos/Vertical.svelte'
	import VerticalSource from './demos/Vertical.svelte?raw'
	import Vibrant from './demos/Vibrant.svelte'
	import VibrantSource from './demos/Vibrant.svelte?raw'
</script>

<svelte:head>
	<title>Toolbar - Noph UI</title>
</svelte:head>

<h1>Toolbar</h1>
<p>
	Frequently used actions for the current page. A toolbar replaces the bottom app bar, which
	Material 3 Expressive deprecated.
</p>

<h2 id="docked">Docked<a href="#docked" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A docked toolbar spans the full width of its container and sits flush against an edge. Use it for
	actions that stay the same from page to page.
</p>
<DemoContainer>
	<Docked />
</DemoContainer>
<Code value={DockedSource} />

<h2 id="floating">Floating<a href="#floating" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A floating toolbar hovers above the content as a rounded island. Use it for actions that belong to
	the page you are on. It is <code>position: sticky</code>, so it stays in flow and never covers the
	end of the content.
</p>
<DemoContainer>
	<Floating />
</DemoContainer>
<Code value={FloatingSource} />

<h3 id="vibrant">Vibrant<a href="#vibrant" aria-hidden="true" tabindex="-1">#</a></h3>
<p><code>color="vibrant"</code> gives a floating toolbar the primary container colour.</p>
<DemoContainer>
	<Vibrant />
</DemoContainer>
<Code value={VibrantSource} />

<h2 id="vertical">Vertical<a href="#vertical" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>orientation="vertical"</code> stacks the actions and tells assistive technology the arrows move
	up and down rather than left and right. Tooltips move to the trailing side, since above a stacked button
	is where the button before it sits.
</p>
<DemoContainer>
	<Vertical />
</DemoContainer>
<Code value={VerticalSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<table>
	<thead>
		<tr><th>Custom property</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr><td><code>--np-toolbar-container-color</code></td><td>Background.</td></tr>
		<tr><td><code>--np-toolbar-color</code></td><td>Icon and text color.</td></tr>
		<tr><td><code>--np-toolbar-shape</code></td><td>Corner radius when floating.</td></tr>
		<tr><td><code>--np-toolbar-elevation</code></td><td>Shadow when floating.</td></tr>
		<tr><td><code>--np-toolbar-gap</code></td><td>Space between actions.</td></tr>
		<tr><td><code>--np-toolbar-inset</code></td><td>Distance from the edge when floating.</td></tr>
	</tbody>
</table>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Renders a <code>&lt;div role="toolbar"&gt;</code> and takes its attributes. Give it an
	<code>aria-label</code>. The actions form a single tab stop with the arrow keys moving between
	them, so a toolbar does not add one tab stop per button.
</p>
<table>
	<thead>
		<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr>
			<td><code>variant</code></td>
			<td><code>'docked' | 'floating'</code></td>
			<td><code>'docked'</code></td>
			<td>Full width and flush, or a rounded island above the content.</td>
		</tr>
		<tr>
			<td><code>placement</code></td>
			<td><code>'bottom' | 'top' | 'start' | 'end'</code></td>
			<td><code>'bottom'</code></td>
			<td>Which edge a floating toolbar hovers against. Ignored when docked.</td>
		</tr>
		<tr>
			<td><code>orientation</code></td>
			<td><code>'horizontal' | 'vertical'</code></td>
			<td><code>'horizontal'</code></td>
			<td>Direction of the actions and of the arrow keys.</td>
		</tr>
		<tr>
			<td><code>color</code></td>
			<td><code>'standard' | 'vibrant'</code></td>
			<td><code>'standard'</code></td>
			<td>Container colour of a floating toolbar.</td>
		</tr>
	</tbody>
</table>
