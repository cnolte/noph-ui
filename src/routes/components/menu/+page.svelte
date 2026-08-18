<script lang="ts">
	import Button from '#lib/button/Button.svelte'
	import Menu from '#lib/menu/Menu.svelte'
	import MenuItem from '#lib/menu/MenuItem.svelte'
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	let menuBtn: HTMLElement | undefined = $state()
</script>

<svelte:head>
	<title>Menus - Noph UI</title>
</svelte:head>

<h1>Menus</h1>
<p>
	A menu shows a list of choices on a temporary surface, anchored to the control that opened it. It
	is a native popover, so it lives in the top layer and is not clipped by a scroll container or an
	<code>overflow: hidden</code> ancestor, and the browser closes it when you click outside or press
	<kbd>Escape</kbd>.
</p>
<p>
	Two things connect a menu to its anchor. <code>popovertarget</code> on the trigger opens it, and
	CSS anchor positioning places it: give the trigger an <code>anchor-name</code> and point the menu
	at it with <code>position-anchor</code>. Pass the same element as the <code>anchor</code> prop so the
	menu can size itself to the space that is actually left on screen.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Button style="anchor-name:--city-menu" popovertarget="browser-menu" bind:element={menuBtn}>
		Open Menu
	</Button>
	<Menu anchor={menuBtn} id="browser-menu" style="position-anchor:--city-menu;max-width: 300px">
		<MenuItem>New York</MenuItem>
		<MenuItem>Los Angeles</MenuItem>
		<MenuItem>Berlin</MenuItem>
		<MenuItem>London</MenuItem>
	</Menu>
</DemoContainer>
<Code
	value={`<script lang="ts">
	let menuBtn = $state<HTMLElement>()
</` +
		`script>
<Button style="anchor-name:--city-menu" popovertarget="browser-menu" bind:element={menuBtn}>
	Open Menu
</Button>
<Menu anchor={menuBtn} id="browser-menu" style="position-anchor:--city-menu;max-width: 300px">
	<MenuItem>New York</MenuItem>
	<MenuItem>Los Angeles</MenuItem>
	<MenuItem>Berlin</MenuItem>
	<MenuItem>London</MenuItem>
</Menu>`}
/>

<h2 id="methods">Methods<a href="#methods" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Besides the native <code>popovertarget</code> attribute, you can open and close the menu
	imperatively. Bind a reference with <code>bind:this</code> and type it with
	<code>ReturnType&lt;typeof Menu&gt;</code>; it is <code>undefined</code> until the component has
	mounted, so call through <code>?.</code>.
</p>
<Code
	value={`<script lang="ts">
	let menu: ReturnType<typeof Menu> | undefined = $state()
</` +
		`script>

<Menu bind:this={menu} anchor={menuBtn}>
	<MenuItem>New York</MenuItem>
</Menu>
<Button onclick={() => menu?.showPopover()}>Open Menu</Button>`}
/>
<table>
	<thead>
		<tr>
			<th>Method</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>showPopover</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Opens the menu.</td>
		</tr>
		<tr>
			<td><code>hidePopover</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Closes the menu.</td>
		</tr>
	</tbody>
</table>

<h2 id="items">Items<a href="#items" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>MenuItem</code> is a list item with <code>role="menuitem"</code>. It takes the same
	<code>start</code>, <code>end</code>, <code>supportingText</code>, <code>selected</code> and
	<code>disabled</code> attributes as <code>ListItem</code>. Pass an <code>href</code> and the item
	renders as a link instead of a button. A <code>Divider</code> between items gets its spacing automatically.
</p>
<Code
	value={`<Menu anchor={menuBtn} id="account-menu">
	<MenuItem>
		Profile
		{#snippet start()}<Icon>person</Icon>{/snippet}
	</MenuItem>
	<MenuItem href="/settings">Settings</MenuItem>
	<Divider />
	<MenuItem disabled>Sign out</MenuItem>
</Menu>`}
/>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The container renders <code>role="menu"</code> and every item <code>role="menuitem"</code>. The
	items share a single tab stop: <kbd>Tab</kbd> moves into and out of the menu as a whole, while
	<kbd>↑</kbd> and <kbd>↓</kbd> move between the items and wrap around at the ends.
	<kbd>Home</kbd> and <kbd>End</kbd> jump to the first and the last item. Disabled items are skipped.
</p>
<p>
	Because the menu is a popover, <kbd>Escape</kbd> closes it and focus returns to the trigger without
	any code of your own. Give the trigger an accessible name that says what the menu is for, not just “Open
	menu”.
</p>

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
			<td><code>--np-menu-container-color</code></td>
			<td><code>--np-color-surface-container</code></td>
		</tr>
		<tr>
			<td><code>--np-menu-text-color</code></td>
			<td><code>--np-color-on-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-menu-container-shape</code></td>
			<td><code>--np-shape-corner-extra-small</code></td>
		</tr>
		<tr>
			<td><code>--np-menu-margin</code></td>
			<td><code>2px</code></td>
		</tr>
		<tr>
			<td><code>--np-menu-position-area</code></td>
			<td><code>bottom</code></td>
		</tr>
		<tr>
			<td><code>--np-menu-justify-self</code></td>
			<td><code>anchor-center</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-menu-position-area</code> takes any CSS <code>position-area</code> value and decides
	which side of the anchor the menu opens on. Whatever you pick, the menu flips to the opposite side
	when it would not fit. The items themselves are styled through the
	<a href="/components/list">list tokens</a>.
</p>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<Code
	value={`<Menu
	anchor={menuBtn}
	id="themed-menu"
	--np-menu-container-color="var(--np-color-surface-container-highest)"
	--np-menu-container-shape="1rem"
	--np-menu-position-area="top"
>
	<MenuItem>New York</MenuItem>
</Menu>`}
/>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="menu-attributes">
	Menu attributes<a href="#menu-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Everything else you pass is forwarded to the menu element, so <code>id</code>, <code>class</code>,
	<code>style</code> and the usual event handlers work as expected.
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
			<td><code>anchor</code></td>
			<td><code>HTMLElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>The element the menu belongs to. It is used to cap the menu's height to the free space
				above or below it, and to position the menu in browsers without CSS anchor positioning.</td
			>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable. Reflects whether the menu is currently open.</td>
		</tr>
		<tr>
			<td><code>popover</code></td>
			<td><code>'auto' | 'manual' | null</code></td>
			<td><code>'auto'</code></td>
			<td
				>Popover behaviour. <code>auto</code> closes on an outside click and on
				<kbd>Escape</kbd>; use <code>manual</code> when you want to control that yourself.</td
			>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLDivElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable reference to the menu element.</td>
		</tr>
	</tbody>
</table>
<h3 id="menuitem-attributes">
	MenuItem attributes<a href="#menuitem-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	<code>MenuItem</code> accepts the <a href="/components/list">ListItem</a> attributes apart from
	<code>variant</code> and <code>softFocus</code>, which the menu sets itself.
</p>
