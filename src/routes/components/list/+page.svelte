<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import IconItem from './demos/IconItem.svelte'
	import IconItemSource from './demos/IconItem.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Lists - Material 3 list components for Svelte - Noph UI</title>
	<meta
		name="description"
		content="Material 3 lists for Svelte: rows with leading and trailing content, supporting text, and a choice of text, button or link so the right element ends up in the DOM."
	/>
</svelte:head>

<h1>Lists</h1>
<p>
	A list is a run of rows with text and, where they earn it, an icon, an avatar or a control. Rows
	can be read only, act on the page or navigate, and the variant you pick decides which element ends
	up in the DOM.
</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />
<h2 id="icon-item">Icon item<a href="#icon-item" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<IconItem />
</DemoContainer>

<Code value={IconItemSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="tokens">Tokens<a href="#tokens" aria-hidden="true" tabindex="-1">#</a></h3>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-item-container-height</code></td>
			<td><code>3.5rem</code>, or <code>4.5rem</code> with supporting text</td>
		</tr>
		<tr>
			<td><code>--np-item-label-text-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-item-supporting-text-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-item-leading-icon-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
		<tr>
			<td><code>--np-item-trailing-icon-color</code></td>
			<td><code>--np-color-on-surface-variant</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-item-container-height</code> sets the minimum height of an item, so an item whose content
	is taller grows past it.
</p>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>List</code> renders a plain <code>&lt;ul&gt;</code>, so anything you put inside becomes a
	list item for assistive technology. Pick the <code>variant</code> that matches what the item does:
	<code>text</code> for content that is only read, <code>button</code> for something that acts on
	the current page, and <code>link</code> for navigation. That choice decides the element that ends up
	in the DOM, and with it the role, the keyboard behaviour and whether the item is focusable at all.
</p>
<p>
	A disabled item renders as a <code>&lt;div&gt;</code> with <code>aria-disabled</code> instead of a disabled
	control, which keeps it readable but takes it out of the tab order.
</p>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="list-attributes">
	List attributes<a href="#list-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Everything else you pass is forwarded to the <code>&lt;ul&gt;</code> element, so
	<code>class</code>, <code>style</code> and the usual event handlers work as expected.
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
			<td><code>element</code></td>
			<td><code>HTMLUListElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the underlying <code>&lt;ul&gt;</code>.</td>
		</tr>
	</tbody>
</table>
<h3 id="item">Item<a href="#item" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	<code>ListItem</code> is an <code>Item</code> wrapped in an <code>&lt;li&gt;</code>. Where a row
	is not part of a <code>&lt;ul&gt;</code>, in search results, a sheet or a card, import
	<code>Item</code> instead and skip the wrapper. It takes the same attributes as
	<code>ListItem</code> below.
</p>
<!-- eslint-disable no-useless-escape -- the escape keeps the closing script tag from ending the surrounding block -->
<Code
	value={`<script lang="ts">
	import { Item } from '#lib/index.js'
<\/script>

<Item variant="link" href="/components/list">Lists</Item>`}
/>

<h3 id="listitem-attributes">
	ListItem attributes<a href="#listitem-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
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
			<td><code>'text' | 'button' | 'link'</code></td>
			<td><code>'text'</code></td>
			<td
				>Element the item renders as: a <code>&lt;div&gt;</code>, a <code>&lt;button&gt;</code> or
				an
				<code>&lt;a&gt;</code>. The interactive variants add a ripple.</td
			>
		</tr>
		<tr>
			<td><code>selected</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Whether the item is shown as selected.</td>
		</tr>
		<tr>
			<td><code>disabled</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td
				>Renders the item as non-interactive with <code>aria-disabled</code>, whatever the
				<code>variant</code> is.</td
			>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Second line below the label. An item with supporting text is taller.</td>
		</tr>
		<tr>
			<td><code>start</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading content, typically an icon or an avatar.</td>
		</tr>
		<tr>
			<td><code>end</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Trailing content, typically an icon, a switch or a checkbox.</td>
		</tr>
		<tr>
			<td><code>softFocus</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td
				>Shows the hover state without the item being hovered. Use it to mark the active option in a
				list that is driven by the arrow keys.</td
			>
		</tr>
		<tr>
			<td><code>lazy</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Skips rendering the item while it is off screen, for very long lists.</td>
		</tr>
		<tr>
			<td><code>type</code></td>
			<td><code>'submit' | 'reset' | 'button' | null</code></td>
			<td><code>'button'</code></td>
			<td
				>Only for <code>variant="button"</code>. Set it to <code>submit</code> to have the item submit
				the surrounding form.</td
			>
		</tr>
	</tbody>
</table>
