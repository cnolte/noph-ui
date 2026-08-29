<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Placement from './demos/Placement.svelte'
	import PlacementSource from './demos/Placement.svelte?raw'
	import Standard from './demos/Standard.svelte'
	import StandardSource from './demos/Standard.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Sheets - Noph UI</title>
</svelte:head>

<h1>Sheets</h1>
<p>
	A surface docked to an edge of the screen, holding content secondary to what is behind it. Dock it
	to the bottom for a bottom sheet, or to a side for a side sheet.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A sheet is a <code>&lt;dialog&gt;</code>. A modal one takes focus, keeps the page behind it
	unreachable for as long as it is open, and gives focus back when it closes, all from the browser
	rather than from script. Clicking the scrim or pressing <kbd>Escape</kbd> closes it.
</p>
<p>
	Give the sheet an <code>id</code> and point a trigger at it with
	<code>command="show-modal"</code> and <code>commandfor</code>. <code>command="close"</code> closes it
	again. No script and no state of your own, and it works before the page has hydrated.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="placement">Placement<a href="#placement" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>placement</code> picks the edge. <code>bottom</code> and <code>top</code> span the width;
	<code>start</code> and <code>end</code> run the full height, which is M3's side sheet. The drag handle
	is a bottom sheet affordance, so it is only drawn there.
</p>
<DemoContainer>
	<Placement />
</DemoContainer>
<Code value={PlacementSource} />

<h2 id="standard">Standard<a href="#standard" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>modal={false}</code> makes a standard sheet: it sits alongside the content and leaves the rest
	of the page usable, with no scrim and no focus trap. Close it yourself, since there is no light dismiss.
</p>
<p>
	This is the one sheet a trigger cannot open on its own. The invoker commands cover a modal dialog
	only, so there is no counterpart to <code>show-modal</code> for a standard one: call
	<code>show()</code> and <code>close()</code> on the component instead.
	<code>command="close"</code>
	still closes it.
</p>
<DemoContainer>
	<Standard />
</DemoContainer>
<Code value={StandardSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<table>
	<thead>
		<tr><th>Custom property</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr><td><code>--np-sheet-container-color</code></td><td>Background.</td></tr>
		<tr><td><code>--np-sheet-shape</code></td><td>Corner radius on the exposed edges.</td></tr>
		<tr>
			<td><code>--np-sheet-size</code></td>
			<td>Height of a bottom or top sheet, width of a side sheet.</td>
		</tr>
		<tr><td><code>--np-sheet-handle-color</code></td><td>The drag handle.</td></tr>
		<tr><td><code>--np-sheet-elevation</code></td><td>Shadow.</td></tr>
	</tbody>
</table>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Renders a <code>&lt;dialog&gt;</code> and takes its attributes. <code>bind:element</code> gives
	you that element, and <code>show()</code> and <code>close()</code> open and close it from outside.
</p>
<table>
	<thead>
		<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Bindable. Whether the sheet is showing.</td>
		</tr>
		<tr>
			<td><code>modal</code></td>
			<td><code>boolean</code></td>
			<td><code>true</code></td>
			<td>Blocks the page behind it and adds a scrim, or sits alongside it.</td>
		</tr>
		<tr>
			<td><code>placement</code></td>
			<td><code>'bottom' | 'top' | 'start' | 'end'</code></td>
			<td><code>'bottom'</code></td>
			<td>Which edge it docks to.</td>
		</tr>
		<tr>
			<td><code>handle</code></td>
			<td><code>boolean</code></td>
			<td><code>true</code></td>
			<td>The drag handle. Drawn on a bottom sheet only.</td>
		</tr>
		<tr>
			<td><code>headline</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Names the sheet, and is what assistive technology announces.</td>
		</tr>
		<tr>
			<td><code>action</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Trailing action in the header, usually a close button.</td>
		</tr>
	</tbody>
</table>
