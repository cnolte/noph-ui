<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Actions from './demos/Actions.svelte'
	import ActionsSource from './demos/Actions.svelte?raw'
	import IconItem from './demos/IconItem.svelte'
	import IconItemSource from './demos/IconItem.svelte?raw'
	import LeadingTrailing from './demos/LeadingTrailing.svelte'
	import LeadingTrailingSource from './demos/LeadingTrailing.svelte?raw'
	import Lines from './demos/Lines.svelte'
	import LinesSource from './demos/Lines.svelte?raw'
	import MultiSelect from './demos/MultiSelect.svelte'
	import MultiSelectSource from './demos/MultiSelect.svelte?raw'
	import SingleSelect from './demos/SingleSelect.svelte'
	import SingleSelectSource from './demos/SingleSelect.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Lists - Material 3 list components for Svelte - Noph UI</title>
	<meta
		name="description"
		content="Material 3 lists for Svelte: rows with leading and trailing content, supporting text, and text, button or link items."
	/>
</svelte:head>

<h1>Lists</h1>
<p>
	A list is a set of rows with text and, if needed, an icon, an avatar or a control. Rows can be
	read only, act on the page or navigate. What you pass decides which element is rendered.
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

<h2 id="leading-and-trailing">
	Leading and trailing content<a href="#leading-and-trailing" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>start</code> adds a leading icon. <code>avatar</code> adds a 40px circle: initials as a
	string, or a snippet with an image. <code>end</code> adds a trailing icon, or a short text such as a
	count in a small label style.
</p>
<DemoContainer>
	<LeadingTrailing />
</DemoContainer>
<Code value={LeadingTrailingSource} />

<h2 id="lines">Lines<a href="#lines" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	An item takes one line, or two with <code>supportingText</code>: 56px and 72px high. Supporting
	text long enough to wrap makes it a three-line item of 88px.
</p>
<DemoContainer>
	<Lines />
</DemoContainer>
<Code value={LinesSource} />

<h2 id="actions">Actions<a href="#actions" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	An item with an <code>onclick</code> is a button and acts on the page. An item with an
	<code>href</code> is a link and navigates. The actions of a list share one tab stop.
	<kbd>Tab</kbd> moves to the first one, and the arrow keys move between them.
</p>
<DemoContainer>
	<Actions />
</DemoContainer>
<Code value={ActionsSource} />

<h2 id="single-select">
	Single select<a href="#single-select" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>selection="single"</code> turns the list into a listbox and its items into options, so
	assistive technology announces which one is selected. You manage the selection: set
	<code>selected</code> on the items and change it in their <code>onclick</code>. Show the selection
	with more than color, for example a check.
</p>
<DemoContainer>
	<SingleSelect />
</DemoContainer>
<Code value={SingleSelectSource} />

<h2 id="multi-select">
	Multi select<a href="#multi-select" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>selection="multiple"</code> works the same way, but any number of items can be selected.
</p>
<DemoContainer>
	<MultiSelect />
</DemoContainer>
<Code value={MultiSelectSource} />

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
			<td><code>--np-item-gap</code></td>
			<td><code>1rem</code></td>
		</tr>
		<tr>
			<td><code>--np-item-avatar-container-color</code></td>
			<td><code>--np-color-primary-container</code></td>
		</tr>
		<tr>
			<td><code>--np-item-avatar-label-text-color</code></td>
			<td><code>--np-color-on-primary-container</code></td>
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
	<code>--np-item-container-height</code> sets the minimum height of an item. An item with taller content
	grows past it.
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
	list item for assistive technology. Give an item an <code>href</code> when it navigates, an
	<code>onclick</code> when it acts on the current page, and neither when it is only read. This decides
	the rendered element, its role and whether it can get focus.
</p>
<p>
	The actions of a list share one tab stop. It is on the selected item, or on the first one if
	nothing is selected. <kbd>↓</kbd> and <kbd>→</kbd> move to the next action, <kbd>↑</kbd> and
	<kbd>←</kbd> to the previous one, wrapping at the ends. <kbd>Home</kbd> and <kbd>End</kbd> jump to
	the first and last. <kbd>Space</kbd> and <kbd>Enter</kbd> activate an item, links included.
</p>
<p>
	With <code>selection</code>, the list is a <code>listbox</code> and each item is an
	<code>option</code> with <code>aria-selected</code>. It adds
	<code>aria-multiselectable</code> for <code>multiple</code>. Give the list an
	<code>aria-label</code> that says what is being chosen.
</p>
<p>
	A disabled item renders as a <code>&lt;div&gt;</code> with <code>aria-disabled</code> instead of a disabled
	control. Screen readers can still read it, but it is not in the tab order.
</p>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="list-attributes">
	List attributes<a href="#list-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	All other attributes go to the <code>&lt;ul&gt;</code> element, including <code>class</code>,
	<code>style</code> and event handlers.
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
		<tr>
			<td><code>selection</code></td>
			<td><code>'single' | 'multiple' | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				Makes the list a listbox of options that announce their <code>selected</code> state.
			</td>
		</tr>
	</tbody>
</table>
<h3 id="item">Item<a href="#item" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	<code>ListItem</code> is an <code>Item</code> wrapped in an <code>&lt;li&gt;</code>. When a row is
	not in a <code>&lt;ul&gt;</code>, for example in search results, a sheet or a card, use
	<code>Item</code> instead. It takes the same attributes as <code>ListItem</code> below.
</p>
<p>
	The item picks its element from what you pass: an <code>href</code> makes it an
	<code>&lt;a&gt;</code>. An <code>onclick</code>, a <code>command</code> or a
	<code>popovertarget</code> makes it a <code>&lt;button&gt;</code>. Without any of them it is a
	<code>&lt;div&gt;</code>. Links and buttons have a ripple. Set <code>type</code> to choose the
	element yourself, for example <code>type="text"</code> for a row where only the controls inside it react
	to clicks.
</p>
<!-- eslint-disable no-useless-escape -- the escape keeps the closing script tag from ending the surrounding block -->
<Code
	value={`<script lang="ts">
	import { Item } from '#lib/index.js'
<\/script>

<Item href="/components/list">Lists</Item>`}
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
			<td><code>'text' | 'button' | 'link' | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Deprecated, use <code>type</code>. Still pins the element: a <code>&lt;div&gt;</code>, a
				<code>&lt;button&gt;</code> or an <code>&lt;a&gt;</code>.</td
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
				>Renders the item as non-interactive with <code>aria-disabled</code>, even with an
				<code>href</code> or <code>onclick</code>.</td
			>
		</tr>
		<tr>
			<td><code>supportingText</code></td>
			<td><code>string | Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				Second line below the label. Pass a snippet to render your own markup. An item with
				supporting text is taller.
			</td>
		</tr>
		<tr>
			<td><code>start</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading content, usually an icon or an avatar.</td>
		</tr>
		<tr>
			<td><code>avatar</code></td>
			<td><code>string | Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>A 40px round avatar in place of <code>start</code>: initials, or an image in a snippet.</td
			>
		</tr>
		<tr>
			<td><code>end</code></td>
			<td><code>string | Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Trailing content, usually an icon, a switch or a checkbox. Pass a string for short trailing
				text such as a count.</td
			>
		</tr>
		<tr>
			<td><code>softFocus</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td
				>Shows the hover state without hover. Use it to mark the active option in a list controlled
				by the arrow keys.</td
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
			<td><code>'text' | 'link' | 'button' | 'submit' | 'reset' | null</code></td>
			<td><code>undefined</code></td>
			<td
				>Pins the element, like on <code>Card</code>. <code>text</code> renders a
				<code>&lt;div&gt;</code>, <code>link</code> an <code>&lt;a&gt;</code>, and the native button
				types a <code>&lt;button&gt;</code> of that type. Use <code>submit</code> to have the item submit
				the surrounding form.</td
			>
		</tr>
	</tbody>
</table>
