<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Links from './demos/Links.svelte'
	import LinksSource from './demos/Links.svelte?raw'
	import PrimaryTabs from './demos/PrimaryTabs.svelte'
	import PrimaryTabsSource from './demos/PrimaryTabs.svelte?raw'
	import PrimaryTabsIcons from './demos/PrimaryTabsIcons.svelte'
	import PrimaryTabsIconsSource from './demos/PrimaryTabsIcons.svelte?raw'
	import Scrollable from './demos/Scrollable.svelte'
	import ScrollableSource from './demos/Scrollable.svelte?raw'
	import SecondaryTabs from './demos/SecondaryTabs.svelte'
	import SecondaryTabsSource from './demos/SecondaryTabs.svelte?raw'
	import SecondaryTabsIcons from './demos/SecondaryTabsIcons.svelte'
	import SecondaryTabsIconsSource from './demos/SecondaryTabsIcons.svelte?raw'
	import Selection from './demos/Selection.svelte'
	import SelectionSource from './demos/Selection.svelte?raw'
</script>

<svelte:head>
	<title>Tabs - Material 3 tabs component for Svelte - Noph UI</title>
	<meta
		name="description"
		content="Material 3 tabs for Svelte, primary and secondary: switch between views of one screen, driven by state or by links, with keyboard navigation."
	/>
</svelte:head>

<h1>Tabs</h1>
<p>
	Tabs switch between views that sit at the same level of one screen. Primary tabs sit at the top of
	the content, secondary tabs divide what is inside one of those views.
</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Each <code>&lt;Tabs&gt;</code> holds several <code>&lt;Tab&gt;</code> children. Set
	<code>&lt;Tabs&gt;</code> to the primary or the secondary variant.
</p>

<h3 id="primary-tabs">
	Primary tabs<a href="#primary-tabs" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<PrimaryTabs />
</DemoContainer>
<Code value={PrimaryTabsSource} />
<h4 id="icons">Icons<a href="#icons" aria-hidden="true" tabindex="-1">#</a></h4>
<DemoContainer>
	<PrimaryTabsIcons />
</DemoContainer>
<Code value={PrimaryTabsIconsSource} />
<h3 id="secondary-tabs">
	Secondary tabs<a href="#secondary-tabs" aria-hidden="true" tabindex="-1">#</a>
</h3>
<DemoContainer>
	<SecondaryTabs />
</DemoContainer>
<Code value={SecondaryTabsSource} />
<h4 id="icons-2">Icons<a href="#icons-2" aria-hidden="true" tabindex="-1">#</a></h4>
<DemoContainer>
	<SecondaryTabsIcons />
</DemoContainer>
<Code value={SecondaryTabsIconsSource} />
<h3 id="scrollable-tabs">
	Scrollable tabs<a href="#scrollable-tabs" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	By default the tabs share the full width equally. When the tabs or labels do not fit, set
	<code>scrollable</code>. Each tab is then as wide as its label and the strip scrolls sideways. The
	first tab sits 52dp from the leading edge, so the cut off tabs at the end show that there is more.
	Selecting a tab scrolls it towards the middle of the strip.
</p>
<DemoContainer>
	<Scrollable />
</DemoContainer>
<Code value={ScrollableSource} />
<h3 id="selection">Selection<a href="#selection" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	The <code>value</code> of <code>&lt;Tabs&gt;</code> sets the selected tab: the
	<code>&lt;Tab&gt;</code> with the same <code>value</code> is selected. Each
	<code>&lt;Tab&gt;</code> needs a unique <code>value</code> within its <code>&lt;Tabs&gt;</code>.
	Use
	<code>bind:value</code> on <code>&lt;Tabs&gt;</code> to track the selected tab in your state.
</p>
<DemoContainer>
	<Selection />
</DemoContainer>
<Code value={SelectionSource} />

<h3 id="links">Links<a href="#links" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	Give a <code>&lt;Tab&gt;</code> an <code>href</code> to render it as a link to another page or
	route. The <code>value</code> prop still tracks the selected tab across pages, which helps with SSR
	and deep linking. Clicking a link tab selects it at once, and Space follows the link like Enter.
</p>
<DemoContainer>
	<Links />
</DemoContainer>
<Code value={LinksSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Tabs are drawn from the color roles: <code>--np-color-primary</code> for the indicator and the
	selected label, <code>--np-color-on-surface-variant</code> for the rest, and
	<code>--np-color-secondary</code> for the focus ring.
</p>
<table>
	<thead>
		<tr>
			<th>Custom property</th>
			<th>Default value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-tabs-indicator-radius</code></td>
			<td>
				<code>--np-shape-corner-full</code> on primary tabs, <code>0</code> on secondary tabs
			</td>
		</tr>
	</tbody>
</table>
<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The strip renders <code>role="tablist"</code> and each tab <code>role="tab"</code> with
	<code>aria-selected</code>. The tabs share one tab stop: the left and right arrow keys move
	between them, Home and End jump to the ends, Space and Enter select the focused tab, and Tab
	leaves the strip for the panel.
</p>
<p>
	Where a tab reveals a panel on the same page, give the panel an id, point at it with
	<code>controls</code> and mark the panel <code>role="tabpanel"</code>. Tabs that navigate take an
	<code>href</code> instead and stay real links. A badge on a tab is read after the tab's name: the
	count, or <code>New notification</code> for a dot. Pass
	<code>badgeAriaLabel</code> to say what the number counts.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="tabs">Tabs<a href="#tabs" aria-hidden="true" tabindex="-1">#</a></h3>
<h4 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h4>
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
			<td><code>value</code></td>
			<td><code>number | string</code></td>
			<td></td>
			<td>Value of the current tab.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'primary' | 'secondary'</code></td>
			<td><code>'primary'</code></td>
			<td>The style of the tabs: <code>'primary'</code> or <code>'secondary'</code>.</td>
		</tr>
		<tr>
			<td><code>scrollable</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td
				>Tabs as wide as their labels that scroll sideways, the first one 52dp from the leading
				edge. Without it the tabs share the width equally.</td
			>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td></td>
			<td>A reference to the root DOM element of the component. </td>
		</tr>
	</tbody>
</table>

<h3 id="tab">Tab<a href="#tab" aria-hidden="true" tabindex="-1">#</a></h3>
<h4 id="attributes-2">Attributes<a href="#attributes-2" aria-hidden="true" tabindex="-1">#</a></h4>
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
			<td><code>inlineIcon</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Only affects the <code>primary</code> variant.</td>
		</tr>
		<tr>
			<td><code>badge</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td></td>
		</tr>
		<tr>
			<td><code>badgeLabel</code></td>
			<td><code>string | number | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Text shown inside the badge.</td>
		</tr>
		<tr>
			<td><code>badgeAriaLabel</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Read after the label, for example <code>"2 new videos"</code>. Without it the count is
				read, or <code>New notification</code> for a dot.</td
			>
		</tr>
		<tr>
			<td><code>controls</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>The <code>id</code> of the panel this tab controls, rendered as
				<code>aria-controls</code>.</td
			>
		</tr>
		<tr>
			<td><code>value</code></td>
			<td><code>number | string</code></td>
			<td><code>undefined</code></td>
			<td
				>Identifies the tab. The tab is selected when it matches the <code>value</code> of
				<code>&lt;Tabs&gt;</code>.</td
			>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Icon shown before the label, as a snippet such as an <code>&lt;Icon&gt;</code>.</td>
		</tr>
		<tr>
			<td><code>href</code></td>
			<td><code>string</code></td>
			<td><code>undefined</code></td>
			<td> Renders the tab as a link to this URL. </td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td></td>
			<td>A reference to the root DOM element of the component.</td>
		</tr>
	</tbody>
</table>
