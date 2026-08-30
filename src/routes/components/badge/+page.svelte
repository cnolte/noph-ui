<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import LargeBadge from './demos/LargeBadge.svelte'
	import LargeBadgeSource from './demos/LargeBadge.svelte?raw'
	import PositioningExample from './demos/PositioningExample.svelte'
	import PositioningExampleSource from './demos/PositioningExample.svelte?raw'
	import SmallBadge from './demos/SmallBadge.svelte'
	import SmallBadgeSource from './demos/SmallBadge.svelte?raw'
</script>

<svelte:head>
	<title>Badges - Material 3 badge component for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 badge for Svelte: a small dot or count on an icon or a navigation item, in the small and large sizes, announced to assistive technology."
	/>
</svelte:head>

<h1>Badges</h1>
<p>
	A badge marks an icon or a navigation item with news: a dot for something new, a number for how
	much of it there is. Keep it to a count someone can act on.
</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Badges show notifications, counts, or status information on navigation items and icons. A badge is
	positioned relative to its anchor, so place it inside an element with
	<code>position: relative</code>.
</p>

<h3 id="small-badge">Small badge<a href="#small-badge" aria-hidden="true" tabindex="-1">#</a></h3>
<p>Without a label a badge renders as a small dot, indicating new content.</p>
<DemoContainer>
	<SmallBadge />
</DemoContainer>
<Code value={SmallBadgeSource} />

<h3 id="large-badge">Large badge<a href="#large-badge" aria-hidden="true" tabindex="-1">#</a></h3>
<p>Set a <code>label</code> to display a number or short text.</p>
<DemoContainer>
	<LargeBadge />
</DemoContainer>
<Code value={LargeBadgeSource} />

<h2 id="positioning">Positioning<a href="#positioning" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	By default a badge is positioned absolutely at the top of its anchor. Use the following custom
	properties to adjust its placement. They accept any valid CSS length or keyword.
</p>
<table>
	<thead>
		<tr>
			<th>Property</th>
			<th>Default value</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>--np-badge-position</code></td>
			<td><code>absolute</code></td>
			<td>The CSS <code>position</code> of the badge.</td>
		</tr>
		<tr>
			<td><code>--np-badge-top</code></td>
			<td><code>0</code></td>
			<td>Distance from the top of the anchor.</td>
		</tr>
		<tr>
			<td><code>--np-badge-start</code></td>
			<td><code>auto</code></td>
			<td>Distance from the inline-start edge of the anchor.</td>
		</tr>
		<tr>
			<td><code>--np-badge-end</code></td>
			<td><code>auto</code></td>
			<td>Distance from the inline-end edge of the anchor.</td>
		</tr>
	</tbody>
</table>
<h3 id="example">Example<a href="#example" aria-hidden="true" tabindex="-1">#</a></h3>
<DemoContainer>
	<PositioningExample />
</DemoContainer>
<Code value={PositioningExampleSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A badge takes its colors from the error role, so it stays legible in both color schemes without
	any work. Position it with the custom properties below when the element underneath is not the
	usual icon.
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
			<td><code>--np-badge-position</code></td>
			<td><code>absolute</code></td>
		</tr>
		<tr>
			<td><code>--np-badge-top</code></td>
			<td><code>0</code></td>
		</tr>
		<tr>
			<td><code>--np-badge-start</code></td>
			<td><code>auto</code></td>
		</tr>
		<tr>
			<td><code>--np-badge-end</code></td>
			<td><code>auto</code></td>
		</tr>
	</tbody>
</table>
<p>
	The container color is <code>--np-color-error</code> and the label
	<code>--np-color-on-error</code>. Change the pair on an ancestor to recolor a badge, and see
	<a class="link" href="/about/theming">Theming</a> for the roles themselves.
</p>
<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A badge is decorative by default: it renders <code>aria-hidden</code>, because a number floating
	beside an icon means nothing on its own. The icon button or navigation item it sits on carries the
	name.
</p>
<p>
	Where the count is news, pass <code>aria-label</code>. The badge then becomes a
	<code>role="status"</code> with that name, and a screen reader announces it when it changes. Write
	the label out in full, <code>3 unread messages</code> rather than <code>3</code>.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<h3 id="attributes">Attributes<a href="#attributes" aria-hidden="true" tabindex="-1">#</a></h3>
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
			<td><code>string | number | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Content displayed inside the badge. When omitted, a small badge (dot) is shown.</td>
		</tr>
		<tr>
			<td><code>aria-label</code></td>
			<td><code>string | undefined</code></td>
			<td><code>undefined</code></td>
			<td
				>Announces the badge. Set it when the badge carries information that is not already in the
				surrounding text, for example <code>"3 unread messages"</code>. Without it the badge stays
				<code>aria-hidden</code>, which is right when it only repeats what is already labelled.</td
			>
		</tr>
	</tbody>
</table>
