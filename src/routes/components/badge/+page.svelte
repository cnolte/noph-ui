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
	A badge marks an icon or a navigation item: a dot for something new, a number for a count. Only
	show counts people can act on.
</p>
<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Badges show notifications, counts or status on navigation items and icons. Place the badge next to
	a 24px icon inside an element with <code>position: relative</code>. It then sits inside the icon
	at its top trailing corner, mirrored for right-to-left text.
</p>

<h3 id="small-badge">Small badge<a href="#small-badge" aria-hidden="true" tabindex="-1">#</a></h3>
<p>Without a label a badge renders as a small dot, indicating new content.</p>
<DemoContainer>
	<SmallBadge />
</DemoContainer>
<Code value={SmallBadgeSource} />

<h3 id="large-badge">Large badge<a href="#large-badge" aria-hidden="true" tabindex="-1">#</a></h3>
<p>
	Set a <code>label</code> to show a number or short text. A large badge keeps its leading edge and
	grows toward the trailing side. Counts above 999 show as <code>999+</code>, so the badge stays at
	four characters.
</p>
<DemoContainer>
	<LargeBadge />
</DemoContainer>
<Code value={LargeBadgeSource} />

<h2 id="positioning">Positioning<a href="#positioning" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Material 3 gives badges a fixed place on the icon. Only move one when its anchor is not a bare
	24px icon, such as an icon button. The custom properties below accept any CSS length or keyword.
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
			<td><code>0</code> small, <code>-0.125rem</code> large</td>
			<td>Distance from the top of the anchor.</td>
		</tr>
		<tr>
			<td><code>--np-badge-start</code></td>
			<td><code>calc(100% - 0.375rem)</code> small, <code>calc(100% - 0.75rem)</code> large</td>
			<td>Distance from the inline-start edge of the anchor to the badge's leading edge.</td>
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
	A badge takes its colors from the error role, so it stays legible in both color schemes. Use the
	custom properties below to position it when the element underneath is not a plain icon.
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
			<td><code>0</code> small, <code>-0.125rem</code> large</td>
		</tr>
		<tr>
			<td><code>--np-badge-start</code></td>
			<td><code>calc(100% - 0.375rem)</code> small, <code>calc(100% - 0.75rem)</code> large</td>
		</tr>
	</tbody>
</table>
<p>
	The container color is <code>--np-color-error</code> and the label
	<code>--np-color-on-error</code>. Change both on an ancestor to recolor a badge. See
	<a class="link" href="/about/theming">Theming</a> for the roles.
</p>
<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	A badge is decorative by default and renders <code>aria-hidden</code>. The icon button or
	navigation item it sits on carries the name.
</p>
<p>
	In navigation bar, navigation rail and tabs, the badge is read after the destination's name as its
	description: <code>badgeAriaLabel</code> if set, else the count, else
	<code>New notification</code>. Use <code>badgeAriaLabel</code> to translate that last one.
</p>
<p>
	For a badge on its own, where the count is news, pass <code>aria-label</code>. The badge then gets
	<code>role="status"</code> with that name, and screen readers announce it when it changes. Write
	the label in full: <code>3 unread messages</code>, not <code>3</code>.
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
			<td>Content inside the badge. Without it, a small badge (dot) shows.</td>
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
