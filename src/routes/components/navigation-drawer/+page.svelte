<script lang="ts">
	import DemoContainer from '../../DemoContainer.svelte'
	import Icon from '#lib/icons/Icon.svelte'
	import Code from '../../Code.svelte'
	import NavigationDrawer from '#lib/navigation-drawer/NavigationDrawer.svelte'
	import NavigationDrawerItem from '#lib/navigation-drawer/NavigationDrawerItem.svelte'
	import Button from '#lib/button/Button.svelte'
	let selection = $state(1)
</script>

<svelte:head>
	<title>Navigation drawer - Noph UI</title>
</svelte:head>

<h1>Navigation drawer</h1>
<p>
	A navigation drawer is the top level navigation for wide screens, with room for labels, groups and
	counts. It comes in two shapes. Without <code>modal</code> it is a standard drawer: part of the
	layout, always visible next to the content. With <code>modal</code> it becomes a popover that slides
	in over the page and is dismissed again, which is what you want on a narrow screen.
</p>
<p>
	The examples below show both. The first is modal and opens from a button, the second is a standard
	drawer with its height capped so it fits on this page.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>

<DemoContainer>
	<Button popovertarget="demo-drawer">Open nav</Button>
	<NavigationDrawer id="demo-drawer" modal backdrop>
		<NavigationDrawerItem
			selected={selection === 1}
			onclick={() => {
				selection = 1
			}}
			label="Videos"
			badgeLabelText="+100"
		>
			{#snippet icon()}<Icon>videocam</Icon>{/snippet}
		</NavigationDrawerItem>
		<NavigationDrawerItem
			selected={selection === 2}
			onclick={() => {
				selection = 2
			}}
			label="Styles"
		>
			{#snippet icon()}<Icon>palette</Icon>{/snippet}
		</NavigationDrawerItem>
		<NavigationDrawerItem
			selected={selection === 3}
			onclick={() => {
				selection = 3
			}}
			label="Settings"
		>
			{#snippet icon()}<Icon>settings</Icon>{/snippet}
		</NavigationDrawerItem>
	</NavigationDrawer>
</DemoContainer>

<Code
	value={`<Button popovertarget="demo-drawer">Open nav</Button>
<NavigationDrawer id="demo-drawer" modal backdrop>
	<NavigationDrawerItem
		selected={selection === 1}
		onclick={() => {
			selection = 1
		}}
		label="Videos"
		badgeLabelText="+100"
	>
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}
	</NavigationDrawerItem>
	<NavigationDrawerItem
		selected={selection === 2}
		onclick={() => {
			selection = 2
		}}
		label="Styles"
	>
		{#snippet icon()}<Icon>palette</Icon>{/snippet}
	</NavigationDrawerItem>
	<NavigationDrawerItem
		selected={selection === 3}
		onclick={() => {
			selection = 3
		}}
		label="Settings"
	>
		{#snippet icon()}<Icon>settings</Icon>{/snippet}
	</NavigationDrawerItem>
</NavigationDrawer>`}
/>

<DemoContainer>
	<NavigationDrawer --np-navigation-drawer-height="200px">
		<NavigationDrawerItem
			selected={selection === 1}
			onclick={() => {
				selection = 1
			}}
			label="Videos"
			badgeLabelText="+100"
		>
			{#snippet icon()}<Icon>videocam</Icon>{/snippet}
		</NavigationDrawerItem>
		<NavigationDrawerItem
			selected={selection === 2}
			onclick={() => {
				selection = 2
			}}
			label="Styles"
		>
			{#snippet icon()}<Icon>palette</Icon>{/snippet}
		</NavigationDrawerItem>
		<NavigationDrawerItem
			selected={selection === 3}
			onclick={() => {
				selection = 3
			}}
			label="Settings"
		>
			{#snippet icon()}<Icon>settings</Icon>{/snippet}
		</NavigationDrawerItem>
	</NavigationDrawer>
</DemoContainer>
<Code
	value={`<NavigationDrawer --np-navigation-drawer-height="200px">
  <NavigationDrawerItem
    selected={selection === 1}
    onclick={() => {
      selection = 1
    }}
    label="Videos"
    badgeLabelText="+100"
  >
    {#snippet icon()}<Icon>videocam</Icon>{/snippet}
  </NavigationDrawerItem>
  <NavigationDrawerItem
    selected={selection === 2}
    onclick={() => {
      selection = 2
    }}
    label="Styles"
  >
    {#snippet icon()}<Icon>palette</Icon>{/snippet}
  </NavigationDrawerItem>
  <NavigationDrawerItem
    selected={selection === 3}
    onclick={() => {
      selection = 3
    }}
    label="Settings"
  >
    {#snippet icon()}<Icon>settings</Icon>{/snippet}
  </NavigationDrawerItem>
</NavigationDrawer>`}
/>

<h2 id="opening-a-modal-drawer">
	Opening a modal drawer<a href="#opening-a-modal-drawer" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A modal drawer is a native popover. The simplest way to open it is <code>popovertarget</code> on the
	trigger, as in the example above. When you need to open or close it from code, bind the element and
	call the popover methods on it.
</p>
<Code
	value={`<script lang="ts">
	let drawer = $state<HTMLElement>()
</` +
		`script>

<Button onclick={() => drawer?.showPopover()}>Menu</Button>
<NavigationDrawer bind:element={drawer} modal backdrop>
	<NavigationDrawerItem label="Videos" onclick={() => drawer?.hidePopover()} />
</NavigationDrawer>`}
/>
<p>
	Pass <code>backdrop</code> to dim the page behind the drawer and let a click outside close it. Set
	<code>direction="rtl"</code> to have the drawer slide in from the other edge, which is what you want
	when it sits at the end of the layout or in a right-to-left context.
</p>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The drawer renders a <code>&lt;nav&gt;</code>, and the selected item gets
	<code>aria-current="page"</code>. Give the <code>&lt;nav&gt;</code> an <code>aria-label</code>
	when the page has more than one navigation landmark.
</p>
<p>
	The items share a single tab stop. <kbd>Tab</kbd> moves into and out of the drawer as a whole,
	<kbd>↑</kbd> and <kbd>↓</kbd> move between the destinations and wrap around at the ends, and
	<kbd>Home</kbd> and <kbd>End</kbd> jump to the first and the last one.
</p>
<p>
	While a modal drawer is open the rest of the page is marked <code>inert</code>, so neither the
	keyboard nor the screen reader cursor can leave it. Focus moves to the first item on open and back
	to the trigger on close, and <kbd>Escape</kbd> closes the drawer.
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
			<td><code>--np-navigation-drawer-background</code></td>
			<td><code>--np-color-surface-container-low</code></td>
		</tr>
		<tr>
			<td><code>--np-navigation-drawer-width</code></td>
			<td><code>22.5rem</code></td>
		</tr>
		<tr>
			<td><code>--np-navigation-drawer-height</code></td>
			<td><code>100dvh</code></td>
		</tr>
		<tr>
			<td><code>--np-navigation-drawer-padding</code></td>
			<td><code>1.25rem 0.75rem</code></td>
		</tr>
		<tr>
			<td><code>--np-navigation-drawer-item-container-shape</code></td>
			<td><code>--np-shape-corner-full</code></td>
		</tr>
		<tr>
			<td><code>--np-navigation-drawer-item-font-size</code></td>
			<td><code>0.875rem</code></td>
		</tr>
		<tr>
			<td><code>--np-navigation-drawer-item-font-weight</code></td>
			<td><code>500</code></td>
		</tr>
		<tr>
			<td><code>--np-navigation-drawer-item-selected-font-weight</code></td>
			<td><code>500</code></td>
		</tr>
	</tbody>
</table>
<p>
	<code>--np-navigation-drawer-height</code> is the one to reach for when the drawer does not own
	the full viewport, as in the standard example above. The selected item is drawn with
	<code>secondary-container</code> and <code>on-secondary-container</code>, the rest with
	<code>on-surface-variant</code>.
</p>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<NavigationDrawer
		--np-navigation-drawer-height="200px"
		--np-navigation-drawer-width="16rem"
		--np-navigation-drawer-background="var(--np-color-surface-container-highest)"
		--np-navigation-drawer-item-container-shape="0.5rem"
	>
		<NavigationDrawerItem selected label="Videos">
			{#snippet icon()}<Icon>videocam</Icon>{/snippet}
		</NavigationDrawerItem>
		<NavigationDrawerItem label="Styles">
			{#snippet icon()}<Icon>palette</Icon>{/snippet}
		</NavigationDrawerItem>
	</NavigationDrawer>
</DemoContainer>
<Code
	value={`<NavigationDrawer
	--np-navigation-drawer-width="16rem"
	--np-navigation-drawer-background="var(--np-color-surface-container-highest)"
	--np-navigation-drawer-item-container-shape="0.5rem"
>
	<NavigationDrawerItem selected label="Videos">
		{#snippet icon()}<Icon>videocam</Icon>{/snippet}
	</NavigationDrawerItem>
</NavigationDrawer>`}
/>

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="navigationdrawer-attributes">
	NavigationDrawer attributes<a href="#navigationdrawer-attributes" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
<p>
	Everything else you pass is forwarded to the <code>&lt;nav&gt;</code> element, so
	<code>id</code>, <code>aria-label</code>, <code>class</code>, <code>style</code> and
	<code>ontoggle</code> work as expected.
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
			<td><code>modal</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Turns the drawer into a popover that slides in over the page and traps focus.</td>
		</tr>
		<tr>
			<td><code>backdrop</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Dims the page behind a modal drawer. Clicking the scrim closes it.</td>
		</tr>
		<tr>
			<td><code>direction</code></td>
			<td><code>'ltr' | 'rtl'</code></td>
			<td><code>'ltr'</code></td>
			<td>Edge the drawer slides in from.</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				Bindable reference to the <code>&lt;nav&gt;</code>. Use it to call
				<code>showPopover()</code> and <code>hidePopover()</code>.
			</td>
		</tr>
	</tbody>
</table>
<h3 id="navigationdraweritem-attributes">
	NavigationDrawerItem attributes<a
		href="#navigationdraweritem-attributes"
		aria-hidden="true"
		tabindex="-1">#</a
	>
</h3>
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
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td></td>
			<td>Required. Text of the destination.</td>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading icon. It is filled while the item is selected.</td>
		</tr>
		<tr>
			<td><code>selected</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Marks the current destination and sets <code>aria-current="page"</code>.</td>
		</tr>
		<tr>
			<td><code>badgeLabelText</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Trailing text, for a count such as <code>"+100"</code>.</td>
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
