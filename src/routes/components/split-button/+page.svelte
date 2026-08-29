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
	<title>Split button - Noph UI</title>
</svelte:head>

<h1>Split button</h1>
<p>
	One button in two halves: a default action, and a caret that opens related actions. Use it when
	one choice is the obvious one but a few alternatives should stay within reach.
</p>

<h2 id="usage">Usage<a href="#usage" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	The action half runs <code>onclick</code>. The trailing half opens the menu and never triggers the
	action. Give it a <code>menuLabel</code>, because it shows only a caret. While the menu is open
	the caret turns over and its half rounds out into a circle.
</p>
<DemoContainer>
	<Usage />
</DemoContainer>
<Code value={UsageSource} />

<h2 id="variants">Variants<a href="#variants" aria-hidden="true" tabindex="-1">#</a></h2>
<p>
	Both halves take the same variant, four of the ones a <a class="link" href="/components/button"
		>Button</a
	> takes.
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
