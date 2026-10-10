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
	is a native popover in the top layer, so a scroll container or an <code>overflow: hidden</code>
	ancestor does not clip it. The browser closes it on a click outside or on <kbd>Escape</kbd>.
</p>
<p>
	<code>command="toggle-popover"</code> and <code>commandfor</code> on the trigger open the menu
	without script. CSS anchor positioning places it: give the trigger an <code>anchor-name</code> and
	point the menu at it with <code>position-anchor</code>. Pass the same element as the
	<code>anchor</code> prop so the menu can size itself to the space left on screen.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<MenuUsage />
</DemoContainer>
<Code value={MenuUsageSource} />

<h2 id="methods">Methods<a href="#methods" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	When a trigger cannot have <code>commandfor</code>, open and close the menu with methods. Bind a
	reference with <code>bind:this</code> and type it with
	<code>ReturnType&lt;typeof Menu&gt;</code>. It is <code>undefined</code> until the component has
	mounted, so call through <code>?.</code>. Prefer the attributes when you can.
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
	renders as a link instead of a button. A <code>Divider</code> between items gets its spacing from the
	menu.
</p>
<p>
	For a choice, set <code>role="menuitemradio"</code> when one of several options is on, or
	<code>role="menuitemcheckbox"</code>
	when each option toggles on its own. Both announce <code>selected</code> as checked.
</p>
<Code
	value={`<Menu anchor={sortBtn} id="sort-menu">
	{#each ['Name', 'Date', 'Size'] as option (option)}
		<MenuItem
			role="menuitemradio"
			selected={sort === option}
			command="hide-popover"
			commandfor="sort-menu"
			onclick={() => (sort = option)}
		>
			{option}
		</MenuItem>
	{/each}
</Menu>`}
/>
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
	A menu opens on the side of the anchor you set, below it by default. When that side is too small,
	it flips to the opposite side. When it would run off the edge of the window, it slides along the
	inline axis. When neither side has room, the menu takes the full height of the window and sits
	over the anchor. A menu taller than the window stays on the side with more room and scrolls.
</p>
<p>
	The menu measures the room against the <code>anchor</code> prop. Without it the menu still opens, but
	at the height of its content.
</p>
<p>
	Set <code>coverAnchor</code> to <code>false</code> when the anchor has to stay visible. The menu
	then stays on the side with more room and scrolls there. <code>AutoComplete</code> does this, so the
	list does not hide what you are typing.
</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The container renders <code>role="menu"</code> and every item <code>role="menuitem"</code>, or the
	radio or checkbox role you give it. Opening the menu moves focus to the first item. The items
	share one tab stop. <kbd>Tab</kbd> moves into and out of the menu.
	<kbd>↑</kbd> and <kbd>↓</kbd> move between the items and wrap around at the ends.
	<kbd>Home</kbd> and <kbd>End</kbd> jump to the first and the last item. Typing a letter jumps to
	the next item that starts with it. <kbd>Enter</kbd> and <kbd>Space</kbd> pick the focused item, links
	included. Disabled items still take focus, so screen readers read them, but they cannot be picked.
</p>
<p>
	<kbd>Escape</kbd> closes the menu and focus returns to the trigger. Give the trigger an accessible name
	that says what the menu is for, not only “Open menu”.
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
		<tr>
			<td><code>--np-menu-min-width</code></td>
			<td><code>7rem</code></td>
		</tr>
		<tr>
			<td><code>--np-menu-max-width</code></td>
			<td><code>17.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-menu-item-container-height</code></td>
			<td><code>3rem</code></td>
		</tr>
		<tr>
			<td><code>--np-menu-item-padding-inline</code></td>
			<td><code>0.75rem</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-menu-position-area</code> takes any CSS <code>position-area</code> value and sets which
	side of the anchor the menu opens on. When that side is too small, the menu still moves as
	<a class="link" href="#placement">Placement</a> describes.
	<code>--np-menu-over-anchor-position-area</code> is the area for the last fallback, when the menu
	spans the full height over the anchor. Keep <code>span-all</code> in the block axis and repeat the
	inline half of <code>--np-menu-position-area</code>, so the menu keeps the same alignment. Style
	the items with the
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
	Other attributes, such as <code>id</code>, <code>class</code>, <code>style</code> and event handlers,
	go to the menu element.
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
				>The element the menu belongs to. The menu measures the room on screen against it to set its
				height and where it moves when a side is too small.</td
			>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Bindable. Whether the menu is open.</td>
		</tr>
		<tr>
			<td><code>coverAnchor</code></td>
			<td><code>boolean</code></td>
			<td><code>true</code></td>
			<td
				>Whether the menu may sit over its anchor when neither side of it is tall enough. With
				<code>false</code> the menu stays on the side with more room and scrolls there.</td
			>
		</tr>
		<tr>
			<td><code>popover</code></td>
			<td><code>'auto' | 'manual' | null</code></td>
			<td><code>'auto'</code></td>
			<td
				>Popover behaviour. <code>auto</code> closes on an outside click and on
				<kbd>Escape</kbd>. Use <code>manual</code> to control closing yourself.</td
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
