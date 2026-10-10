<script lang="ts">
	import Code from '../../Code.svelte'
	import DemoContainer from '../../DemoContainer.svelte'
	import Usage from './demos/Usage.svelte'
	import UsageSource from './demos/Usage.svelte?raw'
	import Variants from './demos/Variants.svelte'
	import VariantsSource from './demos/Variants.svelte?raw'
	import WithIcon from './demos/WithIcon.svelte'
	import WithIconSource from './demos/WithIcon.svelte?raw'
</script>

<svelte:head>
	<title>Split button - Material 3 split button for Svelte - Noph UI</title>
	<meta
		name="description"
		content="The Material 3 split button for Svelte: a default action beside a caret that opens the alternatives, in every button style and with expressive press motion."
	/>
</svelte:head>

<h1>Split button</h1>
<p>
	One button in two halves: a default action, and a caret that opens related actions. Use it when
	one action is the main one and a few alternatives should stay close.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The action half runs <code>onclick</code>. The trailing half opens the menu and never triggers the
	action. Give it a <code>menuLabel</code>, because it shows only a caret. While the menu is open,
	the caret turns upside down and its half becomes a circle.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="variants">Variants<a href="#variants" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Both halves use the same variant. Four of the <a class="link" href="/components/button">Button</a> variants
	are available.
</p>
<DemoContainer>
	<Variants />
</DemoContainer>
<Code value={VariantsSource} />

<h2 id="with-icon">With an icon<a href="#with-icon" aria-hidden="true" tabindex="-1">#</a></h2>
<DemoContainer>
	<WithIcon />
</DemoContainer>
<Code value={WithIconSource} />

<h2 id="theming">Theming<a href="#theming" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	A split button is two buttons in a group. Theme it with the
	<a class="link" href="/components/button">button</a> tokens of its variant.
	<code>--np-filled-button-container-color</code> and the related tokens apply to both halves.
</p>
<p>
	The shape comes from <code>--np-shape-corner-full</code>. The two halves keep small inner corners.
	The caret rotation and the shape change on press use the expressive motion tokens. With reduced
	motion, they do not animate.
</p>
<h2 id="accessibility">
	Accessibility<a href="#accessibility" aria-hidden="true" tabindex="-1">#</a>
</h2>
<p>
	Both halves are real buttons in a <code>role="group"</code>. The leading half is named by its
	<code>label</code>, also with <code>iconOnly</code>, where the label becomes its tooltip. The
	caret is named by <code>menuLabel</code>. Give <code>menuLabel</code> a name that fits the action,
	for example <code>More send options</code> instead of the default.
</p>
<p>
	The caret has <code>aria-haspopup="menu"</code> and <code>aria-expanded</code>, and opens the
	<a class="link" href="/components/menu">menu</a>. The menu has arrow key navigation and returns
	focus to the caret when it closes. Tab reaches both halves, so keyboard users can run the default
	action without opening the menu.
</p>
<h2 id="api">API<a href="#api" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Renders a connected <a class="link" href="/components/button-group">ButtonGroup</a> holding the
	two halves and the menu. <code>bind:element</code> gives you the group.
</p>
<table>
	<thead>
		<tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr>
	</thead>
	<tbody>
		<tr>
			<td><code>label</code></td>
			<td><code>string</code></td>
			<td><code>''</code></td>
			<td>Text of the action half.</td>
		</tr>
		<tr>
			<td><code>iconOnly</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td
				>Shows only <code>icon</code> on the leading button. <code>label</code> then names it and becomes
				its tooltip.</td
			>
		</tr>
		<tr>
			<td><code>icon</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Leading icon on the action half.</td>
		</tr>
		<tr>
			<td><code>menu</code></td>
			<td><code>Snippet | undefined</code></td>
			<td><code>undefined</code></td>
			<td>Menu items, rendered inside a <a class="link" href="/components/menu">Menu</a>.</td>
		</tr>
		<tr>
			<td><code>onclick</code></td>
			<td><code>MouseEventHandler | undefined</code></td>
			<td><code>undefined</code></td>
			<td>The action half's handler. The trailing half opens the menu instead.</td>
		</tr>
		<tr>
			<td><code>variant</code></td>
			<td><code>'filled' | 'tonal' | 'outlined' | 'elevated'</code></td>
			<td><code>'filled'</code></td>
			<td>Applied to both halves.</td>
		</tr>
		<tr>
			<td><code>size</code></td>
			<td><code>'xs' | 's' | 'm' | 'l' | 'xl'</code></td>
			<td><code>'s'</code></td>
			<td>Applied to both halves.</td>
		</tr>
		<tr>
			<td><code>open</code></td>
			<td><code>boolean</code></td>
			<td><code>false</code></td>
			<td>Bindable. Whether the menu is open.</td>
		</tr>
		<tr>
			<td><code>menuLabel</code></td>
			<td><code>string</code></td>
			<td><code>'More options'</code></td>
			<td>Accessible name for the trailing half.</td>
		</tr>
	</tbody>
</table>
