<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import MenuUsage from './demos/MenuUsage.svelte'
	import MenuUsageSource from './demos/MenuUsage.svelte?raw'
</script>

<svelte:head>
	<title>Menus - Material 3 menu component for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 menu for Svelte, built on the Popover API: choices on a temporary surface anchored to the control that opened it, never clipped, with keyboard support."
	/>
</svelte:head>

<h1>Menus</h1>
<p>
	A menu shows a list of choices on a temporary surface, anchored to the control that opened it. It
	is a native popover, so it lives in the top layer and is not clipped by a scroll container or an
	<code>overflow: hidden</code> ancestor, and the browser closes it when you click outside or press
	<kbd>Escape</kbd>.
</p>
<p>
	Two things connect a menu to its anchor. <code>command="toggle-popover"</code> and
	<code>commandfor</code> on the trigger open it, with no script involved, and CSS anchor
	positioning places it: give the trigger an <code>anchor-name</code> and point the menu at it with
	<code>position-anchor</code>. Pass the same element as the <code>anchor</code> prop so the menu can
	size itself to the space that is actually left on screen.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<MenuUsage />
</DemoContainer>
<Code value={MenuUsageSource} />

<h2 id="methods">Methods<a href="#methods" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Where a trigger cannot carry <code>commandfor</code>, open and close the menu imperatively
	instead. Bind a reference with <code>bind:this</code> and type it with
	<code>ReturnType&lt;typeof Menu&gt;</code>; it is <code>undefined</code> until the component has
	mounted, so call through <code>?.</code>. Prefer the attributes where you have the choice, and
	leave <code>bind:open</code> to report the state rather than to set it.
</p>
<Code
	value={`<script lang="ts">
	let menu: ReturnType<typeof Menu> | undefined = $state()
</` +
		`script>

<Menu bind:this={menu} anchor={menuBtn}>
	<MenuItem>New York</MenuItem>
</Menu>
<Button onclick={() => menu?.show()}>Open menu</Button>`}
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
			<td><code>show</code></td>
			<td><code>() =&gt; void</code></td>
			<td>Opens the menu.</td>
		</tr>
		<tr>
			<td><code>close</code></td>
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

<h2 id="placement">Placement<a href="#placement" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A menu opens on the side of the anchor you asked for, below it by default, and moves out of the
	way on its own when that side is too small: it flips to the opposite side when the menu would not
	fit, and slides along the inline axis when it would run off the edge of the window. When neither
	side has room, the menu takes the full height of the window and sits over the anchor instead of
	squeezing into whichever gap is bigger. Only a menu taller than the window stays on the roomier
	side and scrolls, since covering the anchor would not help there.
</p>
<p>
	The <code>anchor</code> prop is what makes this work: it is the element the menu measures the room against.
	Without it the menu still opens, but at whatever height its content asks for.
</p>
<p>
	Set <code>coverAnchor</code> to <code>false</code> where the anchor has to stay in sight, and the
	menu skips that last step: it keeps to the roomier side and scrolls there instead.
	<code>AutoComplete</code> does this, because a list over the field would hide what you are typing.
</p>

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
		<tr>
			<td><code>--np-menu-over-anchor-position-area</code></td>
			<td><code>span-all</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-menu-position-area</code> takes any CSS <code>position-area</code> value and decides
	which side of the anchor the menu opens on. Whatever you pick, the menu still moves as
	<a class="link" href="#placement">Placement</a> describes when that side is too small.
	<code>--np-menu-over-anchor-position-area</code> is the area used for that last fallback, when the
	menu spans the full height over the anchor. Keep <code>span-all</code> in the block axis and
	repeat the inline half of <code>--np-menu-position-area</code>, so the menu stays lined up the
	same way. The items themselves are styled through the
	<a class="link" href="/components/list">list tokens</a>.
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
				>The element the menu belongs to. Room on screen is measured against it, which decides how
				tall the menu may be and which way it moves when a side is too small.</td
			>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable. Reflects whether the menu is currently open.</td>
		</tr>
		<tr>
			<td><code>coverAnchor</code></td>
			<td><code>boolean</code></td>
			<td><code>true</code></td>
			<td
				>Whether the menu may sit over its anchor when neither side of it is tall enough. With
				<code>false</code> the menu stays on the roomier side and scrolls there.</td
			>
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
	<code>MenuItem</code> accepts the <a class="link" href="/components/list">ListItem</a> attributes
	apart from
	<code>variant</code> and <code>softFocus</code>, which the menu sets itself.
</p>
