<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import IconButton from '#lib/button/IconButton.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Tooltip from '#lib/tooltip/Tooltip.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Tooltips - Noph UI</title>
</svelte:head>

<h1>Tooltips</h1>
<p>
	A tooltip labels an element that is not self-explanatory, most often an icon-only control. It
	appears on hover and on keyboard focus, and disappears again on leave, on blur or on
	<kbd>Escape</kbd>.
</p>
<p>
	A tooltip finds its own anchor: it looks for the element whose <code>aria-describedby</code>
	points at the tooltip's <code>id</code>, and attaches its listeners there. That is also what makes
	the connection readable for assistive technology, so the <code>id</code> is not optional.
</p>

<h2 id="basic-tooltip">
	Basic tooltip<a href="#basic-tooltip" aria-hidden="true" tabindex="-1">#</a>
</h2>
<DemoContainer>
	<div aria-describedby="example-tooltip-1">Hover over this text</div>
	<Tooltip id="example-tooltip-1">This is a basic tooltip</Tooltip>
</DemoContainer>
<Code
	value={`<div aria-describedby="tooltip">
	Hover over this text
</div>
<Tooltip id="tooltip">
	This is a basic tooltip
</Tooltip>`}
/>

<h2 id="button-with-tooltip">
	Button with tooltip<a href="#button-with-tooltip" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>Button</code> and <code>IconButton</code> have built-in support, so a <code>title</code> is
	enough. They render the tooltip for you, wire up <code>aria-describedby</code> and use the same
	text as the <code>aria-label</code>, which is what makes an icon-only button announceable. A
	disabled or loading button drops its tooltip, since there is nothing left to hover.
</p>
<DemoContainer>
	<Button title="This is a button tooltip">Hover over this button</Button>
	<IconButton title="Add to favorites"><Icon>favorite</Icon></IconButton>
</DemoContainer>
<Code
	value={`<Button title="This is a button tooltip">
	Hover over this button
</Button>
<IconButton title="Add to favorites">
	<Icon>favorite</Icon>
</IconButton>`}
/>

<h2 id="positioning">Positioning<a href="#positioning" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A tooltip sits above its anchor and centers on it. Both sides are custom properties, so you can
	move it without touching the component. It is rendered in the top layer as a
	<code>popover="hint"</code>, which keeps it above scroll containers and clipping ancestors, and it
	flips to the other side by itself when there is no room left.
</p>
<DemoContainer>
	<Button title="Shown below the button" --np-tooltip-position-area="bottom">Below</Button>
	<Button
		title="Shown to the right"
		--np-tooltip-position-area="right"
		--np-tooltip-justify-self="auto"
	>
		Right
	</Button>
</DemoContainer>
<Code
	value={`<Button title="Shown below the button" --np-tooltip-position-area="bottom">
	Below
</Button>`}
/>

<h2 id="touch-devices">
	Touch devices<a href="#touch-devices" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	There is no hover on a touch screen and no reliable way to reveal a tooltip there, so on devices
	that report <code>(hover: none) and (pointer: coarse)</code> the tooltip is not rendered at all. Never
	put information in a tooltip that is not available anywhere else.
</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The tooltip renders <code>role="tooltip"</code> and is tied to its anchor through
	<code>aria-describedby</code>, so a screen reader reads it as a description of the control rather
	than as separate content.
</p>
<p>
	It only opens on <code>:focus-visible</code>, which means it stays out of the way for pointer
	users while still appearing for anyone tabbing through the page. <kbd>Escape</kbd> closes it, and after
	the pointer leaves it waits half a second before hiding, so the tooltip itself can be reached, for instance
	to select the text inside it.
</p>
<Code
	value={`<IconButton aria-describedby="delete-tip">
	<Icon>delete</Icon>
</IconButton>
<Tooltip id="delete-tip">Delete message</Tooltip>`}
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
	</tbody>
</table>
<p>
	<code>--np-tooltip-position-area</code> takes any CSS <code>position-area</code> value, for
	example
	<code>bottom</code>, <code>right</code> or <code>bottom span-right</code>. The colors come from
	the
	<code>inverse-surface</code> and <code>inverse-on-surface</code> roles of the theme.
</p>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	Everything else you pass is forwarded to the tooltip element, so <code>class</code>,
	<code>style</code> and the usual event handlers work as expected. <code>role</code> is set by the component.
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
				>Connects the tooltip to its anchor. The anchor is the element with a matching
				<code>aria-describedby</code>.</td
			>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable. Reflects whether the tooltip is currently shown.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the tooltip element.</td>
		</tr>
	</tbody>
</table>
