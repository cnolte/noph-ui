<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import PlainTooltip from './demos/PlainTooltip.svelte'
	import PlainTooltipSource from './demos/PlainTooltip.svelte?raw'
	import Positioning from './demos/Positioning.svelte'
	import PositioningSource from './demos/Positioning.svelte?raw'
	import Types from './demos/Types.svelte'
	import TypesSource from './demos/Types.svelte?raw'
</script>

<svelte:head>
	<title>Tooltips - Material 3 tooltip component for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 tooltip for Svelte, plain or rich: an explanation in the top layer that nothing clips, driven by the browser wherever it can be."
	/>
</svelte:head>

<h1>Tooltips</h1>
<p>
	A tooltip explains a control that does not explain itself. It sits in the top layer as a popover,
	so nothing clips it, and the browser drives it wherever it can.
</p>

<h2 id="types">Types<a href="#types" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Types />
</DemoContainer>
<ul>
	<li>
		<strong>Plain</strong> labels the control. It shows on hover and on focus, and leaves again.
	</li>
	<li>
		<strong>Rich</strong> adds a subhead, text and an action, and stays until it is dismissed.
	</li>
</ul>
<Code value={TypesSource} />

<h2 id="plain-tooltip">
	Plain tooltip<a href="#plain-tooltip" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>Button</code> and <code>IconButton</code> take a <code>title</code> and do the rest: it
	becomes the tooltip text and the <code>aria-label</code>, and a disabled or loading control drops
	it. Any other element becomes the anchor by pointing <code>aria-describedby</code> at the
	tooltip's
	<code>id</code>.
</p>
<DemoContainer>
	<PlainTooltip />
</DemoContainer>
<Code value={PlainTooltipSource} />
<p>
	After the pointer leaves it waits half a second before hiding, so the text inside stays reachable.
	<kbd>Escape</kbd> closes it.
</p>

<h2 id="rich-tooltip">
	Rich tooltip<a href="#rich-tooltip" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A rich tooltip is persistent. A click or a tap on the control opens it, and it stays open when the
	pointer leaves, until the person interacts with something else: <kbd>Escape</kbd> or a click outside
	closes it. Hovering is deliberately not a trigger, so a panel with an action in it does not appear under
	a pointer that is only passing through.
</p>
<p>
	The control points at it with <code>commandfor</code>, and
	<code>command="show-popover"</code> keeps a second click on the control from closing it again. A
	keyboard reaches it the same way, since <kbd>Enter</kbd> on the control is a click.
</p>
<p>
	It takes a <code>subhead</code>, its children as the text and an <code>actions</code> snippet, and
	it is at most <code>20rem</code> wide. <code>bind:open</code>, <code>element</code>,
	<code>show</code> and <code>close</code> are there to open and close it yourself, which is how Material
	introduces a new feature on page load.
</p>

<h2 id="positioning">Positioning<a href="#positioning" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A plain tooltip sits centered above its anchor, a rich one centered below its control. Neither
	covers it: they flip to the other side when there is no room, and shift back in when a window edge
	is in the way. Both sides are custom properties.
</p>
<DemoContainer>
	<Positioning />
</DemoContainer>
<Code value={PositioningSource} />
<p>
	That last one is the placement Material specifies by default: the panel's top left corner sits at
	the control's bottom right corner. Centered below, the way this component leaves it, is the
	variant Material allows on desktop.
</p>

<p>
	A vertical <a href="/components/toolbar">toolbar</a> does this for you. Its actions are stacked, so
	a tooltip above one of them would cover the one before it, and the toolbar moves them to the trailing
	side instead.
</p>

<h2 id="without-javascript">
	Without JavaScript<a href="#without-javascript" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Everything a tooltip needs is in the markup the server sends: <code>interestfor</code> on a plain
	tooltip's anchor, <code>command</code> and <code>commandfor</code> on a rich tooltip's control,
	the popover itself and CSS for the timing. Either attribute also makes the control the implicit
	anchor of its popover, so there is no <code>anchor-name</code> to set.
</p>
<Code
	value={`<button interestfor="save-tip" aria-describedby="save-tip">
	Save
</button>
<Tooltip id="save-tip">Save the file</Tooltip>`}
/>
<p>
	<code>interestfor</code> only exists on <code>a</code>, <code>area</code> and
	<code>button</code>. Any other anchor, and any browser without it, falls back to listeners the
	plain tooltip attaches on mount. A rich tooltip attaches none at all: opening it is a click on its
	control, which the browser handles on its own.
</p>

<h2 id="touch-devices">
	Touch devices<a href="#touch-devices" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A link or a button shows its plain tooltip on long press, and a rich tooltip opens on tap. The
	fallback has no hover to work with, so it stays quiet on
	<code>(hover: none) and (pointer: coarse)</code>. Never put information in a tooltip that is not
	available anywhere else.
</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Both render <code>role="tooltip"</code>. A plain tooltip hangs off its anchor's
	<code>aria-describedby</code>; a rich one gets <code>aria-expanded</code> and
	<code>aria-details</code> from <code>commandfor</code>, and <kbd>Tab</kbd> moves from the control into
	the panel.
</p>
<p>
	A plain tooltip opens on keyboard focus but not on a plain click, so it stays out of the way of a
	pointer user; a rich one opens on <kbd>Enter</kbd>, the same click a pointer makes. On an
	icon-only control, <code>title</code> gives the button its name and its description in one go. An action
	inside a tooltip is a shortcut, never the only way to get somewhere.
</p>
<Code
	value={`<IconButton title="Delete message">
	<Icon>delete</Icon>
</IconButton>`}
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
			<td><code>--np-tooltip-position-area</code></td>
			<td><code>top</code></td>
		</tr>
		<tr>
			<td><code>--np-tooltip-justify-self</code></td>
			<td><code>anchor-center</code></td>
		</tr>
		<tr>
			<td><code>--np-tooltip-align-self</code></td>
			<td><code>auto</code></td>
		</tr>
		<tr>
			<td><code>--np-tooltip-margin</code></td>
			<td><code>4px 0</code></td>
		</tr>
		<tr>
			<td><code>--np-tooltip-position-try-fallbacks</code></td>
			<td><code>flip-block</code></td>
		</tr>
		<tr>
			<td><code>--np-rich-tooltip-position-area</code></td>
			<td><code>bottom</code></td>
		</tr>
		<tr>
			<td><code>--np-rich-tooltip-justify-self</code></td>
			<td><code>anchor-center</code></td>
		</tr>
		<tr>
			<td><code>--np-rich-tooltip-align-self</code></td>
			<td><code>auto</code></td>
		</tr>
		<tr>
			<td><code>--np-rich-tooltip-margin</code></td>
			<td><code>4px 0</code></td>
		</tr>
		<tr>
			<td><code>--np-rich-tooltip-position-try-fallbacks</code></td>
			<td><code>flip-block</code></td>
		</tr>
		<tr>
			<td><code>--np-rich-tooltip-action-inset</code></td>
			<td><code>1rem</code></td>
		</tr>
	</tbody>
</table>
<p>
	Both position properties take any CSS <code>position-area</code> value, for example
	<code>right</code> or <code>bottom right</code>. The colors come from the theme: a plain tooltip
	uses the <code>inverse-surface</code> roles, a rich one
	<code>surface-container</code> and <code>on-surface-variant</code>.
</p>
<p>
	The action row is pulled out by <code>--np-rich-tooltip-action-inset</code> so the label of the
	action lines up with the text above it. It matches the inline padding of a small
	<code>Button</code>, so set it to the padding of the action you use if that differs.
</p>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="tooltip-attributes">
	Tooltip attributes<a href="#tooltip-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Everything else is forwarded to the tooltip element. <code>role</code> is set by the component.
</p>
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
			<td><code>id</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Connects the tooltip to its anchor, the element with a matching
				<code>aria-describedby</code>.</td
			>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable. Reflects whether the tooltip is shown.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the tooltip element.</td>
		</tr>
	</tbody>
</table>

<h3 id="rich-tooltip-attributes">
	Rich tooltip attributes<a href="#rich-tooltip-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Everything else is forwarded to the panel. <code>role</code> and <code>popover</code> are set by the
	component.
</p>
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
			<td><code>id</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Connects the tooltip to its control, the element with a matching
				<code>commandfor</code>.</td
			>
		</tr>
		<tr>
			<td><code>subhead</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Title line above the text.</td>
		</tr>
		<tr>
			<td><code>actions</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Row below the text, meant for one or two text buttons.</td>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable in both directions. Setting it opens or closes the tooltip.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the panel.</td>
		</tr>
	</tbody>
</table>
