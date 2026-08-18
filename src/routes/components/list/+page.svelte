<script lang="ts">
	import Divider from '#lib/divider/Divider.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import List from '#lib/list/List.svelte'
	import ListItem from '#lib/list/ListItem.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
</script>

<svelte:head>
	<title>Lists - Noph UI</title>
</svelte:head>

<h1>Lists</h1>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<List style="max-width:300px">
		<ListItem>Browsers</ListItem>
		<Divider />
		<ListItem>Chrome</ListItem>
		<ListItem>Safari</ListItem>
		<ListItem
			>{#snippet supportingText()}
				Firefox is the spiritual successor of Netscape Navigator.
			{/snippet}Firefox</ListItem
		>
		<ListItem variant="button"
			>{#snippet end()}
				<Icon>open_in_new</Icon>
			{/snippet}
			{#snippet supportingText()}
				This will open a new tab
			{/snippet}Compare benchmarks</ListItem
		>
	</List>
</DemoContainer>
<Code
	value={`<List style="max-width:300px">
	<ListItem>Browsers</ListItem>
	<Divider />
	<ListItem>Chrome</ListItem>
	<ListItem>Safari</ListItem>
	<ListItem>
		Firefox
		{#snippet supportingText()}
			Firefox is the spiritual successor of Netscape Navigator.
		{/snippet}
	</ListItem>
	<ListItem variant="button">
		Compare benchmarks
		{#snippet supportingText()}
			This will open a new tab
		{/snippet}
		{#snippet end()}
			<Icon>open_in_new</Icon>
		{/snippet}
	</ListItem>
</List>`}
/>
<h2 id="icon-item">Icon Item<a href="#icon-item" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<List style="max-width:300px">
		<ListItem>
			Account
			{#snippet start()}
				<Icon>person</Icon>
			{/snippet}
		</ListItem>
		<Divider />
		<ListItem>
			Setting
			{#snippet start()}
				<Icon>settings</Icon>
			{/snippet}
		</ListItem>
		<Divider />
		<ListItem>
			Sign out
			{#snippet start()}
				<Icon>logout</Icon>
			{/snippet}
		</ListItem>
	</List>
</DemoContainer>

<Code
	value={`<List style="max-width:300px">
	<ListItem>
		Account
		{#snippet start()}
			<Icon>person</Icon>
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem>
		Setting
		{#snippet start()}
			<Icon>settings</Icon>
		{/snippet}
	</ListItem>
	<Divider />
	<ListItem>
		Sign out
		{#snippet start()}
			<Icon>logout</Icon>
		{/snippet}
	</ListItem>
</List>`}
/>

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
	<List style="max-width:300px">
		<ListItem
			--np-item-container-height="3rem"
			--np-item-label-text-color="var(--np-color-tertiary)"
			--np-item-leading-icon-color="var(--np-color-tertiary)"
		>
			Account
			{#snippet start()}
				<Icon>person</Icon>
			{/snippet}
		</ListItem>
	</List>
</DemoContainer>
<Code
	value={`<ListItem
	--np-item-container-height="3rem"
	--np-item-label-text-color="var(--np-color-tertiary)"
	--np-item-leading-icon-color="var(--np-color-tertiary)"
>
	Account
	{#snippet start()}
		<Icon>person</Icon>
	{/snippet}
</ListItem>`}
/>

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
