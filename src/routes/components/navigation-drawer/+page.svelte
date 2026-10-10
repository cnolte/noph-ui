<script lang="ts">
	import DemoContainer from '../../DemoContainer.svelte'
	import Code from '../../Code.svelte'
	import ModalDrawer from './demos/ModalDrawer.svelte'
	import ModalDrawerSource from './demos/ModalDrawer.svelte?raw'
	import StandardDrawer from './demos/StandardDrawer.svelte'
	import StandardDrawerSource from './demos/StandardDrawer.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Dismissible from './demos/Dismissible.svelte'
	import DismissibleSource from './demos/Dismissible.svelte?raw'
	import Sections from './demos/Sections.svelte'
	import SectionsSource from './demos/Sections.svelte?raw'
</script>

<svelte:head>
	<title>Navigation drawer - Material 3 drawer for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 navigation drawer for Svelte, standard or modal: top level navigation for wide screens with room for labels, groups and counts."
	/>
</svelte:head>

<h1>Navigation drawer</h1>
<p>
	A navigation drawer is the top level navigation for wide screens, with room for labels, groups and
	counts. There are two kinds. Without <code>modal</code> it is a standard drawer: part of the
	layout, always visible next to the content. With <code>modal</code> it is a popover that slides in
	over the page and can be dismissed. Use it on narrow screens. It moves like the modal navigation
	rail: it springs open on <code>--np-motion-expressive-default-spatial</code> and slides back on
	<code>--np-motion-standard-fast-spatial</code>.
</p>
<p>
	The examples below show both. The first is modal and opens from a button, the second is a standard
	drawer with its height capped so it fits on this page.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>

<DemoContainer>
	<ModalDrawer />
</DemoContainer>

<Code value={ModalDrawerSource} />

<DemoContainer>
	<StandardDrawer />
</DemoContainer>
<Code value={StandardDrawerSource} />

<h2 id="opening-a-modal-drawer">
	Opening a modal drawer<a href="#opening-a-modal-drawer" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A modal drawer is a native <code>&lt;dialog&gt;</code>. To open it, set
	<code>command="show-modal"</code> and <code>commandfor</code> on the trigger, as in the example above.
	To open or close it from code, bind the element and call the popover methods on it.
</p>
<Code
	value={`<script lang="ts">
	let drawer = $state<HTMLElement>()
</` +
		`script>

<Button onclick={() => drawer?.show()}>Menu</Button>
<NavigationDrawer bind:element={drawer} modal>
	<NavigationDrawerItem label="Videos" onclick={() => drawer?.close()} />
</NavigationDrawer>`}
/>
<p>
	A scrim dims the page behind the drawer, and a click on it closes the drawer.
	<code>backdrop={false}</code> leaves the page undimmed. Set
	<code>direction="rtl"</code> to make the drawer slide in from the other edge. Use this when it sits
	at the end of the layout. In a right-to-left page it slides in from the right by default.
</p>

<h2 id="dismissible-standard-drawer">
	Dismissible standard drawer<a href="#dismissible-standard-drawer" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h2>
<p>
	A standard drawer is always visible until you set <code>open</code>. Then it can be dismissed:
	<code>open={false}</code> slides it out to the start and gives its width back to the content.
	<code>true</code> brings it back. Toggle it from a menu button that stays visible, as Material 3 asks.
</p>
<DemoContainer>
	<Dismissible />
</DemoContainer>
<Code value={DismissibleSource} />

<h2 id="headline-and-sections">
	Headline and sections<a href="#headline-and-sections" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>headline</code> puts a title above the destinations. It names the navigation unless you pass
	an <code>aria-label</code>. <code>NavigationDrawerSection</code> groups related destinations under a
	divider and a label. A screen reader announces the group by that label.
</p>
<DemoContainer>
	<Sections />
</DemoContainer>
<Code value={SectionsSource} />

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The drawer renders a <code>&lt;nav&gt;</code>, and the selected item gets
	<code>aria-current="page"</code>. Give the <code>&lt;nav&gt;</code> an <code>aria-label</code>
	when the page has more than one navigation landmark.
</p>
<p>
	The items share one tab stop. <kbd>Tab</kbd> moves into and out of the drawer. <kbd>↑</kbd> and
	<kbd>↓</kbd> move between the destinations and wrap at the ends. <kbd>Home</kbd> and
	<kbd>End</kbd> jump to the first and the last one.
</p>
<p>
	While a modal drawer is open, the rest of the page is <code>inert</code>. This keeps the keyboard
	and the screen reader cursor inside the drawer. Focus moves to the first item on open and back to
	the trigger on close. <kbd>Escape</kbd> closes the drawer.
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
			<td><code>0.75rem</code></td>
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
	Use <code>--np-navigation-drawer-height</code> when the drawer does not fill the full viewport
	height, as in the standard example above. The selected item uses
	<code>secondary-container</code> and <code>on-secondary-container</code>, the rest with
	<code>on-surface-variant</code>.
</p>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="navigationdrawer-attributes">
	NavigationDrawer attributes<a href="#navigationdrawer-attributes" aria-hidden="true" tabindex="-1"
		>#</a
	>
</h3>
<p>
	All other attributes go to the root element, including <code>id</code>, <code>class</code>,
	<code>style</code> and <code>ontoggle</code>. The root is the <code>&lt;nav&gt;</code> for a
	standard drawer and the <code>&lt;dialog&gt;</code> for a modal one. <code>aria-label</code> and
	<code>aria-labelledby</code> always go to the <code>&lt;nav&gt;</code>, so they name the
	navigation landmark.
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
			<td><code>true</code></td>
			<td>Dims the page behind a modal drawer. Clicking the scrim closes it.</td>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Bindable. Whether a modal drawer is open. On a standard drawer, left out means always
				visible, and a value makes it dismissible.</td
			>
		</tr>
		<tr>
			<td><code>headline</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>A title above the destinations, naming the navigation unless it has an aria-label.</td>
		</tr>
		<tr>
			<td><code>direction</code></td>
			<td><code>'ltr' | 'rtl' | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Edge the drawer slides in from: <code>ltr</code> from the left, <code>rtl</code> from the right.
				Left out, it follows the writing direction.</td
			>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				Bindable reference to the <code>&lt;nav&gt;</code>. Use it to call
				<code>show()</code> and <code>close()</code>.
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
	All other attributes go to the underlying <code>&lt;button&gt;</code> or
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
			<td><code>badgeLabel</code></td>
			<td><code>string | number | undefined</code></td>
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
			<td>Button type, for items inside a form.</td>
		</tr>
	</tbody>
</table>

<h3 id="navigationdrawersection-attributes">
	NavigationDrawerSection attributes<a
		href="#navigationdrawersection-attributes"
		aria-hidden="true"
		tabindex="-1">#</a
	>
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
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td></td>
			<td>The section label, shown under the divider and naming the group.</td>
		</tr>
	</tbody>
</table>
