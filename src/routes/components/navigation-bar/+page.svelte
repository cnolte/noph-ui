<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Arrangement from './demos/Arrangement.svelte'
	import ArrangementSource from './demos/Arrangement.svelte?raw'
	import Badges from './demos/Badges.svelte'
	import BadgesSource from './demos/Badges.svelte?raw'
	import HorizontalItems from './demos/HorizontalItems.svelte'
	import HorizontalItemsSource from './demos/HorizontalItems.svelte?raw'
	import Labels from './demos/Labels.svelte'
	import LabelsSource from './demos/Labels.svelte?raw'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
</script>

<svelte:head>
	<title>Navigation bar - Material 3 bottom nav for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 navigation bar for Svelte: three to five top level destinations along the bottom of a compact screen, with badges, labels and link support."
	/>
</svelte:head>

<h1>Navigation bar</h1>
<p>
	Three to five top level destinations along the bottom of a compact screen. On a wider screen use a
	<a class="link" href="/components/navigation-rail">navigation rail</a> instead.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Mark the current destination with <code>selected</code>. It becomes the bar's only tab stop, and
	the arrow keys move between destinations.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="as-links">As links<a href="#as-links" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Give an item an <code>href</code> and it renders an <code>&lt;a&gt;</code>. A selected item gets
	<code>aria-current="page"</code> either way.
</p>
<Code
	value={`<NavigationBarItem
	label="Home"
	href="/"
	selected={page.url.pathname === '/'}
>
	{#snippet icon()}<Icon>home</Icon>{/snippet}
</NavigationBarItem>`}
/>

<h2 id="badges">Badges<a href="#badges" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>badge</code> puts a <a class="link" href="/components/badge">badge</a> on the icon. Without
	a <code>badgeLabel</code> it is a small dot. A screen reader reads it after the destination's
	name: the count, or <code>New notification</code> for a dot. <code>badgeAriaLabel</code> replaces that
	text, to say what the number counts or to translate it.
</p>
<DemoContainer>
	<Badges />
</DemoContainer>
<Code value={BadgesSource} />

<h2 id="labels">Labels<a href="#labels" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	<code>labelBehavior="selected"</code> shows only the selected item's label. The hidden labels keep their
	space, so the row does not shift as the selection moves.
</p>
<DemoContainer>
	<Labels />
</DemoContainer>
<Code value={LabelsSource} />

<h2 id="arrangement">Arrangement<a href="#arrangement" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	By default items share the bar equally (<code>arrangement="equal-weight"</code>), as M3 recommends
	for phone-width screens. When the bar has room to spare, use <code>arrangement="centered"</code>.
	Each item then keeps its own width and the group sits in the middle.
</p>
<DemoContainer>
	<Arrangement />
</DemoContainer>
<Code value={ArrangementSource} />

<h2 id="horizontal-items">
	Horizontal items<a href="#horizontal-items" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	<code>orientation="horizontal"</code> puts the icon beside the label, inside the active indicator.
	M3 uses it on medium windows. Horizontal items always keep their own width and sit centred with
	32dp between them, whatever the <code>arrangement</code>.
</p>
<DemoContainer>
	<HorizontalItems />
</DemoContainer>
<Code value={HorizontalItemsSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<table>
	<thead>
		<tr>
			<th>Custom property</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-navigation-bar-container-color</code></td>
			<td>Background of the bar.</td>
		</tr>
		<tr>
			<td><code>--np-navigation-bar-item-active-indicator-color</code></td>
			<td>The pill behind the selected icon.</td>
		</tr>
		<tr>
			<td><code>--np-navigation-bar-item-font-weight</code></td>
			<td>Label weight.</td>
		</tr>
		<tr>
			<td><code>--np-navigation-bar-item-selected-font-weight</code></td>
			<td>Label weight of the selected item.</td>
		</tr>
	</tbody>
</table>

<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	The bar renders a <code>&lt;nav&gt;</code> landmark. Give it an <code>aria-label</code> when the
	page has more than one, so screen reader users can tell them apart. The selected item carries
	<code>aria-current="page"</code>.
</p>
<p>
	The items share one tab stop. Tab moves into the bar and out again. The left and right arrow keys
	move between destinations, and Home and End jump to the ends. With <code>href</code> the items are links,
	so middle click and open in new tab work. A badge is read after the item's name, as its description.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="navigationbar-attributes">
	NavigationBar attributes<a href="#navigationbar-attributes" aria-hidden="true" tabindex="-1">#</a>
</h3>
<p>
	Renders a <code>&lt;nav&gt;</code> and takes its attributes, such as <code>aria-label</code>.
	<code>bind:element</code> gives you the <code>&lt;nav&gt;</code>.
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
			<td><code>arrangement</code></td>
			<td><code>'equal-weight' | 'centered'</code></td>
			<td><code>'equal-weight'</code></td>
			<td
				>Whether vertical items stretch to share the bar equally, or keep their own width and group
				in the middle. Horizontal items are always centred.</td
			>
		</tr>
	</tbody>
</table>

<h3 id="navigationbaritem-attributes">
	NavigationBarItem attributes<a
		href="#navigationbaritem-attributes"
		aria-hidden="true"
		tabindex="-1">#</a
	>
</h3>
<p>
	Renders a <code>&lt;button&gt;</code>, or an <code>&lt;a&gt;</code> with an <code>href</code>, and
	takes that element's attributes.
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
			<td>required</td>
			<td>Destination name, shown under the icon.</td>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet</code></td>
			<td>required</td>
			<td>The icon. A navigation bar item always has one.</td>
		</tr>
		<tr>
			<td><code>selected</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>
				Marks the current destination. Sets <code>aria-current="page"</code> and makes the item the bar's
				tab stop.
			</td>
		</tr>
		<tr>
			<td><code>labelBehavior</code></td>
			<td><code>'always' | 'selected'</code></td>
			<td><code>'always'</code></td>
			<td>Whether every label shows, or only the selected one.</td>
		</tr>
		<tr>
			<td><code>orientation</code></td>
			<td><code>'vertical' | 'horizontal'</code></td>
			<td><code>'vertical'</code></td>
			<td>Whether the icon sits above the label, or beside it.</td>
		</tr>
		<tr>
			<td><code>badge</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Shows a badge on the icon.</td>
		</tr>
		<tr>
			<td><code>badgeLabel</code></td>
			<td><code>string | number | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Badge text. Without it the badge is a small dot.</td>
		</tr>
		<tr>
			<td><code>badgeAriaLabel</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td>
				Read after the label. Without it the count is read, or <code>New notification</code> for a dot.
			</td>
		</tr>
	</tbody>
</table>
