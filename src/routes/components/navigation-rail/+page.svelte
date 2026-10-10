<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Expanded from './demos/Expanded.svelte'
	import ExpandedSource from './demos/Expanded.svelte?raw'
	import HideWhenCollapsed from './demos/HideWhenCollapsed.svelte'
	import HideWhenCollapsedSource from './demos/HideWhenCollapsed.svelte?raw'
	import Modal from './demos/Modal.svelte'
	import ModalSource from './demos/Modal.svelte?raw'
	import Links from './demos/Links.svelte'
	import LinksSource from './demos/Links.svelte?raw'
	import ThemingExample from './demos/ThemingExample.svelte'
	import ThemingExampleSource from './demos/ThemingExample.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
	import Sections from './demos/Sections.svelte'
	import SectionsSource from './demos/Sections.svelte?raw'
</script>

<svelte:head>
	<title>Navigation rail - Material 3 side nav for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 navigation rail for Svelte: a narrow vertical strip of destinations that stays beside the content on medium sized screens."
	/>
</svelte:head>

<h1>Navigation rail</h1>
<p>
	A navigation rail is the top level navigation for medium sized screens. It is a narrow vertical
	strip of destinations that stays visible next to the content. Use it for three to seven
	destinations. For fewer, use a <a class="link" href="/components/tabs">tab bar</a>. The expanded
	rail replaces the <a class="link" href="/components/navigation-drawer">navigation drawer</a>,
	which Material 3 no longer recommends.
</p>
<p>
	Each item needs an <code>icon</code> and a <code>label</code>. Mark the current destination with
	<code>selected</code>. This fills the icon, gives the label the stronger colour and draws the pill
	behind the icon.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="expanded">Expanded<a href="#expanded" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The rail has two widths. Collapsed, it is 96dp wide with the label under each icon. Expanded, it
	is 220dp to 360dp wide, shows the label beside the icon inside the indicator and pushes the
	content aside. <code>menu</code> adds a button at the top that toggles <code>expanded</code>. You
	can also bind <code>expanded</code>.
</p>
<p>
	Pass a FAB through the <code>fab</code> snippet. It sits above the destinations. The snippet
	receives <code>expanded</code>, so an <code>ExtendedFab</code> can show its label only while the rail
	is expanded.
</p>
<p>
	When the rail changes width, the destinations move into place, the indicator grows around the
	label and the labels cross-fade. <code>--np-motion-standard-fast-spatial</code> sets the timing.
	The modal rail's sheet uses <code>--np-motion-expressive-default-spatial</code>, so it settles a
	moment after its items. With reduced motion the rail switches at once.
</p>
<p>
	<code>alignment="center"</code> groups the destinations in the vertical centre of the rail. This is
	easier to reach on a tablet. The menu button and the FAB stay at the top.
</p>
<DemoContainer>
	<Expanded />
</DemoContainer>
<Code value={ExpandedSource} />

<h2 id="sections">Sections<a href="#sections" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>NavigationRailSection</code> holds secondary destinations under a header. They show only in the
	expanded rail and fade in as it opens. In the collapsed rail, the section is hidden from the keyboard
	and screen readers too. In the expanded rail, screen readers announce it as a group named by its header.
</p>
<DemoContainer>
	<Sections />
</DemoContainer>
<Code value={SectionsSource} />

<h2 id="modal">Modal<a href="#modal" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	With <code>modal</code>, the expanded rail opens over the content behind a scrim instead of
	pushing it aside. Use it in smaller windows. Focus moves into the rail. <kbd>Esc</kbd> or a click on
	the scrim closes it.
</p>
<DemoContainer>
	<Modal />
</DemoContainer>
<Code value={ModalSource} />

<h3 id="hide-when-collapsed">
	Hide when collapsed<a href="#hide-when-collapsed" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	<code>hideWhenCollapsed</code> removes the collapsed rail, so the content gets the full width.
	Open the rail with your own menu button that sets <code>expanded</code>. The
	<code>menu</code> button inside the open rail closes it.
</p>
<DemoContainer>
	<HideWhenCollapsed />
</DemoContainer>
<Code value={HideWhenCollapsedSource} />

<h2 id="links">Links<a href="#links" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Pass an <code>href</code> and the item renders as an <code>&lt;a&gt;</code> instead of a
	<code>&lt;button&gt;</code>. Use links for real navigation, so people can open a destination in a
	new tab. In a routed app, set <code>selected</code> from the current URL, for example
	<code>page.url.pathname === href</code> with SvelteKit's <code>page</code> from
	<code>$app/state</code>.
</p>
<DemoContainer>
	<Links />
</DemoContainer>
<Code value={LinksSource} />

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The rail renders a <code>&lt;nav&gt;</code>, and the selected item gets
	<code>aria-current="page"</code>, so assistive technology announces the current destination.
</p>
<p>
	The items share one tab stop. <kbd>Tab</kbd> moves into and out of the rail.
	<kbd>↑</kbd> and <kbd>↓</kbd> move between the destinations and wrap around at the ends.
	<kbd>Home</kbd> and <kbd>End</kbd> jump to the first and the last one. The menu button and the FAB
	come before them, each with its own tab stop. The menu button reports
	<code>aria-expanded</code>. When a page has several navigations, give each
	<code>&lt;nav&gt;</code>
	an <code>aria-label</code> so they can be told apart.
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
			<td><code>--np-navigation-rail-container-color</code></td>
			<td><code>--np-color-surface</code></td>
		</tr>
		<tr>
			<td><code>--np-navigation-rail-modal-container-color</code></td>
			<td><code>--np-color-surface-container</code></td>
		</tr>
		<tr>
			<td><code>--np-navigation-rail-modal-container-shape</code></td>
			<td><code>--np-shape-corner-large</code></td>
		</tr>
		<tr>
			<td><code>--np-navigation-rail-item-active-indicator-color</code></td>
			<td><code>--np-color-secondary-container</code></td>
		</tr>
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
	The colours come from the theme. The rail uses <code>surface</code>, or
	<code>surface-container</code> where it should stand apart from the content. Idle icons and labels
	use <code>on-surface-variant</code>. The pill behind the selected icon uses
	<code>secondary-container</code> with <code>on-secondary-container</code>. Raise
	<code>--np-navigation-rail-item-selected-font-weight</code> to make the current destination stand out
	more.
</p>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<ThemingExample />
</DemoContainer>
<Code value={ThemingExampleSource} />

<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="navigationrail-attributes">
	NavigationRail attributes<a href="#navigationrail-attributes" aria-hidden="true" tabindex="-1"
		>#</a
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
			<td><code>expanded</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Shows the expanded rail, with the label beside each icon. Bindable.</td>
		</tr>
		<tr>
			<td><code>modal</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Opens the expanded rail over the content, behind a scrim.</td>
		</tr>
		<tr>
			<td><code>hideWhenCollapsed</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Hides the collapsed rail. Set <code>expanded</code> from a button of your own.</td>
		</tr>
		<tr>
			<td><code>menu</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Adds a menu button at the top that toggles <code>expanded</code>.</td>
		</tr>
		<tr>
			<td><code>menuLabel</code></td>
			<td><code>string</code></td>
			<td><code>'Menu'</code></td>
			<td>The name of the menu button. It shows no tooltip.</td>
		</tr>
		<tr>
			<td><code>alignment</code></td>
			<td><code>'top' | 'center'</code></td>
			<td><code>'top'</code></td>
			<td>Groups the destinations at the top or in the vertical centre.</td>
		</tr>
		<tr>
			<td><code>fab</code></td>
			<td><code>Snippet&lt;[&#123; expanded: boolean &#125;]&gt;</code></td>
			<td><code>undefined</code></td>
			<td>A FAB above the destinations, resting at elevation 0.</td>
		</tr>
	</tbody>
</table>
<p>
	Other attributes, such as <code>aria-label</code>, <code>class</code> and <code>style</code>, go
	to the <code>&lt;nav&gt;</code> element.
</p>
<h3 id="navigationrailitem-attributes">
	NavigationRailItem attributes<a
		href="#navigationrailitem-attributes"
		aria-hidden="true"
		tabindex="-1">#</a
	>
</h3>
<p>
	Other attributes, including <code>onclick</code> and <code>href</code>, go to the
	<code>&lt;button&gt;</code> or <code>&lt;a&gt;</code>.
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
			<td>Button type, for an item inside a form.</td>
		</tr>
	</tbody>
</table>

<h3 id="navigationrailsection-attributes">
	NavigationRailSection attributes<a
		href="#navigationrailsection-attributes"
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
			<td>The section header, shown in the expanded rail and naming the group.</td>
		</tr>
	</tbody>
</table>
