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
	<title>Toolbar - Material 3 toolbar component for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 Expressive toolbar for Svelte: the frequently used actions of a page, docked or floating, horizontal or vertical, in two color roles."
	/>
</svelte:head>

<h1>Toolbar</h1>
<p>
	Frequently used actions for the current page. A toolbar replaces the bottom app bar, which
	Material 3 Expressive deprecated.
</p>

<h2 id="docked">Docked<a href="#docked" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A docked toolbar spans the full width of its container and sits flush against an edge. Use it for
	actions that stay the same from page to page. It has 16dp at the edges and 32dp between its items.
	In a window narrower than 600px the items spread evenly across it.
</p>
<DemoContainer>
	<Docked />
</DemoContainer>
<Code value={DockedSource} />

<h2 id="floating">Floating<a href="#floating" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A floating toolbar sits above the content and has rounded corners. Use it for actions of the
	current page. It uses <code>position: sticky</code>, so it stays in the page flow and does not
	cover the end of the content. It is only as wide as its items and keeps 16dp from the edges, 24dp
	when vertical. Move actions that do not fit into an overflow menu.
</p>
<DemoContainer>
	<Floating />
</DemoContainer>
<Code value={FloatingSource} />

<h3 id="vibrant">Vibrant<a href="#vibrant" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	<code>color="vibrant"</code> gives a docked or floating toolbar the primary container colour. An unselected
	tonal toggle then uses the surface container colour, so it stands out from the toolbar.
</p>
<DemoContainer>
	<Vibrant />
</DemoContainer>
<Code value={VibrantSource} />

<h2 id="vertical">Vertical<a href="#vertical" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A floating toolbar can be vertical, at the side of a large screen.
	<code>orientation="vertical"</code> stacks the actions and tells assistive technology that the arrow
	keys move up and down. Tooltips show on the trailing side, so they do not cover the button above.
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
		<tr
			><td><code>--np-toolbar-gap</code></td><td
				>Space between actions, 32dp docked and 4dp floating.</td
			></tr
		>
		<tr><td><code>--np-toolbar-inset</code></td><td>Distance from the edge when floating.</td></tr>
	</tbody>
</table>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The toolbar renders <code>role="toolbar"</code> with <code>aria-orientation</code> set from
	<code>orientation</code>. Give it an <code>aria-label</code>, for example
	<code>Text formatting</code>. Without a name it is announced as an unnamed group of buttons.
</p>
<p>
	Its buttons share one tab stop. Tab moves into the toolbar and out again. The arrow keys move
	along it, and Home and End jump to the ends. Each button still needs its own <code>title</code>. A
	text field in the toolbar keeps the arrows, Home and End for its caret. An arrow key leaves the
	field when the caret is already at that end. A select keeps the up and down arrows for its value.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Renders a <code>&lt;div role="toolbar"&gt;</code> and takes its attributes. Give it an
	<code>aria-label</code>. The actions share one tab stop, and the arrow keys move between them.
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
			<td>Full width against an edge, or a rounded bar floating above the content.</td>
		</tr>
		<tr>
			<td><code>placement</code></td>
			<td><code>'bottom' | 'top' | 'start' | 'end'</code></td>
			<td><code>'bottom'</code></td>
			<td>Edge a floating toolbar floats at. Ignored when docked.</td>
		</tr>
		<tr>
			<td><code>orientation</code></td>
			<td><code>'horizontal' | 'vertical'</code></td>
			<td><code>'horizontal'</code></td>
			<td
				>Direction of the actions and of the arrow keys. Only a floating toolbar can be vertical.</td
			>
		</tr>
		<tr>
			<td><code>color</code></td>
			<td><code>'standard' | 'vibrant'</code></td>
			<td><code>'standard'</code></td>
			<td>Container colour.</td>
		</tr>
	</tbody>
</table>
