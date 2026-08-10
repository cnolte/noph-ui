<script lang="ts">
	import DemoContainer from '../../DemoContainer.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import NavigationRail from '#lib/navigation-rail/NavigationRail.svelte'
	import NavigationRailItem from '#lib/navigation-rail/NavigationRailItem.svelte'
	let selection = $state(1)
</script>

<svelte:head>
	<title>Navigation Rail - Noph UI</title>
</svelte:head>

<h1>Navigation Rail</h1>
<p>
	A navigation rail is the top level navigation for medium sized screens: a narrow vertical strip of
	destinations that stays visible next to the content. Use it for three to seven destinations. Below
	that a <a href="/components/tabs">tab bar</a> reads better, above it a
	<a href="/components/navigation-drawer">navigation drawer</a> has room for labels and grouping.
</p>
<p>
	Each item needs an <code>icon</code> and a <code>label</code>. Mark the destination the user is on
	with <code>selected</code>, which fills the icon, moves the label to the stronger colour and draws
	the pill behind the icon.
</p>

<h2>Usage</h2>
<DemoContainer>
	<NavigationRail>
		<NavigationRailItem
			selected={selection === 1}
			onclick={() => {
				selection = 1
			}}
			label="Videos"
		>
			{#snippet icon()}<Icon>videocam</Icon>{/snippet}
		</NavigationRailItem>
		<NavigationRailItem
			selected={selection === 2}
			onclick={() => {
				selection = 2
			}}
			label="Styles"
		>
			{#snippet icon()}<Icon>palette</Icon>{/snippet}
		</NavigationRailItem>
		<NavigationRailItem
			selected={selection === 3}
			onclick={() => {
				selection = 3
			}}
			label="Settings"
		>
			{#snippet icon()}<Icon>settings</Icon>{/snippet}
		</NavigationRailItem>
	</NavigationRail>
</DemoContainer>
<Code
	value={`<NavigationRail>
	<NavigationRailItem
		selected={selection === 1}
		onclick={() => {
			selection = 1
		}}
		label="Videos"
	>
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}
	</NavigationRailItem>
	<NavigationRailItem
		selected={selection === 2}
		onclick={() => {
			selection = 2
		}}
		label="Styles"
	>
		{#snippet icon()}<Icon>palette</Icon>{/snippet}
	</NavigationRailItem>
	<NavigationRailItem
		selected={selection === 3}
		onclick={() => {
			selection = 3
		}}
		label="Settings"
	>
		{#snippet icon()}<Icon>settings</Icon>{/snippet}
	</NavigationRailItem>
</NavigationRail>`}
/>

<h2>Links</h2>
<p>
	Pass an <code>href</code> and the item renders as an <code>&lt;a&gt;</code> instead of a
	<code>&lt;button&gt;</code>. That is the right choice for real navigation: it gives the user a URL
	to open in a new tab and it lets the browser do its job.
</p>
<DemoContainer>
	<NavigationRail>
		<NavigationRailItem href="#videos" selected label="Videos">
			{#snippet icon()}<Icon>videocam</Icon>{/snippet}
		</NavigationRailItem>
		<NavigationRailItem href="#styles" label="Styles">
			{#snippet icon()}<Icon>palette</Icon>{/snippet}
		</NavigationRailItem>
	</NavigationRail>
</DemoContainer>
<Code
	value={`<NavigationRail>
	<NavigationRailItem href="/videos" selected={page.url.pathname === '/videos'} label="Videos">
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}
	</NavigationRailItem>
	<NavigationRailItem href="/styles" selected={page.url.pathname === '/styles'} label="Styles">
		{#snippet icon()}<Icon>palette</Icon>{/snippet}
	</NavigationRailItem>
</NavigationRail>`}
/>

<h2>Accessibility</h2>
<p>
	The rail renders a <code>&lt;nav&gt;</code>, and the selected item gets
	<code>aria-current="page"</code>, so assistive technology announces which destination is the
	current one.
</p>
<p>
	The items share a single tab stop. <kbd>Tab</kbd> moves into and out of the rail as a whole, while
	<kbd>↑</kbd> and <kbd>↓</kbd> move between the destinations and wrap around at the ends, and
	<kbd>Home</kbd> and <kbd>End</kbd> jump to the first and the last one. When several rails or
	navigations are on the page, give each <code>&lt;nav&gt;</code> an <code>aria-label</code> so they can
	be told apart.
</p>

<h2>Theming</h2>
<table>
	<thead>
		<tr>
			<th>Token</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-navigation-rail-item-font-weight</code></td>
			<td><code>500</code></td>
		</tr>
		<tr>
			<td><code>--np-navigation-rail-item-selected-font-weight</code></td>
			<td><code>500</code></td>
		</tr>
	</tbody>
</table>
<p>
	The colours follow the theme: <code>surface</code> for the rail,
	<code>on-surface-variant</code> for an idle icon and label, and
	<code>secondary-container</code> with <code>on-secondary-container</code> for the pill behind the
	selected icon. Raise
	<code>--np-navigation-rail-item-selected-font-weight</code> when you want the current destination to
	stand out more than the colour alone does.
</p>
<h3>Example</h3>
<DemoContainer>
	<NavigationRail --np-navigation-rail-item-selected-font-weight="700">
		<NavigationRailItem selected label="Videos">
			{#snippet icon()}<Icon>videocam</Icon>{/snippet}
		</NavigationRailItem>
		<NavigationRailItem label="Styles">
			{#snippet icon()}<Icon>palette</Icon>{/snippet}
		</NavigationRailItem>
	</NavigationRail>
</DemoContainer>
<Code
	value={`<NavigationRail --np-navigation-rail-item-selected-font-weight="700">
	<NavigationRailItem selected label="Videos">
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}
	</NavigationRailItem>
</NavigationRail>`}
/>

<h2>API</h2>
<h3>NavigationRail attributes</h3>
<p>
	<code>NavigationRail</code> takes no attributes of its own. Everything you pass is forwarded to
	the
	<code>&lt;nav&gt;</code> element, so <code>aria-label</code>, <code>class</code> and
	<code>style</code> work as expected.
</p>
<h3>NavigationRailItem attributes</h3>
<p>
	Everything else you pass is forwarded to the underlying <code>&lt;button&gt;</code> or
	<code>&lt;a&gt;</code>, including <code>onclick</code> and <code>href</code>.
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
			<td><code>icon</code></td>
			<td><code>Snippet</code></td>
			<td></td>
			<td>Required. The destination's icon.</td>
		</tr>
		<tr>
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td></td>
			<td>Required. Text below the icon.</td>
		</tr>
		<tr>
			<td><code>selected</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Marks the current destination and sets <code>aria-current="page"</code>.</td>
		</tr>
		<tr>
			<td><code>href</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Renders the item as a link instead of a button.</td>
		</tr>
		<tr>
			<td><code>type</code></td>
			<td><code>'submit' | 'reset' | 'button' | null</code></td>
			<td><code>undefined</code></td>
			<td>Button type, for the cases where the item lives inside a form.</td>
		</tr>
	</tbody>
</table>
