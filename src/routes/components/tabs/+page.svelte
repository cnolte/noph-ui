<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Links from './demos/Links.svelte'
	import LinksSource from './demos/Links.svelte?raw'
	import PrimaryTabs from './demos/PrimaryTabs.svelte'
	import PrimaryTabsSource from './demos/PrimaryTabs.svelte?raw'
	import PrimaryTabsIcons from './demos/PrimaryTabsIcons.svelte'
	import PrimaryTabsIconsSource from './demos/PrimaryTabsIcons.svelte?raw'
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
	Tabs provide a user interface for navigating between distinct sections or pages within an
	application. Each <code>&lt;Tabs&gt;</code> component contains multiple <code>&lt;Tab&gt;</code>
	children, and the <code>&lt;Tabs&gt;</code> component itself can be styled as either primary or secondary
	variants to suit different use cases.
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
<h3 id="selection">Selection<a href="#selection" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	The <code>value</code> prop on <code>&lt;Tabs&gt;</code> determines which tab is currently
	selected. Each <code>&lt;Tab&gt;</code> must have a unique <code>value</code> within the same
	<code>&lt;Tabs&gt;</code>
	group. When the <code>value</code> of <code>&lt;Tabs&gt;</code> matches a
	<code>&lt;Tab&gt;</code>'s <code>value</code>, that tab is highlighted as selected. To react to
	tab changes, use <code>bind:value</code> on <code>&lt;Tabs&gt;</code> to keep track of the selected
	tab in your component state.
</p>
<DemoContainer>
	<Selection />
</DemoContainer>
<Code value={SelectionSource} />

<h3 id="links">Links<a href="#links" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	To enable navigation between pages or routes, use the <code>href</code> attribute on
	<code>&lt;Tab&gt;</code>. This renders the tab as a link, allowing users to navigate to different
	routes when a tab is clicked. The <code>href</code> attribute works seamlessly with the
	<code>value</code> prop, so you can track which tab is selected even when navigating between pages.
	This approach is especially useful for SSR and deep linking.
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
	between them, Home and End jump to the ends, and Tab leaves the strip for the panel.
</p>
<p>
	Where a tab reveals a panel on the same page, give the panel an id, point at it with
	<code>controls</code> and mark the panel <code>role="tabpanel"</code>. Tabs that navigate take an
	<code>href</code> instead and stay real links. A badge on a tab needs
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
			<td
				>Sets the visual style of the tab. Use <code>'primary'</code> for the default appearance or
				<code>'secondary'</code> for an alternative style.</td
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
			<td>A string representing the label to be displayed inside a badge element.</td>
		</tr>
		<tr>
			<td><code>badgeAriaLabel</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Announces the badge, for example <code>"2 new videos"</code>. Without it the badge is
				<code>aria-hidden</code> and only the tab label is read out.</td
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
			<td>The value associated with this tab. Used to identify which tab is selected.</td>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Provides a custom icon for the tab, typically rendered before the tab label. Accepts a
				Svelte snippet, such as an <code>&lt;Icon&gt;</code> component.</td
			>
		</tr>
		<tr>
			<td><code>href</code></td>
			<td><code>string</code></td>
			<td><code>undefined</code></td>
			<td>
				When set, the tab will render as a link using the provided URL. This allows navigation to
				other pages or routes when the tab is clicked.
			</td>
		</tr>
		<tr>
			<td><code>element</code></td>
			<td><code>HTMLElement</code></td>
			<td></td>
			<td>A reference to the root DOM element of the component.</td>
		</tr>
	</tbody>
</table>
