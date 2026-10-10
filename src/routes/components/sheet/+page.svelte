<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Heights from './demos/Heights.svelte'
	import HeightsSource from './demos/Heights.svelte?raw'
	import Placement from './demos/Placement.svelte'
	import PlacementSource from './demos/Placement.svelte?raw'
	import SideSheet from './demos/SideSheet.svelte'
	import SideSheetSource from './demos/SideSheet.svelte?raw'
	import Standard from './demos/Standard.svelte'
	import StandardSource from './demos/Standard.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Sheets - Material 3 bottom and side sheets for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 sheet for Svelte: a surface docked to an edge of the screen, modal or standard, from the bottom or a side, with a drag handle and expressive motion."
	/>
</svelte:head>

<h1>Sheets</h1>
<p>
	A surface docked to an edge of the screen. It holds content secondary to what is behind it. Dock
	it to the bottom for a bottom sheet, or to a side for a side sheet.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A sheet is a <code>&lt;dialog&gt;</code>. A modal sheet takes focus, keeps the page behind it
	unreachable while it is open, and gives focus back when it closes. Clicking the scrim or pressing
	<kbd>Escape</kbd> closes it.
</p>
<p>
	Give the sheet an <code>id</code> and point a trigger at it with
	<code>command="show-modal"</code> and <code>commandfor</code>. <code>command="close"</code> closes it.
	This needs no script or state, and it works before the page has hydrated.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="placement">Placement<a href="#placement" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>placement</code> picks the edge. <code>bottom</code> and <code>top</code> span the width.
	<code>start</code> and <code>end</code> run the full height and make a side sheet. The drag handle is
	only drawn on a bottom sheet.
</p>
<DemoContainer>
	<Placement />
</DemoContainer>
<Code value={PlacementSource} />

<h2 id="heights">Heights<a href="#heights" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A bottom sheet opens at most half the window high. Selecting the drag handle (a click,
	<kbd>Space</kbd> or <kbd>Enter</kbd>) raises a taller sheet to its full height and lowers it
	again. A sheet that already shows everything closes instead. You can also drag the handle: up to
	raise the sheet, down to lower or close it. The sheet settles on the nearest height. Raised, it
	keeps 72dp free at the top. In a window wider than 640dp it keeps 56dp at the top and 56dp at the
	sides.
	<code>bind:expanded</code> reads and sets the height.
</p>
<DemoContainer>
	<Heights />
</DemoContainer>
<Code value={HeightsSource} />

<h2 id="side-sheet">Side sheet<a href="#side-sheet" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A side sheet can start its header with a back button through <code>leading</code> and show actions
	along the bottom through <code>actions</code>. <code>detached</code> holds it 16dp from the window's
	edges with every corner rounded.
</p>
<DemoContainer>
	<SideSheet />
</DemoContainer>
<Code value={SideSheetSource} />

<h2 id="standard">Standard<a href="#standard" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>modal={false}</code> makes a standard sheet. The rest of the page stays usable, with no scrim
	and no focus trap. Clicking outside does not close it, so close it yourself. A standard side sheet is
	part of the layout: place it in a row beside the content, which shrinks to make room as the sheet opens.
</p>
<p>
	A trigger cannot open a standard sheet, because invoker commands only open modal dialogs. Bind
	<code>open</code>, or call <code>show()</code> and <code>close()</code> on the component.
	<code>command="close"</code> still closes it.
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
			<td><code>--np-sheet-max-width</code></td>
			<td>Widest a bottom sheet gets before it centers. Defaults to 40rem.</td>
		</tr>
		<tr>
			<td><code>--np-sheet-size</code></td>
			<td>Height of a bottom or top sheet, width of a side sheet.</td>
		</tr>
		<tr><td><code>--np-sheet-handle-color</code></td><td>The drag handle.</td></tr>
		<tr><td><code>--np-sheet-elevation</code></td><td>Shadow.</td></tr>
	</tbody>
</table>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The sheet is a native <code>&lt;dialog&gt;</code>. A modal sheet opens with
	<code>showModal</code>, so the browser keeps focus inside it, marks the rest of the page
	<code>inert</code> and closes it on Escape or a click on the scrim. A standard sheet stays part of the
	page, and focus moves in and out of it as usual.
</p>
<p>
	The <code>headline</code> names the sheet through <code>aria-labelledby</code> and renders as a
	level two heading. Change the level with <code>headlineLevel</code> to fit your page outline. A
	sheet without a headline needs an <code>aria-label</code>. The drag handle is a button named by
	<code>handleLabel</code> ("Drag handle" by default). Its <code>aria-expanded</code> says whether the
	sheet is raised. Only the handle responds to a pointer drag, so the content scrolls as usual.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Renders a <code>&lt;dialog&gt;</code> and takes its attributes. <code>bind:element</code> gives
	you that element. <code>show()</code> and <code>close()</code> open and close it from outside.
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
			<td
				>When true, blocks the page behind it and adds a scrim. When false, sits beside the page.</td
			>
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
			<td><code>handleLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Drag handle'</code></td>
			<td>Names the drag handle.</td>
		</tr>
		<tr>
			<td><code>expanded</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether a bottom sheet is raised to its full height. Bindable.</td>
		</tr>
		<tr>
			<td><code>detached</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Holds a side sheet 16dp from the window's edges, with every corner rounded.</td>
		</tr>
		<tr>
			<td><code>leading</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Content before the headline, such as a back button.</td>
		</tr>
		<tr>
			<td><code>headline</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Names the sheet. Assistive technology announces it.</td>
		</tr>
		<tr>
			<td><code>headlineLevel</code></td>
			<td><code>1 | 2 | 3 | 4 | 5 | 6</code></td>
			<td><code>2</code></td>
			<td>
				Heading level the <code>headline</code> renders as. Set it to fit your page outline.
			</td>
		</tr>
		<tr>
			<td><code>action</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Trailing action in the header, usually a close button.</td>
		</tr>
		<tr>
			<td><code>actions</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Actions along the bottom of the sheet.</td>
		</tr>
	</tbody>
</table>
